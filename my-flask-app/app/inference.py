import numpy as np
import os
from PIL import Image
import clip
from decord import VideoReader, cpu
import faiss
import torch
from sklearn.cluster import KMeans
import time
import classes

def search(video_path, text_query, k):

    # Video path and text query
    class_list = [f" {c}" for c in classes.CLASSES]
    semantic_search_phrase = class_list

    # Sampling rate
    SAMPLING_RATE = 1 #@param {type:"integer"}

    # Output folder
    output_folder = "output" #@param {type:"string"}

    # Searching top nearest queries
    TOP_NEAREST_QUERIES = 20

    start_inference = time.perf_counter()

    # Function to load frames from the video
    def load_images(video_path):
        vr = VideoReader(video_path, ctx=cpu(0))
        frames = [vr[i].asnumpy() for i in range(0, len(vr), SAMPLING_RATE)]
        return frames

    start_inference = time.perf_counter()


    video_name = video_path.split('/')[-1].split('.')[0]
    image_vectors = np.load(f'embedded_vectors/{video_name}_image_vectors.npy')
    query = text_query.split(' ')[-1]
    encoded_all_queries = np.load(f'embedded_vectors/{query}_text_vectors.npy')
    all_query_vectors = np.vstack(encoded_all_queries)

    print(f"Number of frames processed: {len(image_vectors)}")
    image_vectors = np.array(image_vectors).astype(np.float32)
    print(f"Shape of image vectors: {image_vectors.shape}")
    faiss.normalize_L2(image_vectors)

    # Create a FAISS index
    index = faiss.IndexFlatIP(image_vectors.shape[1])
    index.add(image_vectors)
    
    text_features = np.array(encoded_all_queries[-1])
    faiss.normalize_L2(text_features)

    # Perform the image pre-selection search
    threshold = 0.2
    D, I = index.search(text_features, k=int(len(image_vectors)/8))
    selected_frames = [idx for idx, score in zip(I[0], D[0]) if score > threshold]

    # Normalize and create a FAISS index for all text query vectors
    index_queries = faiss.IndexFlatIP(all_query_vectors.shape[1])
    faiss.normalize_L2(all_query_vectors)
    index_queries.add(all_query_vectors)

    # Shortlist frames
    shortlisted_frames = []
    for frame_idx in selected_frames:
        frame_vector = np.array([image_vectors[frame_idx]], dtype=np.float32)
        frame_vector = np.ascontiguousarray(frame_vector)
        faiss.normalize_L2(frame_vector)

        # Perform the search for the closest text queries
        D, I = index_queries.search(frame_vector, k=TOP_NEAREST_QUERIES)

        # Find the index of the original query in the results
        original_query_index = len(semantic_search_phrase)
        if original_query_index in I[0]:
            shortlisted_frames.append(frame_idx)

    # Display shortlisted frames
    print(f"Number of frames in shortlist: {len(shortlisted_frames)}")
    for frame_number in shortlisted_frames:
        print(f"Frame {frame_number * SAMPLING_RATE} is in the shortlist.")

    end_inference = time.perf_counter()
    print(f"Total inference time: {end_inference - start_inference:0.4f} seconds")

    if len(shortlisted_frames) > k:
        shortlisted_vectors = np.array([image_vectors[idx] for idx in shortlisted_frames])

        start_diversify = time.perf_counter()
        kmeans = KMeans(n_clusters=k, random_state=0).fit(shortlisted_vectors)
        end_diversify = time.perf_counter()
        print(f"Diversification time: {end_diversify - start_diversify:0.4f} seconds")

        # Find the first frame and select it in each cluster
        cluster_frame_indices = {i: [] for i in range(k)}
        for frame_idx, cluster_label in zip(shortlisted_frames, kmeans.labels_):
            cluster_frame_indices[cluster_label].append(frame_idx)
        first_frames_in_clusters = [cluster_frame_indices[i][0] for i in range(k) if cluster_frame_indices[i]]

        # Sort these top score frames based on their order in shortlisted_frames
        sorted_cluster_frames = sorted(first_frames_in_clusters, key=lambda x: shortlisted_frames.index(x))

        return sorted_cluster_frames, video_path

        os.makedirs(output_folder, exist_ok=True)
        for rank, frame_idx in enumerate(sorted_cluster_frames):
            real_frame_number = frame_idx * SAMPLING_RATE
            frame = load_images(video_path)[frame_idx]
            Image.fromarray(frame).save(f"{output_folder}/sorted_cluster_{rank}_frame_{real_frame_number}.jpg")
            print(f"Saved frame {real_frame_number} as sorted cluster {rank} in the output folder.")

    else:
        # Not enough for clustering
        print("Not enough frames to perform clustering, saving all frames.")
        return shortlisted_frames, video_path
        os.makedirs(output_folder, exist_ok=True)
        for rank, frame_idx in enumerate(shortlisted_frames):
            real_frame_number = frame_idx * SAMPLING_RATE
            frame = load_images(video_path)[frame_idx]
            Image.fromarray(frame).save(f"{output_folder}/frame_{real_frame_number}.jpg")
            print(f"Saved frame {real_frame_number}.")


video_path = '../VideoDataAirport/amsterdam_airport_2.mp4' #@param {type:"string"}
text_query = "a man or a woman in orange coat" #@param {type:"string"}
k = 5 #@param {type:"integer"}

result, _ = search(video_path, text_query, k)
print(result)