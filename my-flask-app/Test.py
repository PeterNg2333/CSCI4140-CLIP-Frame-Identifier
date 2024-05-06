from app import api_spec

list = ["https://www.youtube.com/watch?v=6fbN1NA9ibI&ab_channel=StockMedia"]

for i in list:
    api_spec.download_video(i)

# api_spec.encode_text("cat")
# print(api_spec.search_frame("./data/video/rabbit_1.mp4", "cat", 2))