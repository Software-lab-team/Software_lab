from flask import Flask, jsonify, request, Blueprint
from pymongo import MongoClient

# Initialize blueprint; the blueprint allows you to separate API calls into separate files
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
# Get all of the current available Hardware Sets
@HWSets.route('/HWSets', methods=['GET'])
def getAllHWSets():
    output = []
    for hw in hwCol.find():
        output.append({'name': hw['name'], 'capacity': hw['capacity'], 'availability': hw['availability']})
    return {'result': output}
    # return jsonify({'result': output})

#/HWSets?name=HWSet1&capacity=100
# Add a new hardware set to the database
@HWSets.route('/HWSets', methods=['POST'])
def addHWSet():

    # Get Query parameters from the API call
    name = request.args.get('name', type=str)
    capacity = request.args.get('capacity', type=int)

    # Error checking to prevent duplicate Hardware Sets from being created
    if hwCol.count_documents({'name': name}, limit=1) != 0:
        return 'Error: HWSet already exists', 400

    # Format of MongoDB document
    article = {
        "name": name,
        "capacity": capacity,
        "availability": capacity
    }

    # Insert the document into the collection
    hwCol.insert_one(article)
    articleAdded = hwCol.find_one({'name': name})
    print(articleAdded)
    del articleAdded['_id']
    return jsonify({'result': articleAdded})