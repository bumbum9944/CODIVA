import { React, useEffect, useState, useContext } from "react";
import Header from "../components/common/Header/Header";
import RankedItemList from "../components/TopCodies/RankedItemList";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderListSlide from "../components/common/Folder/FolderListSlide";
import UserContext from "contexts/user";
import { request, requestWithJWT } from "lib/client";

function TopCodies({ folderList, addFolder }) {
  const [selectedItem, setSelectedItem] = useState({});
  const [rankedItem, setRankedItem] = useState([]);
  const { state } = useContext(UserContext);
  const { user } = state;

  useEffect(async () => {
    let liked;
    let saved;
    if (user) {
      liked = new Set(
        await requestWithJWT("get", `/like/${user}`).then(
          response => response.data.user_like_codies
        )
      );
      saved = new Set(
        await requestWithJWT("get", `/saved/${user}`).then(
          response => response.data.data
        )
      );
    }
    request("get", "/codi").then(response => {
      const res = response.data.data;
      const codies = res.map(item => {
        return {
          id: item.id,
          imageUrl: item.url,
          likeCnt: item.likes_cnt,
          viewCnt: item.hits,
          isLiked: !user ? false : liked.has(item.id) ? true : false,
          isSaved: !user ? false : saved.has(item.id) ? true : false
        };
      });
      setRankedItem(codies);
    });
  }, [user]);

  function toggleSaved(targetItem, targetFolderId = null) {
    const targetItemId = targetItem.id;
    if (targetFolderId === null) {
      requestWithJWT("delete", `/saved/${user}`, { id: targetItemId })
        .then(response => response.data)
        .catch(err => console.log(err));
    } else {
      requestWithJWT("post", `/saved/${user}/${targetFolderId}/${targetItemId}`)
        .then(response => response.data)
        .catch(err => console.log(err));
    }
    const targetIndex = targetItem.index;
    const copiedTopCodies = JSON.parse(JSON.stringify(rankedItem));
    copiedTopCodies[targetIndex].isSaved =
      !copiedTopCodies[targetIndex].isSaved;

    setRankedItem(copiedTopCodies);
  }

  function toggleLiked(codyId, targetIndex) {
    const copiedTopCodies = JSON.parse(JSON.stringify(rankedItem));
    if (copiedTopCodies[targetIndex].isLiked) {
      requestWithJWT("delete", `/like/${user}/${codyId}`).then(response => {
        console.log(response.data);
      });
      copiedTopCodies[targetIndex].likeCnt =
        copiedTopCodies[targetIndex].likeCnt - 1;
    } else {
      requestWithJWT("post", `/like/${user}/${codyId}`).then(response => {
        console.log(response.data);
      });
      copiedTopCodies[targetIndex].likeCnt =
        copiedTopCodies[targetIndex].likeCnt + 1;
    }
    copiedTopCodies[targetIndex].isLiked =
      !copiedTopCodies[targetIndex].isLiked;
    setRankedItem(copiedTopCodies);
  }

  return (
    <div className="topCodies">
      <Header headerText="TOP CODIES" />
      <RankedItemList
        setSelectedItem={setSelectedItem}
        rankedItem={rankedItem}
        toggleSaved={toggleSaved}
        toggleLiked={toggleLiked}
      />
      <FolderAdd addFolder={addFolder} />
      <FolderListSlide
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        folderList={folderList}
        addFolder={addFolder}
        toggleSaved={toggleSaved}
      />
    </div>
  );
}

export default TopCodies;
