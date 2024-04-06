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
    return  render_template('index.html', title='Home', list_files=app.config['templates_list_files'])

@app.route('/root')
def root():
    return os.path.dirname(os.path.realpath(__file__))

@app.route('/time')
def get_time():
    return {"time": time.time()}

