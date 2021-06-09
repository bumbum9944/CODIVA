import cv2
import numpy as np

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
        background = np.zeros((resized.shape[0],resized.shape[0], 3),dtype=np.uint8) 
     # 이미지를 가운데로 겹치도록 설정
        x_offset = y_offset = resized.shape[0] // 2 - (resized.shape[1] // 2)   
    # 해당 위치에 이미지를 겹침                    
        background[:, x_offset:x_offset + resized.shape[1]] = resized                              
    else:
    # 가로가 더 길 경우
        background = np.zeros((resized.shape[1], resized.shape[1], 3),dtype=np.uint8) 
        x_offset = y_offset = resized.shape[1] // 2 - (resized.shape[0] // 2)
        background[y_offset:y_offset + resized.shape[0],:] = resized
    return background
