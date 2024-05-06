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
    query = request.args.get('query')
    search = app.config["title_choices"]["Search"]
    video_list = api_spec.get_all_videos()
    return  render_template('index.html', title=search, APP_CONFIG=app.config, query=query, video_list=video_list, list_files=app.config['templates_list_files'])

@app.route('/videoEditor')
def editor_html():
    editor = app.config["title_choices"]["Editor"]
    return  render_template('index.html', title=editor, APP_CONFIG=app.config, list_files=app.config['templates_list_files'])

@app.route('/root')
def root():
    return os.path.dirname(os.path.realpath(__file__))

@app.route('/getInVideoFrames', methods=['POST'])
def search_frame():
    data_json = request.get_json()
    file_name = data_json['fileName']
    video_path = f"./data/video/{file_name}"
    queryString = data_json['queryString']
    k = 7
    sorted_cluster_frames= api_spec.search_frame(video_path, queryString, int(k))
    print(sorted_cluster_frames)
    return json.dumps(sorted_cluster_frames)

@app.route('/uploadURL', methods=['POST'])
def update_url():
    ## Get the data from body
    url_json = request.get_json()
    url = url_json['url']
    print(url)
    name, state = api_spec.download_video(url)
    if (state):
        return f"Downloaded video: {name}", 200
    else:
        ## state code become 500
        return f"Error downloading video: {name}", 500
    
@app.route('/getMetaList', methods=['GET'])
def get_meta_list():
    video_list = api_spec.get_all_videos()
    video_mata = api_spec.get_all_meta(video_list)
    return json.dumps(video_mata)




# @app.route('/getMatchedVideo', methods=['POST'])
# def search_video():
#     data_json = request.get_json()
#     file_name = data_json['fileName']
#     print("Searching video" + file_name)
#     video_path = f"./data/video/{file_name}"
#     queryString = data_json['queryString']
#     result = api_spec.search_frame(video_path, queryString, 5)
#     if result != []:
#         name = file_name.split('.')[0]
#         json_file = f'./data/meta/{name}.json'
#         if os.path.exists(json_file):
#             with open(json_file) as f:
#                 video_mata = json.load(f)
#         else:
#             video_mata = {}
#         return json.dumps(video_mata)
#     else:
#         return json.dumps([False])

