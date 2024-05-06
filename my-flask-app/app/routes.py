import time
import os
import json

from flask import render_template, request

from app import app
from app import api_spec



@app.route('/index')
def index():
    return "Version 0.1"

@app.route('/')
@app.route('/Home')
def index_html():
    home = app.config["title_choices"]["Home"]
    video_list = api_spec.get_all_videos()
    video_mata = api_spec.get_all_meta(video_list)
    print(video_mata[0])
    length = len(video_list)
    return  render_template('index.html', 
                            title=home, 
                            APP_CONFIG=app.config, 
                            video_mata=video_mata, 
                            length=length,
                            list_files=app.config['templates_list_files'])

@app.route('/videoPlayer')
def player_html():
    player = app.config["title_choices"]["Player"]
    video_query=request.args.get('video_name')
    print(video_query)
    # get the meta data of the target video with the video query
    name = video_query.split('.')[0]
    json_file = f'./data/meta/{name}.json'
    if os.path.exists(json_file):
        with open(json_file) as f:
            video_mata = json.load(f)
    else:
        video_mata = {}
    
    return  render_template('index.html', 
                            title=player, 
                            APP_CONFIG=app.config, 
                            video_query=video_query,
                            video_mata=video_mata,
                            list_files=app.config['templates_list_files'])

@app.route('/videoSearch')
def search_html():
    search = app.config["title_choices"]["Search"]
    return  render_template('index.html', title=search, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/videoEditor')
def editor_html():
    editor = app.config["title_choices"]["Editor"]
    return  render_template('index.html', title=editor, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/root')
def root():
    return os.path.dirname(os.path.realpath(__file__))


@app.route('/time')
def get_time():
    return {"time": time.time()}

