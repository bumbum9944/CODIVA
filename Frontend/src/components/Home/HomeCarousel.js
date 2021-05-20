import { React } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCarousel() {
  const Container = styled.div`
    overflow: hidden;
    height: 70vh; 
  `;

  const WhiteSpace = styled.div`
    height: 5vh;
  `;
  const StyledSlider = styled(Slider)`
    .slick-slide div {
      outline: none;
    }
  `;

  const ImageContainer = styled.div`
    margin: 0 16px;
  `;

  const Image = styled.img`
    width: 60vw;
    height: 60vh;
  `;

  const sliderInner = [];

  for (let i = 0; i < 5; i++) {
    const item = (
      <div key={i}>
        <ImageContainer style={{margin: "0",}}>
          <Image style={{margin: "0",}} src={`/carouselImage/item${i+1}.jpg`} alt="item-img" />
        </ImageContainer>
      </div>
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
    arrows: false,
    centerMode: true
  };

  return (
    <Container>
      <WhiteSpace />
      <StyledSlider {...settings}>{sliderInner}</StyledSlider>
    </Container>
  );
}

export default HomeCarousel;
