from crawling import ImgCrawler
from resize import img_resizer

if __name__ == "__main__":

    # 무신사 코디 크롤링
    # crawler = ImgCrawler(
    #     "https://store.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=date"
    # )
    # crawler.preprocess("data-channel", "mensinsa")
    # crawler.get_img_per_page(
    #     "div.style-list-item__thumbnail > a > div > img", 1, 5, "m", 151
    # )
    # crawler.preprocess("data-channel", "wusinsa")
    # crawler.get_img_per_page(
    #     "div.style-list-item__thumbnail > a > div > img", 1, 6, "w", 51
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
    crawler = ImgCrawler("https://codibook.net/codi")
    crawler.get_img_per_page("div.thumb_wrapper > a > img", 1, 10, "w", 411)
    crawler.quit()
    img_resizer("images", "resized_images", "w", 411, 650, (300, 300), ext="jpg")
