from flask import Flask
from HWSets import HWSets
from Projects import Projects
from Users import Users
from Datasets import Datasets
from flask_cors import CORS,cross_origin

# Initialize the application, add CORS middleware so the front-end can communicate with the back-end
app = Flask(__name__)
CORS(app)
app.register_blueprint(HWSets)
app.register_blueprint(Projects)
app.register_blueprint(Users)
app.register_blueprint(Datasets)

@app.route("/")
def test():
    return "this calls a func in main"

if __name__ == "__main__":
    app.run(debug=True)