import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

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

function OptionTag({ apparels, setApparels, gender }) {
  const classes = useStyles();

  const handleDelete = chipToDelete => () => {
    setApparels(chips =>
      chips.filter(chip => chip.category !== chipToDelete.category)
    );
  };

  return (
    <>
      <Paper component="ul" className={classes.root}>
        <Chip className={classes.chip} label={gender} />
        {apparels.map((data, index) => {
          return (
            console.log(data),
            console.log(index),
            (
              <li key={index}>
                <Chip
                  label={data.category + ", " + data.color}
                  onDelete={handleDelete(data)}
                  className={classes.chip}
                />
              </li>
            )
          );
        })}
      </Paper>
    </>
  );
}

export default OptionTag;
