import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: "40vw",
    height: "25vh"
  },
  media: {
    width: "100%",
    height: "25vh"
  }
});

function CodyCard({ item }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      className={classes.root}
      onClick={() => {
        history.push({
          pathname: `/detail/${item.id}`,
          state: {
            item: item
          }
        });
      }}
    >
      <CardActionArea>
        <img className={classes.media} src={item.imageUrl} alt="cody-image" />
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default CodyCard;
