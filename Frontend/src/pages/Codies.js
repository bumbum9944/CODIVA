import { React, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header/Header";
import CodyList from "../components/Codies/CodyList";
import CodyHeader from "../components/Codies/CodyHeader";
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
  const location = useLocation();
  const codyData = location.state.codies;
  const [selectedItem, setSelectedItem] = useState({});
  // const [codies, setCodies] = useState(codyData);
  const [codies, setCodies] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { state } = useContext(UserContext);
  const { user, token, header } = state;

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
      setIsChecked({
        liked: liked,
        saved: saved
      });
    }
    request("post", "/codi/search", {
      gender: gender,
      apparels: apparels
    }).then(response => {
      const newCodies = response.data.data.map(item => {
        const itemId = parseInt(item.id);
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
    console.log(liked, saved);
    // const copiedCodies = JSON.parse(JSON.stringify(codies));
    // const newCodies = copiedCodies.map(item => {
    //   return {
    //     id: item.id,
    //     imageUrl: item.imageUrl,
    //     likeCnt: item.likeCnt,
    //     viewCnt: item.viewCnt,
    //     isLiked: !user ? false : liked.has(item.id) ? true : false,
    //     isSaved: !user ? false : saved.has(item.id) ? true : false
    //   };
    // });
    // setCodies(newCodies);
  }, [user]);

  function onChangeSelectedItem(itemId) {
    setSelectedItem(itemId);
  }

  function getCodies() {
    request("post", `codi/search?from=${currentPage + 20}`, {
      gender: gender,
      apparels: apparels
    })
      .then(response => {
        const res = response.data.data;
        const liked = isChecked.liked;
        const saved = isChecked.saved;
        const newCodies = res.map(item => {
          return {
            id: item.id,
            imageUrl: item.url,
            likeCnt: item.like_cnt,
            viewCnt: item.hits,
            isLiked: !user ? false : liked.includes(item.id) ? true : false,
            isSaved: !user ? false : saved.includes(item.id) ? true : false
          };
        });
        const copiedCodies = JSON.parse(JSON.stringify(codies));
        setCodies(copiedCodies.concat(newCodies));
      })
      .catch(err => console.log(err.message));
  }

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
      requestWithJWT("delete", `/like/${user}/${codyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data);
      });
      copiedCodies[targetIndex].likeCnt = copiedCodies[targetIndex].likeCnt - 1;
    } else {
      requestWithJWT("post", `/like/${user}/${codyId}`, header).then(
        response => {
          console.log(response.data);
        }
      );
      copiedCodies[targetIndex].likeCnt = copiedCodies[targetIndex].likeCnt + 1;
    }
    copiedCodies[targetIndex].isLiked = !copiedCodies[targetIndex].isLiked;
    setCodies(copiedCodies);
  }

  function toggleSaved(targetItem, folderName = null) {
    const targetId = targetItem.id;
    if (folderName) {
      const targetFolder = folderName === "기본 폴더" ? "default" : folderName;
      requestWithJWT(
        "post",
        `/saved/${user}/${targetFolder}/${targetId}`,
        header
      )
        .then(response => response.data)
        .catch(err => console.log(err));
    } else {
      requestWithJWT("delete", `/saved/${user}`, { id: targetId }, header)
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
      // .then(response=>response.data)
      .catch(err => console.log(err));
    const targetIndex = targetItem.index;
    const copiedCodies = JSON.parse(JSON.stringify(codies));
    copiedCodies[targetIndex].viewCnt = copiedCodies[targetIndex].viewCnt + 1;
    setCodies(copiedCodies);
  }

  return (
    <div>
      <Header headerText="CODIES" />
      {/* <CodyHeader gender={gender} selectedOption={selectedOption} /> */}
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
