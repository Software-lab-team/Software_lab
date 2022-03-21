from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

app = Flask(__name__)
Projects = Blueprint("Projects", __name__) #same as file name and var

#/Projects?var1=mark&var2=liao
@Projects.route("/Projects")
def home():
    var1 = request.args.get('var1')
    var2 = request.args.get('var2')
    return "this calls a func in projects " + var1 + var2
