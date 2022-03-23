from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

app = Flask(__name__)
HWSets = Blueprint("HWSets", __name__) #same as file name and var

client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
hwCol = db.HWSets

# Properties
# Hardware Set Name
# Capacity
# Availability

#/HWSets?var1=mark&var2=liao
@HWSets.route("/HWSets")
def home():
    var1 = request.args.get('var1')
    var2 = request.args.get('var2')
    return "this calls a func in hwsets " + var1 + var2

#/HWSets?name=HWSet1&capacity=100
@HWSets.route('/HWSets', methods=['POST'])
def addHWSet():
    name = request.args.get('name', type=str)
    capacity = request.args.get('capacity', type=int)
    # if hwCol.count_documents({'name': name}, limit=1) != 0:
    #     abort()
    article = {
        "Name": name,
        "Capacity": capacity,
        "Availability": capacity
    }

    hwCol.insert_one(article)
    articleAdded = hwCol.find_one({'Name': name})
    print(articleAdded)
    del articleAdded['_id']

    return jsonify({'result': articleAdded})
