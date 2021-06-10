# import modules
from detect import predictor
from color import ColorThief
from preprocess import resize_image
from classify import tf_model_loder

# import some common libraries
import pandas as pd
import numpy as np
from collections import defaultdict
import uuid
import math
import os, warnings
import matplotlib.pyplot as plt
import json

# to clean up output cells
from silence_tensorflow import silence_tensorflow
silence_tensorflow()

# import image utilities
import urllib.request
from PIL import Image

color_table = {
    'black' : (0, 0, 0),
    'beige' : (245, 245, 220),
    'white' : (255, 255, 255),
    'blue' : (0, 0, 255),
    'green' : (0, 255, 0),
    'gray' : (128, 128, 128),
    'brown' : (165, 42, 42),
    'pink' : (255, 192, 203),
    'navy' : (128, 0, 0),
    'yellow' : (255, 255, 0),
    'purple' : (128, 0, 128),
    'red' : (255, 0, 0),
    'orange' : (255, 165, 0)
}

color_label = [
    'black', 'beige', 'white', 'blue', 'green', 'gray', 
    'brown', 'pink', 'navy', 'yellow', 'purple', 'red', 'orange'
]

labels = {
    0: 'cardigan',
    1: 'coat',
    2: 'hood',
    3: 'jacket',
    4: 'jeans',
    5: 'leggings',
    6: 'long_sleeved_tee',
    7: 'mtm',
    8: 'onepiece',
    9: 'shirts',
    10: 'short_sleeved_tee',
    11: 'skirts',
    12: 'slacks',
    13: 'sleeveless',
    14: 'training',
    15: 'vest'
}

def find_color(requested_color):
    distance_list = []

    for rgb in color_table.values() :
        rd = (rgb[0] - requested_color[0]) ** 2
        gd = (rgb[1] - requested_color[1]) ** 2
        bd = (rgb[2] - requested_color[2]) ** 2
        distance_list.append(math.sqrt(rd + gd + bd))
    return color_label[distance_list.index(min(distance_list))]

def inference() :
    df = pd.DataFrame(columns=['id', 'url', 'apparels'])
    f = open("/home/azure/ai/s3_file.txt", 'r')
    names = f.readlines()
    idx = 0

    for name in names:
        url = f'https://codiba.s3.us-east-2.amazonaws.com/{name}'
        img = Image.open(urllib.request.urlopen(url)).convert('RGB')
        im = np.array(img)
        outputs = predictor(im)
        
        boxes = {}
        im_lst = []
        color_lst = []
        apparels_lst = []
        label_color = defaultdict(list)
        for coordinates in outputs["instances"].to("cpu").pred_boxes:
            coordinates_array = []
            for k in coordinates:
                coordinates_array.append(int(k))
            boxes[uuid.uuid4().hex[:].upper()] = coordinates_array
            
        for k,v in boxes.items():
            crop_img = im[v[1]:v[3], v[0]:v[2], :]
            color_thief = ColorThief(crop_img)
            dominant_color = color_thief.get_color(quality=1)
            color_lst.append(find_color(dominant_color))
            
            crop_img = resize_image(crop_img)
            crop_img = crop_img / 255
            crop_img = crop_img.reshape((-1,) + crop_img.shape)
            im_lst.append(crop_img)
            
        name = name.split('/')[1].split('.')[0]
        print(f'{name} labels')

        for index, num_img in enumerate(im_lst):
            classification_model = tf_model_loder()
            predictions = classification_model.predict(num_img)
            label_color[labels[np.argmax(predictions)]] = color_lst[index]

        for key, item in label_color.items():
            apparels_lst.append({'category': key, 'color': item})

        df.loc[idx]=[idx, url, apparels_lst]
        idx += 1
    
    return df

df = inference()
result = df.to_json(orient="records")
parsed = json.loads(result)

with open('third_codi_data', 'w', encoding='utf-8') as make_file :
    json.dump(parsed, make_file, ensure_ascii=False, indent=4)