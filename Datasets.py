from flask import Flask, Blueprint
import os
import wfdb

app = Flask(__name__)
Datasets = Blueprint("Datasets", __name__)

@Datasets.route("/Datasets")
def test():
    return "this calls a func in Datasets"