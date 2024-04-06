import time
import os

from flask import render_template

from app import app



@app.route('/')
@app.route('/index')
def index():
    return "Version 0.1"

@app.route('/index.html')
def index_html():
    list_files = os.listdir(os.path.dirname(os.path.realpath(__file__)) + '/templates')
    try:
        return  render_template('index.html', title='Home', list_files=list_files)
    except Exception as e:
        return str(e)

@app.route('/time')
def get_time():
    return {"time": time.time()}

