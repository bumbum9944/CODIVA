import dload
from bs4 import BeautifulSoup
from selenium import webdriver
import time
import json


class ImgCrawler:
    def __init__(self, url):
        self.driver = webdriver.Chrome("./chromedriver")
        self.url = url
        self.db = {}
        self.load_page(url)
        self.load_db()

    def load_db(self):
        with open("./resource.json") as f:
            json_data = json.load(f)
            self.db = json_data

    def load_page(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
        except:
            print("driver error: 맞지 않는 드라이버이거나, 잘못된 url입니다.")

    def preprocess(self, selector, value, mode="click"):
        try:
            element = self.driver.find_element_by_xpath(f"//*[@{selector}='{value}']")
            element.click()
            time.sleep(5)
        except:
            print("element의 selector, value를 확인해주세요.")

    def get_img_per_page(
        self,
        selector,
        start,
        end,
        img_name,
        img_num=1,
        query="page",
        attr="src",
        ext="jpg",
    ):
        for i in range(start, end + 1):
            url = (
                self.url + f"&{query}={i}"
                if "?" in self.url
                else self.url + f"?{query}={i}"
            )
            self.load_page(url)
            soup = BeautifulSoup(self.driver.page_source, "html.parser")
            images = soup.select(selector)
            for image in images:
                src = image[attr]
                if src.startswith("//"):
                    src = "https:" + src
                if not src in self.db[img_name]:
                    self.db[img_name][src] = f"{img_name}{img_num}.{ext}"
                    dload.save(src, f"./images/{img_name}{img_num}.{ext}")
                    img_num += 1

    def get_img(self, selector, img_name, img_num=1, url=None, attr="src", ext="jpg"):
        if url:
            self.load_page(url)
        soup = BeautifulSoup(self.driver.page_source, "html.parser")
        images = soup.select(selector)
        for image in images:
            src = image[attr]
            if src.startswith("//"):
                src = "https:" + src
            if not src in self.db[img_name]:
                self.db[img_name][src] = f"{img_name}{img_num}.{ext}"
                dload.save(src, f"./images/{img_name}{img_num}.{ext}")
                img_num += 1

    def quit(self):
        with open("./resource.json", "w", encoding="utf-8") as f:
            json.dump(self.db, f, indent="\t")
        self.driver.quit()
