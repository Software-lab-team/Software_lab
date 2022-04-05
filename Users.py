from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
Users = Blueprint("Users", __name__) #same as file name and var
client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
userCollection = db.Users
projectCollection = db.Projects
# #/Users?var1=mark&var2=liao
# @Users.route("/Users")
# def home():
#     var1 = request.args.get('var1')
#     var2 = request.args.get('var2')
#     return "this calls a func in users " + var1 + var2

#Users/get-password?userName=Bryan
@Users.route("/Users/get-password", methods=['GET'])
def get_password_from_userID() -> str:
    username = request.args.get('userName')
    user = userCollection.find_one({'userName': username})
    return user['password']

#/Users?userName=Bryan&password=Jeong
@Users.route("/Users", methods=['GET'])
def get_user():
    username = request.args.get('userName')

    # Some encrypting algorithm from the front end before querying in the URI
    password = request.args.get('password')
    wanted_user = userCollection.find_one({'userName': username})
    # print(wanted_user)
    if wanted_user:
        if wanted_user['password'] == password:
            resp = dumps(wanted_user)
            return resp
        else:
            return "The password is not correct", 404

    else:
        return "The userName is not valid", 400

#Users/get-projects?userName=Bryan
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
@Users.route("/Users", methods=['POST'])
def post_new_user():
    username = request.args.get("userName")
    password = request.args.get("password")

    filler_user = userCollection.find_one({"userName": username})
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
@Users.route("/Users/update-user", methods=['POST'])
def post_new_project():
    username = request.args.get('userName')
    projectID = request.args.get('projectID')
    user = userCollection.find_one({"userName": username})
    if user is None:
        return "The user does not exist", 400

    else:
        project = projectCollection.find_one({"projectID": projectID})
        if not project:
            return "The project does not exist", 404

        else:
            list_of_user_projects = user["associatedProjects"]
            if project in list_of_user_projects:
                return "The project is already associated with the user", 400
            else:
                list_of_user_projects.append(project)
                article = {
                    'userName': username,
                    'password': user['password'],
                    'associatedProjects': list_of_user_projects
                }
                userCollection.replace_one({'userName': username}, article, upsert=True)
                userAdded = userCollection.find_one({'userName': username})
                print(userAdded)
                del userAdded['_id']

                print(type({'result': userAdded}))
                resp = dumps(userAdded)
                return resp





