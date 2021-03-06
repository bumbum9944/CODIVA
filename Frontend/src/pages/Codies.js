import { React, useState, useEffect, useContext } from "react";
import Header from "../components/common/Header/Header";
import CodyList from "../components/Codies/CodyList";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderListSlide from "../components/common/Folder/FolderListSlide";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { request, requestWithJWT } from "lib/client";
import UserContext from "contexts/user";
import SearchResult from "components/Codies/SearchResult";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "left",
    overflow: "auto",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

function Codies({ gender, apparels, folderList, addFolder }) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState({});
  const [codies, setCodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(20);
  const { state } = useContext(UserContext);
  const { user } = state;

  const local_gender = sessionStorage.getItem("gender");
  const local_apparels = JSON.parse(sessionStorage.getItem("apparels"));

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
    await request("post", "/codi/search", {
      gender: local_gender,
      apparels: local_apparels
    })
      .then(response => {
        const newCodies = response.data.data.map(item => {
          const itemId = item.id;
          return {
            id: itemId,
            imageUrl: item.url,
            likeCnt: item.like_cnt,
            viewCnt: item.hits,
            isLiked: !user ? false : liked.has(itemId) ? true : false,
            isSaved: !user ? false : saved.has(itemId) ? true : false
          };
        });
        setCodies(newCodies);
      })
      .then(() => {
        document
          .querySelector(".search-result-message")
          .classList.add("active");
      });
  }, []);

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
    const copiedCodies = JSON.parse(JSON.stringify(codies));
    for (let cody of copiedCodies) {
      cody.isLiked = !user ? false : liked.has(cody.id) ? true : false;
      cody.isSaved = !user ? false : saved.has(cody.id) ? true : false;
    }
    setCodies(copiedCodies);
  }, [user]);

  function toggleLiked(codyId, targetIndex) {
    const copiedCodies = JSON.parse(JSON.stringify(codies));
    if (copiedCodies[targetIndex].isLiked) {
      requestWithJWT("delete", `/like/${user}/${codyId}`).then(response => {
        console.log(response.data);
      });
      copiedCodies[targetIndex].likeCnt = copiedCodies[targetIndex].likeCnt - 1;
    } else {
      requestWithJWT("post", `/like/${user}/${codyId}`).then(response => {
        console.log(response.data);
      });
      copiedCodies[targetIndex].likeCnt = copiedCodies[targetIndex].likeCnt + 1;
    }
    copiedCodies[targetIndex].isLiked = !copiedCodies[targetIndex].isLiked;
    setCodies(copiedCodies);
  }

  function toggleSaved(targetItem, targetFolderId = null) {
    const targetItemId = targetItem.id;
    if (targetFolderId === null) {
      console.log({ id: targetItemId });
      requestWithJWT("delete", `/saved/${user}`, { id: targetItemId })
        .then(response => console.log(response.data))
        .catch(err => console.log(err.message));
    } else {
      requestWithJWT("post", `/saved/${user}/${targetFolderId}/${targetItemId}`)
        .then(response => response.data)
        .catch(err => console.log(err));
    }
    const targetIndex = targetItem.index;
    const copiedCodies = JSON.parse(JSON.stringify(codies));
    copiedCodies[targetIndex].isSaved = !copiedCodies[targetIndex].isSaved;

    setCodies(copiedCodies);
  }

  function viewCntIncrease(targetItem) {
    const targetId = targetItem.id;
    request("put", `codi/${targetId}`)
      .then(response => response.data)
      .catch(err => console.log(err));
    const targetIndex = targetItem.index;
    const copiedCodies = JSON.parse(JSON.stringify(codies));
    copiedCodies[targetIndex].viewCnt = copiedCodies[targetIndex].viewCnt + 1;
    setCodies(copiedCodies);
  }

  return (
    <div>
      <Header headerText="CODIES" />
      <Paper component="ul" className={classes.root}>
        <Chip className={classes.chip} label={local_gender} />
        {local_apparels.map((data, index) => {
          return (
            <li key={index}>
              <Chip
                label={data.category + ", " + data.color}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
      <CodyList
        codies={codies}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        toggleSaved={toggleSaved}
        toggleLiked={toggleLiked}
        viewCntIncrease={viewCntIncrease}
      />
      <FolderAdd addFolder={addFolder} />
      <FolderListSlide
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        folderList={folderList}
        addFolder={addFolder}
        toggleSaved={toggleSaved}
      />
      <SearchResult
        codies={codies}
        setCodies={setCodies}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        gender={gender}
        apparels={apparels}
      />
    </div>
  );
}

export default Codies;
