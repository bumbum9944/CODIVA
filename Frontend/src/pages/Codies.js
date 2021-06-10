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

function Codies({ gender, apparels, selectedOption, folderList, addFolder }) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState({});
  const [codies, setCodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { state } = useContext(UserContext);
  const { user } = state;
  // useEffect(()=>{
  //   window.addEventListener("scroll", infiniteScroll, true);
  // }, []);

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
    request("post", "/codi/search", {
      gender: gender,
      apparels: apparels
    }).then(response => {
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
    });
  }, [user]);

  function onChangeSelectedItem(itemId) {
    setSelectedItem(itemId);
  }

  // function getCodies() {
  //   request("post", `codi/search?from=${currentPage + 20}`, {
  //     gender: gender,
  //     apparels: apparels
  //   })
  //     .then(response => {
  //       const res = response.data.data;
  //       const newCodies = res.map(item => {
  //         return {
  //           id: item.id,
  //           imageUrl: item.url,
  //           likeCnt: item.like_cnt,
  //           viewCnt: item.hits,
  //           isLiked: !user ? false : liked.includes(item.id) ? true : false,
  //           isSaved: !user ? false : saved.includes(item.id) ? true : false
  //         };
  //       });
  //       const copiedCodies = JSON.parse(JSON.stringify(codies));
  //       setCodies(copiedCodies.concat(newCodies));
  //     })
  //     .catch(err => console.log(err.message));
  // }

  // function infiniteScroll() {
  //   let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //   let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  //   let clientHeight = document.documentElement.clientHeight;

  //   if(scrollTop + clientHeight === scrollHeight) {
  //     console.log("asldfkjsd");
  //     getCodies();
  //     setCurrentPage(currentPage + 20);
  //   }

  // }

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
        // .then(response => response.data)
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
        <Chip className={classes.chip} label={gender} />
        {apparels.map((data, index) => {
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
    </div>
  );
}

export default Codies;
