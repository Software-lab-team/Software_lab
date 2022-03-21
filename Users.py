from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

app = Flask(__name__)
Users = Blueprint("Users", __name__) #same as file name and var

#/Users?var1=mark&var2=liao
@Users.route("/Users")
def home():
    var1 = request.args.get('var1')
    var2 = request.args.get('var2')
    return "this calls a func in users " + var1 + var2
