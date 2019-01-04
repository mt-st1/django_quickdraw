import pickle

import numpy as np

import tensorflow as tf
from tensorflow.keras.applications import MobileNet

IMAGE_HEIGHT, IMAGE_WIDTH = 128, 128
CATEGORY_NUMS = 340

with open('quickdraw/data/category_dict.pickle', mode='rb') as file:
    category_dict = pickle.load(file)

graph = tf.Graph()
with graph.as_default():
    session = tf.Session()
    with session.as_default():
        model = MobileNet(input_shape=(IMAGE_HEIGHT, IMAGE_WIDTH, 1), alpha=1., weights=None, classes=CATEGORY_NUMS)
        model.load_weights('quickdraw/data/mobilenet_test_model-v2.h5')

graph_var = graph
session_var = session


def predict(input_data):
    with graph_var.as_default():
        with session_var.as_default():
            preds = model.predict(input_data)
            top3_ids = np.argsort(-preds)[:, 0:3]
            return [category_dict[id].replace("_", " ") for id in top3_ids[0]]
