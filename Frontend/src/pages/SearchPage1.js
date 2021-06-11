import React from "react";
import Header from "../components/common/Header/Header";
import GenderSelect from "../components/searchPage/GenderSelect";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

function SearchPage1(props) {
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
  const classes = useStyles();

  return (
    <div className="search-page">
      <Header headerText="SEARCH" />
      <Paper className={classes.root}>
        <Chip className={classes.chip} label="선택하신 옵션이 표시됩니다😉" />
      </Paper>
      <div
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "center"
        }}
      >
        <GenderSelect {...props} />
      </div>
    </div>
  );
}

export default SearchPage1;
