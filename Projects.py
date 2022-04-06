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
class Project:
    def __init__(self):
        name: str
        id: str
        description: str
        checked_out_HW_sets: dict

# #/Projects?var1=mark&var2=liao
# @Projects.route("/Projects")
# def home():
#     var1 = request.args.get('var1')
#     var2 = request.args.get('var2')
#     return "this calls a func in projects " + var1 + var2

#/Projects?projectID=1&checkIn=1&HWSet=1&number=20
@Projects.route("/Projects", methods=['PUT'])
def updateProjectSetByID():
    projectID = request.args.get('projectID', type=str)
    # Check In = 1 , Check Out = -1
    checkIn = request.args.get('checkIn', type=int)
    hwSet = request.args.get('HWSet', type=str)
    numberOfSets = request.args.get('number', type=int)
    receivedProject = projectCollection.find_one({"projectID": projectID})

    if not receivedProject:
        return "There is no project with the given projectID", 400


    checkedOutSets = receivedProject['checkedOutSets']

    all_hw_sets = HWSets.getAllHWSets()
    print(all_hw_sets)
    list_of_hw_set_names = list()
    for entry in all_hw_sets['result']:
        list_of_hw_set_names.append(entry['name'])

    if hwSet not in list_of_hw_set_names:
        return f'There is no HW set with name + {hwSet}', 400

    if hwSet not in checkedOutSets:
        # Have to add the HW Set to the project
        add_hw_set_dict = checkedOutSets
        project_hw_sets = 0
    else:
        add_hw_set_dict = checkedOutSets
        project_hw_sets = checkedOutSets[hwSet]

    projectName = str(receivedProject['projectName'])
    projectDescription = str(receivedProject['projectDescription'])

    hardware_object = hwCollection.find_one({"name": hwSet})
    # If we want to check out sets from HW Set to the project

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

    article = {
        "projectID": projectID,
        "projectName": projectName,
        "projectDescription": projectDescription,
        "checkedOutSets": add_hw_set_dict
    }

    article_hw = {
        "name": hardware_object['name'],
        "capacity": hardware_object['capacity'],
        "availability": hardware_object['availability']
    }

    projectCollection.replace_one({"projectID": projectID}, article, upsert=True)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    hwCollection.replace_one({"name": hardware_object['name']}, article_hw, upsert=True)
    article_hw_added = projectCollection.find_one({"name": hardware_object['name']})
    del articleAdded['_id']
    # del article_hw_added['_id']

    return jsonify({'result': articleAdded, 'result_hw': article_hw_added})

#/Projects?projectID=1
@Projects.route("/Projects", methods=['GET'])
def getProjectSetByID():
    projectID = request.args.get('projectID', type=str)
    receivedProject = projectCollection.find_one({"projectID": projectID})
    resp = dumps(receivedProject)
    return resp

#/Projects?projectID=2&projectName=SecondProject&projectDescription=the-second-project
@Projects.route("/Projects", methods = ['POST'])
def addProjectSet():
    projectID = request.args.get('projectID', type=str)
    projectName = request.args.get('projectName', type=str)
    projectDescription = request.args.get('projectDescription', type=str)
    # Exception
    if projectCollection.count_documents({'projectID': projectID}, limit=1) != 0:
        return "Error: the projectID already exists", 400

    if projectCollection.count_documents({'projectName': projectName}, limit=1) != 0:
        return "Error: the projectName already exists", 400

    article = {
        "projectID": projectID,
        "projectName": projectName,
        "projectDescription": projectDescription,
        "checkedOutSets": {
        }
    }

    projectCollection.insert_one(article)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    print(articleAdded)
    del articleAdded['_id']

    return jsonify({'result': articleAdded})

#/Projects?projectID=1
@Projects.route("/Projects", methods = ['DELETE'])
def deleteProjectSet():
    projectID = request.args.get('projectID', type=str)
    if projectCollection.count_documents({'projectID': projectID}, limit=1) != 0:
        projectCollection.delete_one({'projectID': projectID})
        return "Success"
    else:
        return "The project was not found", 400