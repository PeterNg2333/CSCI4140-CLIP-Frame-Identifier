'''
# This is the API specification for the Flask app.
# It is used to generate the OpenAPI specification for the app.
'''
from app import download
from app import encoder
from app import inference
import os
import json


# In download.py
def download_video(url: str) -> str:
    '''
    Download a youtube video from a URL.
    :param url: The URL of the video to download.
    :return: the status of the download success or failure.
    For the downloaded video, you should save it inside root/data/
    '''
    print("Downloading video")
    try:
        name = download.download(url)
        # if same name file exists in embedded_vectors do nothing, else encode the video
        file_name = name.split('.')[0]
        if os.path.exists(f'./app/embedded_vectors/{file_name}_image_vectors.npy'):
            print(f"Video {name} already exists")
            return name, True
        else:
            print("Encoding video")
            encoder.encode_video(f'./data/video/{name}')
            print("Encoding completed successfully")
            return name, True

    except Exception as e:
        print(f"Error downloading video: {e}")
        return None, False
    

    
# In encoder.py
def encode_video(name: str, SAMPLING_RATE=1):
    '''
    Encode the video frames and text query.
    :param video_path: The path to the video file.
    :return: the status of the encoding success or failure.
    For the encoded video, you should save the image vectors inside root/app/embedded_vectors/video/
    '''
    return encoder.encode_video(f'./data/video/{name}')

# In encoder.py
def encode_text(text_query: str):
    '''
    Encode the text query.
    :param text_query: The text query.
    :return: the status of the encoding success or failure.
    For the encoded text query, you should save the text vectors inside root/app/embedded_vectors/text/
    '''
    return encoder.encode_text(text_query)

# Could you use the first frame in search_frame since it's already fast enough. Also if we do search separatel, it will generate repeated frames.
# def search_video(video_path: str, text_query: str) -> str:
#     '''
#     Search for the particular video that matches the text query. Once there are at least 1 frame that matches the text query, the video is considered a match.
#     :param video_path: The path to the video file.
#     :param text_query: The text query.
#     :return: the result of the search matched or not matched.
#     '''
#     try:
#         print("Searching video")
#         ## If text_query is empty, encode it first
#         if not os.path.exists(f'./app/embedded_vectors/{text_query}_text_vectors.npy'):
#             print("Encoding text")
#             encode_text(text_query)
#         result, video_path = inference.search(video_path, text_query, 1)
#         print("Video search completed successfully")
#         str_result = []
#         for i in result:
#             # Convert numpy.int64 to python string
#             temp_str = str(i)
#             str_result.append(temp_str)
#         return str_result
#     except Exception as e:
#         print(f"Error searching video: {e}")
#         return f"Error searching video: {e}"

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
    try:
        print("Searching frame")
        ## If text_query is empty, encode it first
        if not os.path.exists(f'./app/embedded_vectors/{text_query}_text_vectors.npy'):
            encode_text(text_query)

        ## Decide the number of k based on length of video
        meta_path = f'./data/meta/{video_path.split("/")[-1].split(".")[0]}.json'
        with open(meta_path) as f:
            meta = json.load(f)
            length = meta['length']
        if length <= 60:
            new_k = 5
        else: 
            new_k =length//10
        k = min(k, new_k)
        result, video_path = inference.search(video_path, text_query, k)
        print("Frame search completed successfully")
        str_result = []
        for i in result:
            # Convert numpy.int64 to python string
            temp_str = str(i)
            str_result.append(temp_str)
        return  str_result
    except Exception as e:
        print(f"Error searching frame: {e}")
        return f"Error searching frame: {e}"
    

def get_all_videos():
    '''
    Get all the videos that are available in the data folder.
    :return: a list of all the videos available.
    '''
    return os.listdir('./data/video')

def get_all_meta(video_list):
    '''
    Get the metadata of all the videos that are available in the data folder.
    :param video_list: a list of all the videos available.
    :return: a list of all the metadata of the videos available.
    '''
    list = []
    for i in video_list:
        name = i.split('.')[0]
        json_file = f'./data/meta/{name}.json'
        if os.path.exists(json_file):
            with open(json_file) as f:
                list.append(json.load(f))
    return list

def get_all_text_vectors():
    '''
    Get all the text vectors that are available in the embedded_vectors folder.
    :return: a list of all the text vectors available.
    '''
    list = os.listdir('./app/embedded_vectors')
    return [i for i in list if '_text_' in i]

def get_all_image_vectors():
    '''
    Get all the image vectors that are available in the embedded_vectors folder.
    :return: a list of all the image vectors available.
    '''
    list = os.listdir('./app/embedded_vectors')
    return [i for i in list if '_image_' in i]



