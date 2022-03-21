from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

app = Flask(__name__)
HWSets = Blueprint("HWSets", __name__) #same as file name and var

#/HWSets?var1=mark&var2=liao
@HWSets.route("/HWSets")
def home():
    var1 = request.args.get('var1')
    var2 = request.args.get('var2')
    return "this calls a func in hwsets " + var1 + var2