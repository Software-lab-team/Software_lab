from flask import Flask
from HWSets import HWSets
from Projects import Projects
from Users import Users

app = Flask(__name__)
app.register_blueprint(HWSets)
app.register_blueprint(Projects)
app.register_blueprint(Users)

@app.route("/")
def test():
    return "this calls a func in main"

if __name__ == "__main__":
    app.run(debug=True)