from crawling import ImgCrawler
from resize import img_resizer

# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time, dload, asyncio, json, os, requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
}


async def crawling(url, selector, id):
    links = []
    dname = "bottom/slacks"  # 세부 디렉토리 명칭
    fname = "slacks"  # 파일명칭
    # driver.get(url)
    try:
        res = requests.get(url, headers=headers)
        # print(type(res.headers.get("X-Amz-Cf-Id")))
    except:
        print("requests error")
    soup = BeautifulSoup(res.text, "html.parser")
    links += soup.select("a.img-block")
    images = await get_images(links)
    for image in images:
        dload.save(image, f"./train_images/{dname}/{fname}{id}.jpg")
        id += 1
    return id


async def get_images(links):
    images, cache = [], {}
    for link in links:
        try:
            res = requests.get(link["href"], headers=headers)
            print(res.headers.get("X-Amz-Cf-Id"))
        except:
            print("request error")
            continue
        soup = BeautifulSoup(res.text, "html.parser")
        url = soup.select("#bigimg")[0]["src"]
        if soup.select("#bigimg")[0]["src"].startswith("//"):
            url = "https:" + url
        images += [url]
    cache[res.headers.get("X-Amz-Cf-Id")] = images  # 현재 시간을 key로 cache 저장(크롤링 중단 대비)
    print(cache)
    with open(os.path.join(BASE_DIR, "cache.json"), "w", encoding="utf-8") as f:
        json.dump(cache, f, indent="\t")
    return images


if __name__ == "__main__":
    # 크롬 이미지 검색 크롤링(학습데이터)
    # crawler = ImgCrawler("https://www.google.com")
    # crawler.preprocess("aria-label", "검색", mode="keydown", search="Coat")  # search:검색어
    # crawler.preprocess("data-hveid", "CAEQAw")
    # crawler.preprocess(mode="scroll")
    # crawler.get_img("img.rg_i.Q4LuWd", "train_images", "train")
    # crawler.quit()

    # 무신사 상품(학습) 데이터 크롤링
    # driver = webdriver.Chrome("./chromedriver")
    # driver2 = webdriver.Chrome("./chromedriver")

    # 각 상품 상세페이지로 들어갈 하이퍼링크 수집
    i = 1
    for page_num in range(1, 15):
        url = f"https://search.musinsa.com/category/003008?page={page_num}"
        i = asyncio.run(crawling(url, "a.img-block", i))

    # 각 상품에 대한 대표 이미지 수집
    # images = []
    # for link in links:
    #     driver.get(link["href"])
    #     time.sleep(1)
    #     soup = BeautifulSoup(driver.page_source, "html.parser")
    #     images += soup.select("#bigimg")

    # dname = "top/tee"  # 세부 디렉토리 명칭
    # fname = "short_sleeved_tee"  # 파일명칭
    # i = 1  # 파일 넘버링
    # for image in images:
    #     dload.save("https:" + image["src"], f"./train_images/{dname}/{fname}{i}.jpg")

    # 무신사 코디 크롤링
    # crawler = ImgCrawler(
    #     "https://store.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=date"
    # )
    # crawler.preprocess("data-channel", "mensinsa")
    # crawler.get_img_per_page(
    #     "div.style-list-item__thumbnail > a > div > img", 1, 5, "images", "m", 151
    # )
    # crawler.preprocess("data-channel", "wusinsa")
    # crawler.get_img_per_page(
    #     "div.style-list-item__thumbnail > a > div > img", 1, 6, "images", "w", 51
    # )
    # crawler.quit()

    # import dload
    # import json

    # with open("./resource.json") as f:
    #     json_data = json.load(f)
    #     for src, filename in json_data["w"].items():
    #         dload.save(src, f"./images/{filename}")

    # img_resizer("images", "resized_images", "m", 331, 450, (300, 300), ext="jpg")
    # img_resizer("images", "resized_images", "w", 51, 410, (300, 300), ext="jpg")

    # 코디북 크롤링
    # crawler = ImgCrawler("https://codibook.net/codi")
    # crawler.get_img_per_page("div.thumb_wrapper > a > img", "images", 1, 10, "w", 411)
    # crawler.quit()
    # img_resizer("images", "resized_images", "w", 411, 650, (300, 300), ext="jpg")
