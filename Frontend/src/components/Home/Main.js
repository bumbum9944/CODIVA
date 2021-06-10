import react from "react";
import { useHistory } from "react-router-dom";

function Main() {
  const history = useHistory();

  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "#2B496F",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            fontSize: "22vw",
            color: "white",
            top: "15vh",
            left: "23vw",
            position: "absolute",
            textShadow: "revert"
          }}
        >
          CODIBA
        </div>
        <img
          src="/images/codibalogo.jpg"
          style={{
            width: "30vw",
            height: "10vh",
            right: "-1vh",
            top: "1vh",
            position: "absolute"
          }}
          onClick={() => {
            history.push("/codibaInfo");
          }}
        />
        <img
          src="/images/homeimage2.jpg"
          style={{
            position: "relative",
            width: "100vw",
            height: "30vh",
            top: "67.5vh"
          }}
        />
        <div
          style={{
            backgroundColor: "white",
            color: "#2B496F",
            fontSize: "6vw",
            position: "relative",
            width: "85vw",
            height: "35vh",
            marginLeft: "7.5%",
            top: "7%",
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
        </div>
      </div>
    </>
  );
}

export default Main;
