import { React, useState, useContext, useEffect } from "react";
import "./SearchResult.css";
import { useHistory } from "react-router-dom";
import { request, requestWithJWT } from "lib/client";
import UserContext from "contexts/user";
import Button from "@material-ui/core/Button";

function SearchResult({ codies, setCodies, currentPage, setCurrentPage }) {
  const history = useHistory();
  const [newSearchResult, setNewSearchResult] = useState(codies);
  const { state } = useContext(UserContext);
  const { user } = state;

  const local_gender = sessionStorage.getItem("gender");
  const local_apparels = JSON.parse(sessionStorage.getItem("apparels"));

  useEffect(() => {
    setNewSearchResult(codies);
  }, [codies]);

  function pushToSearch() {
    history.push("/search/2");
  }

  const loadMoreData = async () => {
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
    request("post", `/codi/search?from=${currentPage}`, {
      gender: local_gender,
      apparels: local_apparels
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
      if (newCodies.length > 0) {
        const copiedCodies = JSON.parse(JSON.stringify(codies));
        const updatedCodies = copiedCodies.concat(newCodies);
        setCodies(updatedCodies);
        setCurrentPage(currentPage + 20);
      }
      setNewSearchResult(newCodies);
    });
  };

  let searchResultMessage;
  if (newSearchResult.length > 0) {
    searchResultMessage = (
      <div className="load-more-data message-inner" onClick={loadMoreData}>
        <Button
          variant="contained"
          className="message-inner"
          style={{
            color: "white",
            backgroundColor: "black",
            fontSize: "5vw"
          }}
        >
          ??? ????????????
        </Button>
      </div>
    );
  } else {
    searchResultMessage = (
      <div className="no-result-message">
        <div className="message-inner">?????? ????????? ????????????.</div>
        <Button
          variant="contained"
          className="message-inner"
          onClick={pushToSearch}
          style={{
            color: "white",
            backgroundColor: "black",
            marginTop: "2vh",
            fontSize: "5vw"
          }}
        >
          ??????, ???????????????!
        </Button>
      </div>
    );
  }

  return <div className="search-result-message">{searchResultMessage}</div>;
}

export default SearchResult;
