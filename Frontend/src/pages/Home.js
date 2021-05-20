import { React } from "react";
import Container from "@material-ui/core/Container";
import Header from "../components/common/Header/Header";
import HomeCarousel from "../components/Home/HomeCarousel";
import HomeSearchButton from "../components/Home/HomeSearchButton";

function Home() {
  return (
    <Container className="Home">
      <Header headerText="CODIBA" />
      <HomeSearchButton />
      <HomeCarousel />
    </Container>
  );
}

export default Home;
