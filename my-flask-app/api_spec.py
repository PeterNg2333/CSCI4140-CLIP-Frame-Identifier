'''
# This is the API specification for the Flask app.
# It is used to generate the OpenAPI specification for the app.
'''

# In download.py
def download_video(url: str) -> str:
    '''
    Download a youtube video from a URL.
    :param url: The URL of the video to download.
    :return: the status of the download success or failure.
    For the downloaded video, you should save it inside root/data/
    '''
    pass

# In encoder.py
def encode_video(video_path: str, SAMPLING_RATE=1):
    '''
    Encode the video frames and text query.
    :param video_path: The path to the video file.
    :return: the status of the encoding success or failure.
    For the encoded video, you should save the image vectors inside root/app/embedded_vectors/video/
    '''
    pass

# In encoder.py
def encode_text(text_query: str):
    '''
    Encode the text query.
    :param text_query: The text query.
    :return: the status of the encoding success or failure.
    For the encoded text query, you should save the text vectors inside root/app/embedded_vectors/text/
    '''
    pass

# Could you use the first frame in search_frame since it's already fast enough. Also if we do search separatel, it will generate repeated frames.
def search_video(video_path: str, text_query: str) -> str:
    '''
    Search for the particular video that matches the text query. Once there are at least 1 frame that matches the text query, the video is considered a match.
    :param video_path: The path to the video file.
    :param text_query: The text query.
    :return: the result of the search matched or not matched.
    '''
    pass

# In inference.py, return a list of frames and the original video_path
def search_frame(video_path: str, text_query: str, k: int):
    '''
    Search for the particular frame that matches the text query.
    :param video_path: The path to the video file.
    :param text_query: The text query.
    :param k: The number of frames to return.
    :return: the result of the search matched or not matched. 
    :return the sorted list of frames that match the text query.
    '''
    pass