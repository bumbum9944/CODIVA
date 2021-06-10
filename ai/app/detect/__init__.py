import detectron2

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg

#def predictor() :
cfg = get_cfg()

cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml"))
cfg.DATASETS.TRAIN = ("deepfashion_train",)

cfg.MODEL.ROI_HEADS.NUM_CLASSES = 13
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.65 # set threshold for this model

cfg.MODEL.WEIGHTS = "/home/azure/ai/deepfashion2/models/second_model/model_final.pth"
cfg.MODEL.DEVICE='cpu'
predictor = DefaultPredictor(cfg)