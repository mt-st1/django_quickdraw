import ast

from PIL import Image, ImageDraw

import numpy as np

IMAGE_HEIGHT, IMAGE_WIDTH = 128, 128
LINE_WIDTH = 8


def draw_it(strokes):
    image = Image.new("P", (256, 256), color=255)
    image_draw = ImageDraw.Draw(image)
    for stroke in ast.literal_eval(strokes):
        for i in range(len(stroke[0]) - 1):
            image_draw.line([stroke[0][i], stroke[1][i], stroke[0][i + 1], stroke[1][i + 1]], fill=0, width=LINE_WIDTH)
    image = image.resize((IMAGE_HEIGHT, IMAGE_WIDTH))
    return np.array(image) / 255


def preprocess(drawing_data):
    image_data = draw_it(drawing_data)
    return image_data.reshape(1, IMAGE_HEIGHT, IMAGE_WIDTH, 1)
