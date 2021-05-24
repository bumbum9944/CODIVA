# Image Crawler & Resizer

## Image Crawler

1. 사전 필요 모듈을 다운로드 해줍니다.

```bash
  pip install opencv-python
  pip install dload
  pip install selenium
  pip install bs4
```

2. 크롬 버전에 맞는 드라이버 다운로드해서 해당 파일과 같은 경로에 넣어줍니다.

- https://chromedriver.storage.googleapis.com/index.html
- https://sites.google.com/a/chromium.org/chromedriver/downloads
- https://chromedriver.chromium.org/downloads
  <br><br>
  아래와 같은 구조로 만들어주시면 됩니다.

```
.
├── chromedriver
├── crawling.py
├── main.py
└── readme.md

3 directories, 5 files
```

3. Image Crawler, resizer 사용 EXAMPLE

```py
# 패키지 내부의 main.py에서 코드를 수정해 사용하세요
from crawling import ImgCrawler
from resize import img_resizer

crawler = ImgCrawler(
        "https://store.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=date"
    ) # dirver 실행
crawler.preprocess("data-channel", "mensinsa") # ImgCrawler.preprocess(selector, value) : 사전처리
crawler.get_img_per_page(
    "div.style-list-item__thumbnail > a > div > img", 4, 5, "m", 331
) # ImgCrawler.get_img_per_page(selector, start, end, image_name, image_number)
crawler.preprocess("data-channel", "wusinsa")
crawler.get_img_per_page(
    "div.style-list-item__thumbnail > a > div > img", 3, 5, "w", 346
)
crawler.quit() # ImgCrawler.quit() : driver 종료

img_resizer("images", "resized_images", "m", 331, 450, (300, 300), ext="jpg")
img_resizer("images", "resized_images", "w", 346, 525, (300, 300), ext="jpg")
```

## Contributor

- @bumbum94

## Reference

- [코드 참조] https://velog.io/@bangsy/python-crawling-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%81%AC%EB%A1%A4%EB%A7%81
- [코드 참조] https://hello-bryan.tistory.com/194
