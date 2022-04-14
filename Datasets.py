from flask import Flask, Blueprint, request
import os
import wfdb
import shutil

app = Flask(__name__)
Datasets = Blueprint("Datasets", __name__)

# https://physionet.org/content/circor-heart-sound/1.0.1/
def get_circor():
    file_list = ['training_data/13918_AV.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('circor-heart-sound', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/training_data/13918_AV') 
    shutil.rmtree(dl_dir)
    return record.__dict__

# https://physionet.org/content/taichidb/1.0.2/
def get_taichi():
    file_list = ['Dual-task/S0088_DT_V1.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('taichidb', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/Dual-task/S0088_DT_V1')
    shutil.rmtree(dl_dir) 
    return record.__dict__

# https://physionet.org/content/staffiii/1.0.0/
def get_staff():
    file_list = ['data/001a.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('staffiii', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/data/001a')
    shutil.rmtree(dl_dir) 
    return record.__dict__

# https://physionet.org/content/aftdb/1.0.0/
def get_aftdb():
    file_list = ['learning-set/n01.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('aftdb', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/learning-set/n01')
    shutil.rmtree(dl_dir) 
    return record.__dict__

# https://physionet.org/content/ahadb/1.0.0/
def get_ahadb():
    file_list = ['0001.hea']
    cwd = os.getcwd()
    dl_dir = os.path.join(cwd, 'tmp_dl_dir')
    wfdb.dl_files('ahadb', dl_dir, file_list)
    record = wfdb.rdheader('tmp_dl_dir/0001')
    shutil.rmtree(dl_dir) 
    return record.__dict__

#/Datasets?dataset=circor
@Datasets.route("/Datasets")
def test():
    dataset = request.args.get('dataset', type=str)
    if(dataset == 'circor'):
        return get_circor()
    elif(dataset == 'taichi'):
        return get_taichi()
    elif(dataset == 'staffiii'):
        return get_staff()
    elif(dataset == 'aftdb'):
        return get_aftdb()
    elif(dataset == 'ahadb'):
        return get_ahadb()
    else:
        return 'Dataset not found', 404