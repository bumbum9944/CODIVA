import cv2


def img_resizer(dir, saved_dir, img_name, start, end, size, ext="png", saved_ext="png"):
    for i in range(start, end + 1):
        try:
            img = cv2.imread(f"./{dir}/{img_name}{i}.{ext}", cv2.IMREAD_COLOR)
            resized_img = cv2.resize(img, size)
            cv2.imwrite(f"./{saved_dir}/{img_name}{i}.{saved_ext}", resized_img)
        except:
            print("파일명 또는 파일 확장자 지정 오류")
