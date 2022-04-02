from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

app = Flask(__name__)
HWSets = Blueprint("HWSets", __name__) #same as file name and var

client = MongoClient('mongodb+srv://secure-username:secure-password@cluster0.di8dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.Main
hwCol = db.HWSets

# Properties
# name
# capacity
# availability

#/HWSets
@HWSets.route('/HWSets', methods=['GET'])
def getAllHWSets():
    output = []
    for hw in hwCol.find():
        output.append({'name': hw['name'], 'capacity': hw['capacity'], 'availability': hw['availability']})
    return {'result': output}
    # return jsonify({'result': output})

#/HWSets?name=HWSet1&capacity=100
@HWSets.route('/HWSets', methods=['POST'])
def addHWSet():
    name = request.args.get('name', type=str)
    capacity = request.args.get('capacity', type=int)
    if hwCol.count_documents({'name': name}, limit=1) != 0:
        return 'Error: HWSet already exists', 400
    
    article = {
        "name": name,
        "capacity": capacity,
        "availability": capacity
    }

    hwCol.insert_one(article)
    articleAdded = hwCol.find_one({'name': name})
    print(articleAdded)
    del articleAdded['_id']
    return jsonify({'result': articleAdded})

#/HWSets?name=HWSet1
@HWSets.route('/HWSets', methods=['DELETE']) # Note: does not check if name exists
def delHWSet():
    name = request.args.get('name', type=str)
    articleAdded = hwCol.find_one({'name': name})
    del articleAdded['_id'] 
    hwCol.delete_one({'name': name}) 
    return jsonify({'result deleted': articleAdded})