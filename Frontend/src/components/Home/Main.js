import react from "react";
import HomeSearchButton from "./HomeSearchButton";
import { useHistory } from "react-router-dom";
import { Translate } from "@material-ui/icons";

function Main({ setGender, setApparels, setSelectedCategory }) {
  const history = useHistory();

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#2B496F",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            fontSize: "22vw",
            color: "white",
            top: "15%",
            textAlign: "center",
            left: "50%",
            transform: "translate(-50%)",
            position: "absolute",
            textShadow: "revert"
          }}
        >
          CODIBA
        </div>
        <img
          src="/images/codibalogo.png"
          style={{
            width: "30vw",
            height: "10vh",
            right: "-2%",
            top: "1%",
            position: "absolute"
          }}
          onClick={() => {
            history.push("/codibaInfo");
          }}
        />
        <img
          src="/images/homeimage2.jpg"
          style={{
            position: "absolute",
            width: "100vw",
            height: "30vh",
            bottom: "3%"
          }}
        />
        <div
          style={{
            backgroundColor: "white",
            color: "#2B496F",
            fontSize: "6vw",
            position: "absolute",
            width: "85vw",
            height: "75vw",
            left: "7.5%",
            top: "35%",
            textAlign: "center"
          }}
        >
          <br />
          /
          <br />
          " CODI MATCH " 버튼을 눌러
          <br />
          입을 옷의 카테고리를 선택해주세요.
          <br />
          당신의 옷의 새로운 코디를
          <br />
          코디바가 찾아드립니다!🧐
          <br />
          <HomeSearchButton
            setGender={setGender}
            setApparels={setApparels}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </>
  );
}

export default Main;
