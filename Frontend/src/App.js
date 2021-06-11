import { React, useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "App.css";
import { request, requestWithJWT } from "lib/client";
import Menu from "components/common/Menu/Menu";
import SlideMenu from "components/common/Menu/SlideMenu";
import Home from "pages/Home";
import CodibaInfo from "pages/CodibaInfo";
import Codies from "pages/Codies";
import SearchPage1 from "pages/SearchPage1";
import SearchPage2 from "pages/SearchPage2";
import TopCodies from "pages/TopCodies";
import MyPicks from "pages/MyPicks";
import FolderDetail from "pages/FolderDetail";
import UserContext from "contexts/user";
import LoginForm from "components/Auth/LoginForm";
import RegisterForm from "components/Auth/RegisterForm";
import SaveToastMsg from "./components/common/Folder/SaveToastMsg";
import DeleteToastMsg from "./components/common/Folder/DeleteToastMsg";
import ChangeToastMsg from "./components/common/Folder/ChangeToastMsg";

function App() {
  const [selectedFolder, setSelectedFolder] = useState({});
  const [folderList, setFolderList] = useState([]);
  const [gender, setGender] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    category: "",
    color: "all"
  });
  const [apparels, setApparels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    OUTER: false,
    TOP: false,
    BOTTOM: false,
    "ONE PIECE": false
  });
  const { state, actions } = useContext(UserContext);
  const { user, token } = state;
  const { setUser, setToken } = actions;

  function addFolder(newFolderName) {
    requestWithJWT("post", `/directory/${user}`, { name: newFolderName }).then(
      response => {
        const copiedFolderList = JSON.parse(JSON.stringify(folderList));
        copiedFolderList.push({
          id: response.data.id,
          folderName: newFolderName,
          itemCnt: 0,
          imageUrl: ""
        });
        setFolderList(copiedFolderList);
      }
    );
  }

  function deleteFolder(targetFolder) {
    const { targetIndex, folderId } = { ...targetFolder };
    requestWithJWT("delete", `/directory/${user}/${folderId}`).then(
      response => response.data
    );
    const copiedFolderList = JSON.parse(JSON.stringify(folderList));
    copiedFolderList.splice(targetIndex, 1);
    setFolderList(copiedFolderList);
  }

  function changeFolderName(targetFolder, newFolderName) {
    const { targetIndex, folderId } = { ...targetFolder };
    requestWithJWT("put", `/directory/${user}/${folderId}`, {
      new_name: newFolderName
    }).then(response => response.data);
    const copiedFolderList = JSON.parse(JSON.stringify(folderList));
    copiedFolderList[targetIndex].folderName = newFolderName;
    setFolderList(copiedFolderList);
  }

  const loadUser = () => {
    setUser(localStorage.getItem("user_id"));
    setToken(localStorage.getItem("token"));
    if (!user) return;
    // 검증 작업 필요
  };

  useEffect(() => {
    loadUser();
  }, [user]);

  useEffect(() => {
    if (user) {
      requestWithJWT("get", `/directory/${user}`).then(response => {
        const res = response.data.data;
        const folderData = res.map(item => {
          return {
            id: item.id,
            folderName: item.name === "default" ? "기본 폴더" : item.name,
            itemCnt: item.cnt,
            imageUrl: item.url
          };
        });
        setFolderList(folderData);
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div id="wrapper">
        <h1 id="content">1024 X 830 이하의 디스플레이에서 사용해주세요 😎 </h1>
      </div>
      <div className="App">
        <Menu />
        <SlideMenu />
        <LoginForm />
        <RegisterForm />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home
                setGender={setGender}
                setApparels={setApparels}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          />
          <Route path="/codibaInfo" render={() => <CodibaInfo />} />
          <Route
            path="/codies"
            render={() => (
              <Codies
                gender={gender}
                apparels={apparels}
                selectedOption={selectedOption}
                addFolder={addFolder}
                folderList={folderList}
              />
            )}
          />
          <Route
            path="/search/1"
            render={() => (
              <SearchPage1
                gender={gender}
                selectedOption={selectedOption}
                changeGender={newGender => {
                  setGender(newGender);
                }}
              />
            )}
          />
          <Route
            path="/search/2"
            render={() => (
              <SearchPage2
                gender={gender}
                detail={detail}
                setDetail={setDetail}
                apparels={apparels}
                setApparels={setApparels}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          />
          <Route
            path="/top-codies"
            render={() => (
              <TopCodies folderList={folderList} addFolder={addFolder} />
            )}
          />
          <Route
            path="/my-picks"
            exact
            render={() => (
              <MyPicks
                folderList={folderList}
                setFolderList={setFolderList}
                addFolder={addFolder}
                deleteFolder={deleteFolder}
                changeFolderName={changeFolderName}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
            )}
          />
          <Route
            path="/my-picks/detail"
            render={() => (
              <FolderDetail
                folderList={folderList}
                addFolder={addFolder}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
            )}
          />
        </Switch>
        <SaveToastMsg />
        <DeleteToastMsg />
        <ChangeToastMsg />
      </div>
    </BrowserRouter>
  );
}

export default App;
