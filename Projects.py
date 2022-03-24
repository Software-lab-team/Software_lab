from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient
from bson.json_util import dumps
app = Flask(__name__)
Projects = Blueprint("Projects", __name__) #same as file name and var
client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
projectCollection = db.Projects

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

#/Projects?projectID=1&checkIn=True&hwSet=HWSet1&number=20
@Projects.route("/Projects/update-project", methods=['PUT', 'GET'])
def updateProjectSetByID():
    projectID = request.args.get('projectID', type=str)
    checkIn = request.args.get('projectID', type=bool)
    hwSet = request.args.get('hwSet', type=str)
    numberOfSets = request.args.get('number', type=int)
    receivedProject = projectCollection.find_one({"projectID": projectID})
    checkedOutSets = receivedProject['checkedOutSets']
    currentHWSetCapacity = int(receivedProject['checkedOutSets'][hwSet])
    projectName = str(receivedProject['projectName'])
    projectDescription = str(receivedProject['projectDescription'])

    if checkIn:
        currentHWSetCapacity += numberOfSets
    else:
        currentHWSetCapacity -= numberOfSets

    checkedOutSets[hwSet] = currentHWSetCapacity

    article = {
        "projectID": projectID,
        "projectName": projectName,
        "projectDescription": projectDescription,
        "checkedOutSets": checkedOutSets
    }
    projectCollection.replace_one({"projectID": projectID}, article, upsert=True)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    print(articleAdded)
    del articleAdded['_id']

    return jsonify({'result': articleAdded})

#/Projects?projectID=1
@Projects.route("/Projects/get-project", methods=['Get'])
def getProjectSetByID():
    projectID = request.args.get('projectID', type=str)
    receivedProject = projectCollection.find_one({"projectID": projectID})
    resp = dumps(receivedProject)
    return resp

#/Projects?projectID=2&projectName=SecondProject&Description=the-second-project
@Projects.route("/Projects/post-project", methods = ['POST', 'GET'])
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
            "HWSet1": 50
        }
    }

    projectCollection.insert_one(article)
    articleAdded = projectCollection.find_one({'projectID': projectID})
    print(articleAdded)
    del articleAdded['_id']

    return jsonify({'result': articleAdded})
