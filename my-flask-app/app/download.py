from pytube import YouTube
import os

def download(link:str, path, name):
    name = name + '.mp4'
    if not os.path.exists(path):
        os.makedirs(path)
    youtube = YouTube(link)
    video_720p=youtube.streams.get_by_resolution("720p")
    print(f"Download {link} starts")
    if video_720p is not None:
        video_720p.download(output_path=path, filename=name)
    else:
        print("Video is not available or does not have a 720p version")


if __name__ == "__main__":
    link = 'https://youtu.be/2QxkY6PW8Ww?si=MDrtMMxCQlCXcnKk'
    file_name = 'rabbit'
    os.makedirs('data', exist_ok=True)
    download(link, 'data', file_name)

# 1
# https://youtu.be/2QxkY6PW8Ww?si=MDrtMMxCQlCXcnKk
# rabbit
# rabbit on the hand k=7