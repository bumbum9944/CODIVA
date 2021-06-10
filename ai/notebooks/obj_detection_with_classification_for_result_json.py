# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
# import some common libraries
import os, warnings
import cv2
import math
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import json
import uuid

from collections import defaultdict

# Setup detectron2 logger
import detectron2
from detectron2.utils.logger import setup_logger

setup_logger()

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg

# import tf
import tensorflow as tf
from tensorflow.keras import backend as K

# import image utilities
import urllib.request
from PIL import Image

warnings.filterwarnings("ignore")  # to clean up output cells

# %% [markdown]
# ## Detection 모델 로드

# %%
cfg = get_cfg()

cfg.merge_from_file(
    model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml")
)
cfg.DATASETS.TRAIN = ("deepfashion_train",)

cfg.MODEL.ROI_HEADS.NUM_CLASSES = 13
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.65  # set threshold for this model

cfg.MODEL.WEIGHTS = "/home/azure/ai/deepfashion2/models/second_model/model_final.pth"
cfg.MODEL.DEVICE = "cpu"
predictor = DefaultPredictor(cfg)

# %% [markdown]
# ## 분류 모델 로드

# %%
def recall_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + K.epsilon())
    return recall


def precision_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    return precision


def f1_m(y_true, y_pred):
    precision = precision_m(y_true, y_pred)
    recall = recall_m(y_true, y_pred)
    return 2 * ((precision * recall) / (precision + recall + K.epsilon()))


# %%
classification_model = tf.keras.models.load_model(
    "/home/azure/ai/classification/models/clothes_classfication_with_Xception_cropped_dataset_96_final",
    custom_objects={"f1_m": f1_m, "precision_m": precision_m, "recall_m": recall_m},
    compile=True,
    options=None,
)

# %% [markdown]
# ## 색 검출

# %%
# -*- coding: utf-8 -*-
"""
    colorthief
    ~~~~~~~~~~
    Grabbing the color palette from an image.
    :copyright: (c) 2015 by Shipeng Feng.
    :license: BSD, see LICENSE for more details.
"""
__version__ = "0.2.1"


class cached_property(object):
    """Decorator that creates converts a method with a single
    self argument into a property cached on the instance.
    """

    def __init__(self, func):
        self.func = func

    def __get__(self, instance, type):
        res = instance.__dict__[self.func.__name__] = self.func(instance)
        return res


class ColorThief(object):
    """Color thief main class."""

    def __init__(self, file):
        """Create one color thief for one image.
        :param file: A filename (string) or a file object. The file object
                     must implement `read()`, `seek()`, and `tell()` methods,
                     and be opened in binary mode.
        """
        if isinstance(file, str):
            self.image = Image.open(file)
        else:
            self.image = Image.fromarray(file)

    def get_color(self, quality=10):
        """Get the dominant color.
        :param quality: quality settings, 1 is the highest quality, the bigger
                        the number, the faster a color will be returned but
                        the greater the likelihood that it will not be the
                        visually most dominant color
        :return tuple: (r, g, b)
        """
        palette = self.get_palette(5, quality)
        return palette[0]

    def get_palette(self, color_count=10, quality=10):
        """Build a color palette.  We are using the median cut algorithm to
        cluster similar colors.
        :param color_count: the size of the palette, max number of colors
        :param quality: quality settings, 1 is the highest quality, the bigger
                        the number, the faster the palette generation, but the
                        greater the likelihood that colors will be missed.
        :return list: a list of tuple in the form (r, g, b)
        """
        image = self.image.convert("RGBA")
        width, height = image.size
        pixels = image.getdata()
        pixel_count = width * height
        valid_pixels = []
        for i in range(0, pixel_count, quality):
            r, g, b, a = pixels[i]
            # If pixel is mostly opaque and not white
            if a >= 125:
                if not (r > 250 and g > 250 and b > 250):
                    valid_pixels.append((r, g, b))

        # Send array to quantize function which clusters values
        # using median cut algorithm
        cmap = MMCQ.quantize(valid_pixels, color_count)
        return cmap.palette


class MMCQ(object):
    """Basic Python port of the MMCQ (modified median cut quantization)
    algorithm from the Leptonica library (http://www.leptonica.com/).
    """

    SIGBITS = 5
    RSHIFT = 8 - SIGBITS
    MAX_ITERATION = 1000
    FRACT_BY_POPULATIONS = 0.75

    @staticmethod
    def get_color_index(r, g, b):
        return (r << (2 * MMCQ.SIGBITS)) + (g << MMCQ.SIGBITS) + b

    @staticmethod
    def get_histo(pixels):
        """histo (1-d array, giving the number of pixels in each quantized
        region of color space)
        """
        histo = dict()
        for pixel in pixels:
            rval = pixel[0] >> MMCQ.RSHIFT
            gval = pixel[1] >> MMCQ.RSHIFT
            bval = pixel[2] >> MMCQ.RSHIFT
            index = MMCQ.get_color_index(rval, gval, bval)
            histo[index] = histo.setdefault(index, 0) + 1
        return histo

    @staticmethod
    def vbox_from_pixels(pixels, histo):
        rmin = 1000000
        rmax = 0
        gmin = 1000000
        gmax = 0
        bmin = 1000000
        bmax = 0
        for pixel in pixels:
            rval = pixel[0] >> MMCQ.RSHIFT
            gval = pixel[1] >> MMCQ.RSHIFT
            bval = pixel[2] >> MMCQ.RSHIFT
            rmin = min(rval, rmin)
            rmax = max(rval, rmax)
            gmin = min(gval, gmin)
            gmax = max(gval, gmax)
            bmin = min(bval, bmin)
            bmax = max(bval, bmax)
        return VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo)

    @staticmethod
    def median_cut_apply(histo, vbox):
        if not vbox.count:
            return (None, None)

        rw = vbox.r2 - vbox.r1 + 1
        gw = vbox.g2 - vbox.g1 + 1
        bw = vbox.b2 - vbox.b1 + 1
        maxw = max([rw, gw, bw])
        # only one pixel, no split
        if vbox.count == 1:
            return (vbox.copy, None)
        # Find the partial sum arrays along the selected axis.
        total = 0
        sum_ = 0
        partialsum = {}
        lookaheadsum = {}
        do_cut_color = None
        if maxw == rw:
            do_cut_color = "r"
            for i in range(vbox.r1, vbox.r2 + 1):
                sum_ = 0
                for j in range(vbox.g1, vbox.g2 + 1):
                    for k in range(vbox.b1, vbox.b2 + 1):
                        index = MMCQ.get_color_index(i, j, k)
                        sum_ += histo.get(index, 0)
                total += sum_
                partialsum[i] = total
        elif maxw == gw:
            do_cut_color = "g"
            for i in range(vbox.g1, vbox.g2 + 1):
                sum_ = 0
                for j in range(vbox.r1, vbox.r2 + 1):
                    for k in range(vbox.b1, vbox.b2 + 1):
                        index = MMCQ.get_color_index(j, i, k)
                        sum_ += histo.get(index, 0)
                total += sum_
                partialsum[i] = total
        else:  # maxw == bw
            do_cut_color = "b"
            for i in range(vbox.b1, vbox.b2 + 1):
                sum_ = 0
                for j in range(vbox.r1, vbox.r2 + 1):
                    for k in range(vbox.g1, vbox.g2 + 1):
                        index = MMCQ.get_color_index(j, k, i)
                        sum_ += histo.get(index, 0)
                total += sum_
                partialsum[i] = total
        for i, d in partialsum.items():
            lookaheadsum[i] = total - d

        # determine the cut planes
        dim1 = do_cut_color + "1"
        dim2 = do_cut_color + "2"
        dim1_val = getattr(vbox, dim1)
        dim2_val = getattr(vbox, dim2)
        for i in range(dim1_val, dim2_val + 1):
            if partialsum[i] > (total / 2):
                vbox1 = vbox.copy
                vbox2 = vbox.copy
                left = i - dim1_val
                right = dim2_val - i
                if left <= right:
                    d2 = min([dim2_val - 1, int(i + right / 2)])
                else:
                    d2 = max([dim1_val, int(i - 1 - left / 2)])
                # avoid 0-count boxes
                while not partialsum.get(d2, False):
                    d2 += 1
                count2 = lookaheadsum.get(d2)
                while not count2 and partialsum.get(d2 - 1, False):
                    d2 -= 1
                    count2 = lookaheadsum.get(d2)
                # set dimensions
                setattr(vbox1, dim2, d2)
                setattr(vbox2, dim1, getattr(vbox1, dim2) + 1)
                return (vbox1, vbox2)
        return (None, None)

    @staticmethod
    def quantize(pixels, max_color):
        """Quantize.
        :param pixels: a list of pixel in the form (r, g, b)
        :param max_color: max number of colors
        """
        if not pixels:
            raise Exception("Empty pixels when quantize.")
        if max_color < 2 or max_color > 256:
            raise Exception("Wrong number of max colors when quantize.")

        histo = MMCQ.get_histo(pixels)

        # check that we aren't below maxcolors already
        if len(histo) <= max_color:
            # generate the new colors from the histo and return
            pass

        # get the beginning vbox from the colors
        vbox = MMCQ.vbox_from_pixels(pixels, histo)
        pq = PQueue(lambda x: x.count)
        pq.push(vbox)

        # inner function to do the iteration
        def iter_(lh, target):
            n_color = 1
            n_iter = 0
            while n_iter < MMCQ.MAX_ITERATION:
                vbox = lh.pop()
                if not vbox.count:  # just put it back
                    lh.push(vbox)
                    n_iter += 1
                    continue
                # do the cut
                vbox1, vbox2 = MMCQ.median_cut_apply(histo, vbox)
                if not vbox1:
                    raise Exception("vbox1 not defined; shouldn't happen!")
                lh.push(vbox1)
                if vbox2:  # vbox2 can be null
                    lh.push(vbox2)
                    n_color += 1
                if n_color >= target:
                    return
                if n_iter > MMCQ.MAX_ITERATION:
                    return
                n_iter += 1

        # first set of colors, sorted by population
        iter_(pq, MMCQ.FRACT_BY_POPULATIONS * max_color)

        # Re-sort by the product of pixel occupancy times the size in
        # color space.
        pq2 = PQueue(lambda x: x.count * x.volume)
        while pq.size():
            pq2.push(pq.pop())

        # next set - generate the median cuts using the (npix * vol) sorting.
        iter_(pq2, max_color - pq2.size())

        # calculate the actual colors
        cmap = CMap()
        while pq2.size():
            cmap.push(pq2.pop())
        return cmap


class VBox(object):
    """3d color space box"""

    def __init__(self, r1, r2, g1, g2, b1, b2, histo):
        self.r1 = r1
        self.r2 = r2
        self.g1 = g1
        self.g2 = g2
        self.b1 = b1
        self.b2 = b2
        self.histo = histo

    @cached_property
    def volume(self):
        sub_r = self.r2 - self.r1
        sub_g = self.g2 - self.g1
        sub_b = self.b2 - self.b1
        return (sub_r + 1) * (sub_g + 1) * (sub_b + 1)

    @property
    def copy(self):
        return VBox(self.r1, self.r2, self.g1, self.g2, self.b1, self.b2, self.histo)

    @cached_property
    def avg(self):
        ntot = 0
        mult = 1 << (8 - MMCQ.SIGBITS)
        r_sum = 0
        g_sum = 0
        b_sum = 0
        for i in range(self.r1, self.r2 + 1):
            for j in range(self.g1, self.g2 + 1):
                for k in range(self.b1, self.b2 + 1):
                    histoindex = MMCQ.get_color_index(i, j, k)
                    hval = self.histo.get(histoindex, 0)
                    ntot += hval
                    r_sum += hval * (i + 0.5) * mult
                    g_sum += hval * (j + 0.5) * mult
                    b_sum += hval * (k + 0.5) * mult

        if ntot:
            r_avg = int(r_sum / ntot)
            g_avg = int(g_sum / ntot)
            b_avg = int(b_sum / ntot)
        else:
            r_avg = int(mult * (self.r1 + self.r2 + 1) / 2)
            g_avg = int(mult * (self.g1 + self.g2 + 1) / 2)
            b_avg = int(mult * (self.b1 + self.b2 + 1) / 2)

        return r_avg, g_avg, b_avg

    def contains(self, pixel):
        rval = pixel[0] >> MMCQ.RSHIFT
        gval = pixel[1] >> MMCQ.RSHIFT
        bval = pixel[2] >> MMCQ.RSHIFT
        return all(
            [
                rval >= self.r1,
                rval <= self.r2,
                gval >= self.g1,
                gval <= self.g2,
                bval >= self.b1,
                bval <= self.b2,
            ]
        )

    @cached_property
    def count(self):
        npix = 0
        for i in range(self.r1, self.r2 + 1):
            for j in range(self.g1, self.g2 + 1):
                for k in range(self.b1, self.b2 + 1):
                    index = MMCQ.get_color_index(i, j, k)
                    npix += self.histo.get(index, 0)
        return npix


class CMap(object):
    """Color map"""

    def __init__(self):
        self.vboxes = PQueue(lambda x: x["vbox"].count * x["vbox"].volume)

    @property
    def palette(self):
        return self.vboxes.map(lambda x: x["color"])

    def push(self, vbox):
        self.vboxes.push(
            {"vbox": vbox, "color": vbox.avg,}
        )

    def size(self):
        return self.vboxes.size()

    def nearest(self, color):
        d1 = None
        p_color = None
        for i in range(self.vboxes.size()):
            vbox = self.vboxes.peek(i)
            d2 = math.sqrt(
                math.pow(color[0] - vbox["color"][0], 2)
                + math.pow(color[1] - vbox["color"][1], 2)
                + math.pow(color[2] - vbox["color"][2], 2)
            )
            if d1 is None or d2 < d1:
                d1 = d2
                p_color = vbox["color"]
        return p_color

    def map(self, color):
        for i in range(self.vboxes.size()):
            vbox = self.vboxes.peek(i)
            if vbox["vbox"].contains(color):
                return vbox["color"]
        return self.nearest(color)


class PQueue(object):
    """Simple priority queue."""

    def __init__(self, sort_key):
        self.sort_key = sort_key
        self.contents = []
        self._sorted = False

    def sort(self):
        self.contents.sort(key=self.sort_key)
        self._sorted = True

    def push(self, o):
        self.contents.append(o)
        self._sorted = False

    def peek(self, index=None):
        if not self._sorted:
            self.sort()
        if index is None:
            index = len(self.contents) - 1
        return self.contents[index]

    def pop(self):
        if not self._sorted:
            self.sort()
        return self.contents.pop()

    def size(self):
        return len(self.contents)

    def map(self, f):
        return list(map(f, self.contents))


# %%
color_table = {
    "black": (0, 0, 0),
    "beige": (245, 245, 220),
    "white": (255, 255, 255),
    "blue": (0, 0, 255),
    "green": (0, 255, 0),
    "gray": (128, 128, 128),
    "brown": (165, 42, 42),
    "pink": (255, 192, 203),
    "navy": (128, 0, 0),
    "yellow": (255, 255, 0),
    "purple": (128, 0, 128),
    "red": (255, 0, 0),
    "orange": (255, 165, 0),
}

color_label = [
    "black",
    "beige",
    "white",
    "blue",
    "green",
    "gray",
    "brown",
    "pink",
    "navy",
    "yellow",
    "purple",
    "red",
    "orange",
]


# %%
def find_color(requested_color):
    distance_list = []

    for rgb in color_table.values():
        rd = (rgb[0] - requested_color[0]) ** 2
        gd = (rgb[1] - requested_color[1]) ** 2
        bd = (rgb[2] - requested_color[2]) ** 2
        distance_list.append(math.sqrt(rd + gd + bd))
    return color_label[distance_list.index(min(distance_list))]


# %% [markdown]
# ## 예측

# %%
def resize_image(image):
    (h, w) = image.shape[:2]

    if w > h:
        ratio = 299.0 / w
        x = 299
        y = int(h * ratio)
        dim = (x, y)
    else:
        ratio = 299.0 / h
        y = 299
        x = int(w * ratio)
        dim = (x, y)

    # perform the actual resizing of the image
    resized = cv2.resize(image, dim, interpolation=cv2.INTER_LINEAR)

    if resized.shape[0] > resized.shape[1]:
        # numpy로 검은색 배경을 생성
        background = np.zeros((resized.shape[0], resized.shape[0], 3), dtype=np.uint8)
        # 이미지를 가운데로 겹치도록 설정
        x_offset = y_offset = resized.shape[0] // 2 - (resized.shape[1] // 2)
        # 해당 위치에 이미지를 겹침
        background[:, x_offset : x_offset + resized.shape[1]] = resized
    else:
        # 가로가 더 길 경우
        background = np.zeros((resized.shape[1], resized.shape[1], 3), dtype=np.uint8)
        x_offset = y_offset = resized.shape[1] // 2 - (resized.shape[0] // 2)
        background[y_offset : y_offset + resized.shape[0], :] = resized
    return background


# %%
labels = {
    0: "cardigan",
    1: "coat",
    2: "hood",
    3: "jacket",
    4: "jeans",
    5: "leggings",
    6: "long_sleeved_tee",
    7: "mtm",
    8: "onepiece",
    9: "shirts",
    10: "short_sleeved_tee",
    11: "skirts",
    12: "slacks",
    13: "sleeveless",
    14: "training",
    15: "vest",
}


# %%
df = pd.DataFrame(columns=["id", "url", "apparels"])

f = open("/home/azure/ai/s3_file.txt", "r")
names = f.readlines()

idx = 0

for name in names:
    url = f"https://codiba.s3.us-east-2.amazonaws.com/{name}"
    img_name, img_format = name.split("/")[1].split(".")
    img_format = img_format.replace("\n", "")
    if img_format == "png":
        img = Image.open(urllib.request.urlopen(url)).convert("RGB")
    else:
        img = Image.open(urllib.request.urlopen(url))
    im = np.array(img)
    outputs = predictor(im)

    print(f"{img_name} labels")

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

    for k, v in boxes.items():
        crop_img = im[v[1] : v[3], v[0] : v[2], :]
        color_thief = ColorThief(crop_img)
        dominant_color = color_thief.get_color(quality=1)
        color_lst.append(find_color(dominant_color))

        crop_img = resize_image(crop_img)
        crop_img = crop_img / 255
        crop_img = crop_img.reshape((-1,) + crop_img.shape)
        im_lst.append(crop_img)

    for index, num_img in enumerate(im_lst):
        predictions = classification_model.predict(num_img)
        label_color[labels[np.argmax(predictions)]] = color_lst[index]

    for key, item in label_color.items():
        apparels_lst.append({"category": key, "color": item})

    df.loc[idx] = [idx, url, apparels_lst]
    idx += 1

df.head()


# %%
result = df.to_json(orient="records")
parsed = json.loads(result)

with open("second_codi_data.json", "w") as make_file:
    json.dump(parsed, make_file, ensure_ascii=False, indent=4)

# %%
