import dload, time, json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class ImgCrawler:
    def __init__(self, url):
        self.driver = webdriver.Chrome("./chromedriver")
        self.url = url
        self.db = {}
        self.load_page(url)
        self.load_db()

    # url, date 정보 저장할 json 파일 load
    def load_db(self):
        with open("./resource.json") as f:
            json_data = json.load(f)
            self.db = json_data

    # url get
    def load_page(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
        except:
            print("driver error: 맞지 않는 드라이버이거나, 잘못된 url입니다.")

    # 사전처리(검색어 입력, 클릭, 스크롤)
    def preprocess(self, selector="", value="", mode="click", search=""):
        if mode == "scroll":
            # print("scroll 호출")
            # 스크롤 높이 가져옴
            last_height = self.driver.execute_script(
                "return document.body.scrollHeight"
            )
            while True:
                # 끝까지 스크롤 다운
                self.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                # 1초 대기
                time.sleep(1)
                # 스크롤 다운 후 스크롤 높이 다시 가져옴
                new_height = self.driver.execute_script(
                    "return document.body.scrollHeight"
                )
                if new_height == last_height:
                    break
                last_height = new_height
            return

        try:
            element = self.driver.find_element_by_xpath(f"//*[@{selector}='{value}']")
        except:
            print("element의 selector, value를 확인해주세요.")
            return
        if mode == "click":
            element.click()
        elif mode == "keydown":
            element.send_keys(f"{search}" + Keys.RETURN)
        time.sleep(3)

    # url에서 img 고유 이름 추출(상품 일련코드, 무신사의 경우 날짜시간 정보가 저장되어있음)
    def get_img_name(self, img_url):
        return img_url.split("/")[-1]

    # 페이지 별로 이미지 반복 크롤링
    def get_img_per_page(
        self,
        selector,
        start,
        end,
        dir_name,
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
            img_num = self.get_img(
                selector, dir_name, img_name, img_num, url, attr, ext
            )
        return img_num

    # 한 페이지에서 이미지 크롤링
    def get_img(
        self, selector, dir_name, img_name, img_num=1, url=None, attr="src", ext="jpg"
    ):
        if url:
            self.url = url
            self.load_page(self.url)
        soup = BeautifulSoup(self.driver.page_source, "html.parser")
        images = soup.select(selector)
        if not img_name in self.db:
            self.db[img_name] = {}
        # print(*images, sep="\n")
        for image in images:
            try:
                src = image[attr]
            except:
                try:
                    src = image["data-src"]
                except:
                    continue
            if src.startswith("//"):
                src = "https:" + src
            if not src in self.db[img_name]:
                try:
                    self.db[img_name][src] = {
                        "filename": f"{img_name}{img_num}.{ext}",
                        "meta": self.get_img_name(src),
                    }
                    dload.save(src, f"./{dir_name}/{img_num}.{ext}")
                    img_num += 1
                except:
                    continue
        return img_num

    # 드라이버 종료 및 json에 기록 저장
    def quit(self):
        with open("./resource.json", "w", encoding="utf-8") as f:
            json.dump(self.db, f, indent="\t")
        self.driver.quit()
