import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const categoryDetail = {
  cardigan: "OUTER",
  coat: "OUTER",
  jacket: "OUTER",
  vest: "OUTER",
  sleeveless: "TOP",
  "tee(short)": "TOP",
  "tee(long)": "TOP",
  mtm: "TOP",
  hood: "TOP",
  shirts: "TOP",
  jeans: "BOTTOM",
  leggings: "BOTTOM",
  slacks: "BOTTOM",
  skirts: "BOTTOM",
  training: "BOTTOM",
  "one-piece": "ONE PIECE"
};

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

function OptionTag({
  apparels,
  setApparels,
  selectedCategory,
  setSelectedCategory,
  detail,
  gender
}) {
  const classes = useStyles();

  const local_gender = sessionStorage.getItem("gender");
  const local_apparels = JSON.parse(sessionStorage.getItem("apparels")) || [];
  const local_selectedCategory = JSON.parse(
    sessionStorage.getItem("selectedCategory")
  ) || {
    OUTER: false,
    TOP: false,
    BOTTOM: false,
    "ONE PIECE": false
  };

  const handleDelete = chipToDelete => () => {
    sessionStorage.setItem(
      "apparels",
      JSON.stringify(
        local_apparels.filter(chip => chip.category !== chipToDelete.category)
      )
    );
    setApparels(chips =>
      chips.filter(chip => chip.category !== chipToDelete.category)
    );
    sessionStorage.setItem(
      "selectedCategory",
      JSON.stringify({
        ...local_selectedCategory,
        [categoryDetail[chipToDelete.category]]: false
      })
    );
    setSelectedCategory({
      ...selectedCategory,
      [categoryDetail[chipToDelete.category]]: false
    });
  };

  return (
    <>
      <Paper component="ul" className={classes.root}>
        <Chip className={classes.chip} label={local_gender} />
        {local_apparels.map((data, index) => {
          return (
            <li key={index}>
              <Chip
                label={data.category + ", " + data.color}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
    </>
  );
}

export default OptionTag;
