import { React, useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "App.css";
import Menu from "components/common/Menu/Menu";
import SlideMenu from "components/common/Menu/SlideMenu";
import Home from "pages/Home";
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
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folderList, setFolderList] = useState([
    {
      id: 1,
      folderName: "기본 폴더",
      itemCnt: 4,
      imageUrl: "/carouselImage/item11.jpg"
    },
    {
      id: 2,
      folderName: "청바지",
      itemCnt: 1,
      imageUrl: "/carouselImage/item4.jpg"
    },
    {
      id: 1,
      folderName: "가디건",
      itemCnt: 6,
      imageUrl: "/carouselImage/item7.jpg"
    }
  ]);
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

  function addFolder(newFolderName) {
    const copiedFolderList = JSON.parse(JSON.stringify(folderList));
    copiedFolderList.push({
      id: copiedFolderList.length,
      folderName: newFolderName,
      itemCnt: 0,
      imageUrl: ""
    });
    setFolderList(copiedFolderList);
  }

  function deleteFolder(targetIndex) {
    const copiedFolderList = JSON.parse(JSON.stringify(folderList));
    copiedFolderList.splice(targetIndex, 1);
    setFolderList(copiedFolderList);
  }

  function changeFolderName(targetIndex, newFolderName) {
    const copiedFolderList = JSON.parse(JSON.stringify(folderList));
    copiedFolderList[targetIndex].folderName = newFolderName;
    setFolderList(copiedFolderList);
  }
  const { state, actions } = useContext(UserContext);
  const { user } = state;
  const { setUser, setToken } = actions;

  const loadUser = () => {
    setUser(localStorage.getItem("user_id"));
    setToken(localStorage.getItem("token"));
    if (!user) return;
    // 검증 작업 필요
  };

  useEffect(() => {
    loadUser();
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <SlideMenu />
        <LoginForm />
        <RegisterForm />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/codies"
            render={() => (
              <Codies
                gender={gender}
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
