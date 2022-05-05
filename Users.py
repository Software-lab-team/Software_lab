from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient
from bson.json_util import dumps

# Initialize blueprint to allow for API calls in multiple files
app = Flask(__name__)
Users = Blueprint("Users", __name__) #same as file name and var
client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
userCollection = db.Users
projectCollection = db.Projects

#Users/get-password?userName=Bryan
# Simple call to get the password for a userID; needed for encryption purposes
@Users.route("/Users/get-password", methods=['GET'])
def get_password_from_userID() -> str:
    username = request.args.get('userName')
    user = userCollection.find_one({'userName': username})
    if user:
        return dumps(user)
    else:
        return "The userName is not valid", 400

#/Users?userName=Bryan&password=Jeong
# Simple call to get a user based on his username and password
@Users.route("/Users", methods=['GET'])
def get_user():
    username = request.args.get('userName')

    # Some encrypting algorithm from the front end before querying in the URI
    password = request.args.get('password')
    wanted_user = userCollection.find_one({'userName': username})

    # Make sure the password matches up
    if wanted_user['password'] == password:
        resp = dumps(wanted_user)
        return resp
    else:
        return "The password is not correct", 404

#Users/get-projects?userName=Bryan
# Return a list of all projects associated with a user
@Users.route("/Users/get-projects", methods=['GET'])
def get_associated_projects():
    username = request.args.get('userName')
    user = userCollection.find_one({'userName': username})
    if user:
        resp = dumps(user['associatedProjects'])
        return resp

    else:
        return "The User was not found", 400


#/Users?userName=newUser&password=newPassword
# Create a new user
@Users.route("/Users", methods=['POST'])
def post_new_user():
    username = request.args.get("userName")
    password = request.args.get("password")

    filler_user = userCollection.find_one({"userName": username})

    # Make sure the username is unique
    if filler_user:
        return "The Username is already taken", 400
    else:
        article = {
            "userName": username,
            "password": password,
            "associatedProjects": list()
        }

        userCollection.insert_one(article)
        articleAdded = userCollection.find_one({'userName': username})
        print(articleAdded)
        del articleAdded['_id']

        return jsonify({'result': articleAdded})


#/Users/update-user?userName=Bryan&projectID=1
# Associate a user with a pre-existing project
@Users.route("/Users/update-user", methods=['POST'])
def post_new_project():
    username = request.args.get('userName')
    projectID = request.args.get('projectID')
    user = userCollection.find_one({"userName": username})

    # Error check username
    if user is None:
        return "The user does not exist", 400

    else:
        project = projectCollection.find_one({"projectID": projectID})

        # Error Check project ID
        if not project:
            return "The project does not exist", 404

        else:

            # Isolate necessary fields from the MongoDB document in the project and user collections
            project_id = project["projectID"]
            list_of_user_projects = user["associatedProjects"]

            # Check that the project is not already associated with the user
            if project_id in list_of_user_projects:
                return "The project is already associated with the user", 400
            else:

                # Append the project to the projects associated with the given user
                list_of_user_projects.append(project_id)
                article = {
                    'userName': username,
                    'password': user['password'],
                    'associatedProjects': list_of_user_projects
                }

                # Update the MongoDB Document
                userCollection.replace_one({'userName': username}, article, upsert=True)
                userAdded = userCollection.find_one({'userName': username})
                print(userAdded)
                del userAdded['_id']
                print(type({'result': userAdded}))
                resp = dumps(userAdded)
                return resp





