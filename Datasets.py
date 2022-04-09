from flask import Flask, Blueprint, request
import os
import wfdb
import shutil

app = Flask(__name__)
Datasets = Blueprint("Datasets", __name__)

def get_circor():
    file_list = ['training_data/13918_AV.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('circor-heart-sound', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/training_data/13918_AV') 
    shutil.rmtree(dl_dir)
    return str(record.__dict__)

def get_taichi():
    file_list = ['Dual-task/S0088_DT_V1.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('taichidb', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/Dual-task/S0088_DT_V1')
    shutil.rmtree(dl_dir) 
    return str(record.__dict__)

#/Datasets?dataset=circor
@Datasets.route("/Datasets")
def test():
    dataset = request.args.get('dataset', type=str)
    if(dataset == 'circor'):
        return get_circor()
    elif(dataset == 'taichi'):
        return get_taichi()
    else:
        return 'Dataset not found', 404