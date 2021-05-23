# main.py에서 코드 분리하려고 만들어놓은 파일
from crawling import ImgCrawler
from resize import img_resizer
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time, dload

if __name__ == "__main__":
    pass
    # 코디북 크롤링
    # crawler = ImgCrawler("https://codibook.net/codi")
    # crawler.get_img_per_page("div.thumb_wrapper > a > img", "images", 1, 10, "w", 411)
    # crawler.quit()
    # img_resizer("images", "resized_images", "w", 411, 650, (300, 300), ext="jpg")

    # 코디북 학습데이터 크롤링

    # https://i0.codibook.net/files/thumb/big/197810245912/2082e5482e529165/1648921017.png
    # https://i0.codibook.net/files/thumb/small/197810245912/2082e5482e529165/1648921017.png
