import { React } from "react";
import Slider from "react-slick";
import "./HomeCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCarousel() {
  const sliderInner = [];

  for (let i = 0; i < 5; i++) {
    const item = (
      <img
        className="home-carousel-image"
        key={i}
        src={`/carouselImage/item${i + 1}.jpg`}
        alt="item-img"
      />
    );
    sliderInner.push(item);
  }

  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Slider 
      className="home-carousel" 
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden"
      }}
      {...settings}
    
    >
      {sliderInner}
    </Slider>
  );
}

export default HomeCarousel;
