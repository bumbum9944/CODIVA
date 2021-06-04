import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header/Header";
import PageButton from "../components/common/PageButton";
import OptionTag from "../components/searchPage/OptionTag";

const images = [
  {
    url: "/images/woman_outer.jpg",
    title: "OUTER",
    width: "100%"
  },
  {
    url: "/images/woman_top.jpg",
    title: "TOP",
    width: "100%"
  },
  {
    url: "/images/woman_bottom.jpg",
    title: "BOTTOM",
    width: "100%"
  },
  {
    url: "/images/woman_one_piece.jpg",
    title: "ONE PIECE",
    width: "100%"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr",
    justifyItems: "center",
    alignItems: "center",
    width: "100vw",
    height: "72vh",
    marginBottom: "2vh"
  },
  image: {
    position: "relative",
    width: "100% !important", // Overrides inline-style
    height: "100%",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
    fontSize: "1.3rem"
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

function SearchPage2(props) {
  const classes = useStyles();

  return (
    <>
      <Header headerText="SEARCH" />
      <OptionTag />
      <div>
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>
      </div>
      <PageButton />
    </>
  );
}

export default SearchPage2;
