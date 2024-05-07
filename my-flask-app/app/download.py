from pytube import YouTube
import os
import json
import shutil

PATH = "data"
VIDEO_PATH = PATH + "/video"
META_PATH = PATH + "/meta"
os.makedirs(VIDEO_PATH, exist_ok=True)
os.makedirs(META_PATH, exist_ok=True)
print("loaded download.py")

def download(link:str, path=PATH, name=""):
    
    youtube = YouTube(link)
    video_720p=youtube.streams.get_by_resolution("720p")
    # name of the video is the first 15 characters of the video title (Without spaces)
    if name == "":
        name = youtube.title[:15].replace(" ", "").replace(",", "").replace(".", "").replace("!", "").replace("_", "").replace("-", "") + ".mp4"
    else:
        name = name + ".mp4"
    meta = {
        "name": name,
        "link": link,
        "title": youtube.title,
        "thumbnail": youtube.thumbnail_url,
        "views": youtube.views,
        "length": youtube.length,
    }
    print(f"Download {link} starts")
    if video_720p is not None:
        # if same name file exists, add a number to the end of the file name
        if os.path.exists(os.path.join(path, name)):
            i = 1
            while os.path.exists(os.path.join(path, name)):
                name = name.split(".")[0] + f"_{i}.mp4"
                i += 1
        # download the video
        video_720p.download(output_path=VIDEO_PATH, filename=name)
        # Put the meta data in a file
        with open(os.path.join(META_PATH, name.split(".")[0] + ".json"), "w") as f:
            json.dump(meta, f)
        
        # duplicate the video to the static folder
        shutil.copyfile(f'{VIDEO_PATH}/{name}', f'app/static/video/{name}')
        return name
    else:
        print("Video is not available or does not have a 720p version")



if __name__ == "__main__":
    link = 'https://www.youtube.com/watch?v=2QxkY6PW8Ww&ab_channel=TheDodo'
    file_name = 'rabbit_1'
    download(link, path=PATH, name=file_name)

# 1
# https://youtu.be/2QxkY6PW8Ww?si=MDrtMMxCQlCXcnKk
# rabbit_1
# rabbit on the hand k=7