import time
import os

from flask import render_template

from app import app


@app.route('/index')
def index():
    return "Version 0.1"

@app.route('/')
@app.route('/Home')
def index_html():
    home = app.config["title_choices"]["Home"]
    return  render_template('index.html', title=home, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/videoPlayer')
def player_html():
    player = app.config["title_choices"]["Player"]
    return  render_template('index.html', title=player, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/videoSearch')
def search_html():
    search = app.config["title_choices"]["Search"]
    return  render_template('index.html', title=search, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/root')
def root():
    return os.path.dirname(os.path.realpath(__file__))

@app.route('/time')
def get_time():
    return {"time": time.time()}

