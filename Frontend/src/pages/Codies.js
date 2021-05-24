import { React } from "react";
import Container from "@material-ui/core/Container";
import Header from "../components/common/Header/Header";
import CodyList from "../components/Codies/CodyList"

function Codies() {

  const codies = [
    {
      id: 1,
      imageUrl: "/carouselImage/item1.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 4,
      imageUrl: "/carouselImage/item4.jpg"
    },
    {
      id: 5,
      imageUrl: "/carouselImage/item5.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item2.jpg"
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg"
    },
  ];

  return (
    <Container>
      <Header headerText="CODIES" />
      <CodyList codies={codies} />
    </Container>
  );
}

export default Codies;
