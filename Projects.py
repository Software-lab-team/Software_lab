from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient
from bson.json_util import dumps
import HWSets
app = Flask(__name__)
Projects = Blueprint("Projects", __name__) #same as file name and var
client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
projectCollection = db.Projects
hwCollection = db.HWSets
userCollection = db.Users

class Project:
    def __init__(self):
        name: str
        id: str
        description: str
        checked_out_HW_sets: dict

#/Projects?projectID=1&checkIn=1&HWSet=1&number=20
# Updates the number of hardware sets associated with a project
@Projects.route("/Projects", methods=['PUT'])
def updateProjectSetByID():

    # Get query parameters
    projectID = request.args.get('projectID', type=str)

    # Check In = 1 , Check Out = -1
    checkIn = request.args.get('checkIn', type=int)
    hwSet = request.args.get('HWSet', type=str)
    numberOfSets = request.args.get('number', type=int)
    receivedProject = projectCollection.find_one({"projectID": projectID})

    # Check if the projectID that is given as input is valid
    if not receivedProject:
        return "There is no project with the given projectID", 400

    # Get the existing dictionary of the hardware sets checked out by the project
    checkedOutSets = receivedProject['checkedOutSets']

    # Get all of the hardware sets in the database (Necessary for error checking)
    all_hw_sets = HWSets.getAllHWSets()
    list_of_hw_set_names = list()
    for entry in all_hw_sets['result']:
        list_of_hw_set_names.append(entry['name'])

    # Check that the given query for the ID of the Hardware Set is valid
    if hwSet not in list_of_hw_set_names:
        return f'There is no HW set with name + {hwSet}', 400

    # Create a new field in the dictionary for hardware sets
    if hwSet not in checkedOutSets:
        # Have to add the HW Set to the project
        add_hw_set_dict = checkedOutSets
        project_hw_sets = 0

    # If a field already exists, don't create a new field, just reference it
    else:
        add_hw_set_dict = checkedOutSets
        project_hw_sets = checkedOutSets[hwSet]

    projectName = str(receivedProject['projectName'])
    projectDescription = str(receivedProject['projectDescription'])

    # Get the document in the database that represents the current status of the queried hardware set
    hardware_object = hwCollection.find_one({"name": hwSet})

    # Process for checking out sets from HW set
    if checkIn == -1:
        if numberOfSets > hardware_object['availability']:
            return "Error: the number of sets you want to check out is larger than the current available amount", 400

        else:
            project_hw_sets += numberOfSets
            hardware_object['availability'] = hardware_object['availability'] - numberOfSets

    # If we want to check in sets from Project to the HW Set
    elif checkIn == 1:
        if numberOfSets > project_hw_sets:
            return "Error: the number of sets you want to check in is larger than the current available amount in the project", 400

        else:
            project_hw_sets -= numberOfSets
            hardware_object['availability'] = hardware_object['availability'] + numberOfSets

    add_hw_set_dict[hwSet] = project_hw_sets
    print(add_hw_set_dict)

    # New article to be updated for the projects collection
    article = {
        "projectID": projectID,
        "projectName": projectName,
        "projectDescription": projectDescription,
        "checkedOutSets": add_hw_set_dict
    }

    # New article to be updated for the hardware sets collection
    article_hw = {
        "name": hardware_object['name'],
        "capacity": hardware_object['capacity'],
        "availability": hardware_object['availability']
    }

    # Update both documents
    projectCollection.replace_one({"projectID": projectID}, article, upsert=True)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    hwCollection.replace_one({"name": hardware_object['name']}, article_hw, upsert=True)
    article_hw_added = projectCollection.find_one({"name": hardware_object['name']})
    del articleAdded['_id']
    return jsonify({'result': articleAdded, 'result_hw': article_hw_added})

#/Projects?projectID=1
# Simple API call to get a project document from the database by ID
@Projects.route("/Projects", methods=['GET'])
def getProjectSetByID():
    projectID = request.args.get('projectID', type=str)
    receivedProject = projectCollection.find_one({"projectID": projectID})
    resp = dumps(receivedProject)
    return resp

#/Projects?projectID=2&projectName=SecondProject&projectDescription=the-second-project&userName=Bryan
# Create a new project set. Automatically associates the project set with the user that created it
@Projects.route("/Projects", methods = ['POST'])
def addProjectSet():

    # Basic query access
    projectID = request.args.get('projectID', type=str)
    projectName = request.args.get('projectName', type=str)
    projectDescription = request.args.get('projectDescription', type=str)
    userName = request.args.get('userName', type=str)

    # Exception handling to check if the projectID or projectName is a duplicate
    if projectCollection.count_documents({'projectID': projectID}, limit=1) != 0:
        return "Error: the projectID already exists", 400

    if projectCollection.count_documents({'projectName': projectName}, limit=1) != 0:
        return "Error: the projectName already exists", 400

    # Make new dictionary to update into Mongodb
    article = {
        "projectID": projectID,
        "projectName": projectName,
        "projectDescription": projectDescription,
        "checkedOutSets": {
        }
    }

    # Exception handling to check if the userID is valid
    doc = userCollection.find_one({'userName': userName})
    if not doc:
        return f'There is no username with name {userName}'

    # Actually update the document into MongoDB
    doc['associatedProjects'].append(projectID)
    userCollection.replace_one({"userName": userName}, doc, upsert=True)
    projectCollection.insert_one(article)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    print(articleAdded)
    del articleAdded['_id']
    return jsonify({'result': articleAdded})

#/Projects?projectID=1
@Projects.route("/Projects", methods = ['DELETE'])
def deleteProjectSet():
    projectID = request.args.get('projectID', type=str)

    # Make sure the project actually exists
    if projectCollection.count_documents({'projectID': projectID}, limit=1) != 0:

        # Have to return Hardware Sets to HWSet collection before deleting the project
        project = projectCollection.find_one({'projectID': projectID})
        dict_of_hardware_sets = project['checkedOutSets']
        for set_name, value in dict_of_hardware_sets.items():
            new_hw_collection_doc = dict()
            hw_collection_doc = hwCollection.find_one({"name": set_name})
            new_hw_collection_doc["name"] = hw_collection_doc["name"]
            new_hw_collection_doc["capacity"] = hw_collection_doc["capacity"]
            new_hw_collection_doc["availability"] = hw_collection_doc["availability"] + value
            hwCollection.replace_one({"name": set_name}, new_hw_collection_doc, upsert=True)

        projectCollection.delete_one({'projectID': projectID})

        # Have to scan all users in the database to see if they were involved with the project
        cursor = userCollection.find({})
        for doc in cursor:
            list_of_projects = doc['associatedProjects']
            if projectID in list_of_projects:
                list_of_projects.remove(projectID)
                doc['associatedProjects'] = list_of_projects
                userCollection.replace_one({'userName': doc['userName']}, doc, upsert=True)

            else:
                continue

        return "Success"
    else:
        return "The project was not found", 400