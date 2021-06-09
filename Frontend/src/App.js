import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/common/Menu/Menu";
import SlideMenu from "./components/common/Menu/SlideMenu";
import Home from "./pages/Home";
import Codies from "./pages/Codies";
import SearchPage1 from "./pages/SearchPage1";
import SearchPage2 from "./pages/SearchPage2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopCodies from "./pages/TopCodies";
import MyPicks from "./pages/MyPicks";
import FolderDetail from "./pages/FolderDetail";
import SaveToastMsg from "./components/common/Folder/SaveToastMsg";
import DeleteToastMsg from "./components/common/Folder/DeleteToastMsg";

function App() {
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
  const [selectedOption, setSelectedOption] = useState({
    top: {
      detail: "반팔티",
      color: "#FFFFFF",
      selected: false
    },
    bottom: {
      detail: "청바지",
      color: "#0000FF",
      selected: false
    }
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

  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <SlideMenu />
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
                  console.log(newGender);
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
                changeGender={newGender => {
                  setGender(newGender);
                }}
              />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
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
              />
            )}
          />
          <Route
            path="/my-picks/detail"
            render={() => (
              <FolderDetail folderList={folderList} addFolder={addFolder} />
            )}
          />
        </Switch>
        <SaveToastMsg />
        <DeleteToastMsg />
      </div>
    </BrowserRouter>
  );
}

export default App;
