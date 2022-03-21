from flask import Flask, jsonify, request
from matplotlib.style import available
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb+srv://meck122:HlepBjXty90Qw3kA@cluster0.xnrg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.defaultDatabase
hwCol = db.HWSet
userCol = db.Users
projCol = db.Projects

@app.route('/HWSet/info', methods=['GET'])
def getAllHWSets():
    output = []
    for hw in hwCol.find():
        print(type(hw))
        output.append({'Name': hw['Name'], 'Capacity': hw['Capacity'], 'Availability': hw['Availability']})
    return {'result': output}
    # return jsonify({'result': output})

@app.route('/HWSet/info/<name>/<capacity>/<availability>', methods=['POST'])
def addHWSet(name, capacity, availability):
    article = {
        "Name": name,
        "Capacity": capacity,
        "Availability": availability
    }

    hwCol.insert_one(article)
    articleAdded = hwCol.find_one({'Name': name})
    print(articleAdded)
    del articleAdded['_id']

    return jsonify({'result': articleAdded})

if __name__ == '__main__':
    app.run(debug=True)