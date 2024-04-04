from pytube import YouTube
import os

def download(link:str,path,name):
    youtube=YouTube(link)
    video_2160p=youtube.streams.get_by_resolution("720p")
    print(f"Download {link} starts")
    if video_2160p is not None:
        video_2160p.download(output_path=path,filename=name)
    else:
        print("Video is not available or does not have a 2160p version")

#We are using the video for Hong Kong video
link = [
    #'https://www.youtube.com/watch?v=VRmh2gGeBiE',
    # 'https://www.youtube.com/watch?v=ZgxirOW9_go'
    'https://www.youtube.com/watch?v=QAyO3qsNZUk'
]
file_names=[
    #'jfk_airport_VRmh2gGeBiE.mp4',
    'incheon_airport.mp4',
]

if __name__ == "__main__":
    os.makedirs('data',exist_ok=True)
    for i,video_link in enumerate(link):
        download(video_link,'data',file_names[i])