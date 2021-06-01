import React from "react";
// import { useHistory } from 'react-router-dom';
import "./CodyDetailCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: "50vw",
    height: "50vh"
  },
  media: {
    width: "100%",
    height: "50vh"
  }
});

// const history = useHistory();

function CodyDetailCard({ item }) {
  const classes = useStyles();

  return (
    <div className="cody-detail-container">
      <Card className={classes.root}>
        <CardActionArea>
          <img
            className={classes.media}
            src={item.imageUrl}
            alt="cody-detail-image"
          />
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CodyDetailCard;
