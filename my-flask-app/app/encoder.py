import time
import numpy as np
from PIL import Image
import clip
from decord import VideoReader, cpu
import torch
import faiss
import classes

def encode(video_path, text_query, SAMPLING_RATE=1):
    
    start_inference = time.perf_counter()

    # Function to load frames from the video
    def load_images(video_path):
        vr = VideoReader(video_path, ctx=cpu(0))
        frames = [vr[i].asnumpy() for i in range(0, len(vr), SAMPLING_RATE)]
        return frames
    print(f"Number of frames in the video: {len(load_images(video_path))}")

    # Process and encode the frames
    start_encoding = time.perf_counter()
    image_vectors = []
    for frame in load_images(video_path):
        image = Image.fromarray(frame)
        processed_image = preprocess(image).unsqueeze(0).to(device)
        with torch.no_grad():
            image_features = model.encode_image(processed_image).squeeze(0)
        image_vectors.append(image_features.cpu().numpy())
    end_encoding = time.perf_counter()
    print(f"Encoding completed in {end_encoding - start_encoding:0.4f} seconds")
    print(f"Number of frames processed: {len(image_vectors)}")

    image_vectors = np.array(image_vectors)
    print(f"Shape of image vectors: {image_vectors.shape}")

    if not os.path.exists('embedded_vectors'):
        os.makedirs('embedded_vectors', exist_ok=True)
    # Save image vectors and text vectors to files
    video_name = video_path.split('/')[-1].split('.')[0]
    np.save(f'embedded_vectors/{video_name}_image_vectors.npy', image_vectors)

    # Encode all text queries
    def encode_text_queries(queries):
        encoded_queries = []
        for query in queries:
            text_inputs = clip.tokenize(query).to(device)
            with torch.no_grad():
                text_features = model.encode_text(text_inputs).cpu().numpy().astype(np.float32)
            text_features = np.ascontiguousarray(text_features)
            faiss.normalize_L2(text_features)
            encoded_queries.append(text_features)
        return encoded_queries

    all_queries = semantic_search_phrase + [text_query]
    start_encoding = time.perf_counter()
    encoded_all_queries = encode_text_queries(all_queries)
    end_encoding = time.perf_counter()
    print(f"Encoding completed in {end_encoding - start_encoding:0.4f} seconds")

    query = text_query.split(' ')[-1]

    np.save(f'embedded_vectors/{query}_text_vectors.npy', encoded_all_queries)

    end_inference = time.perf_counter()
    print(f"Total inference time: {end_inference - start_inference:0.4f} seconds")

    print("Encoding completed successfully")