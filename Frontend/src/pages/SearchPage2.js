import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import ButtonBase from "@material-ui/core/ButtonBase";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header/Header";
import PageButton from "../components/common/PageButton";
import OptionTag from "../components/searchPage/OptionTag";
import ChooseDetail from "../components/searchPage/ChooseDetail";

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
  const images = [
    {
      url: `/images/${props.gender}_outer.jpg`,
      title: "OUTER",
      width: "100%"
    },
    {
      url: `/images/${props.gender}_top.jpg`,
      title: "TOP",
      width: "100%"
    },
    {
      url: `/images/${props.gender}_bottom.jpg`,
      title: "BOTTOM",
      width: "100%"
    },
    {
      url: `/images/${props.gender}_one_piece.jpg`,
      title: "ONE PIECE",
      width: "100%"
    }
  ];

  const classes = useStyles();
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailWarning, setDetailWarning] = useState(false);

  const handleClickOpen = d => {
    if (props.selectedCategory[d]) {
      setDetailWarning(true);
    } else {
      setDetailOpen(true);
    }
  };

  const handleClose = () => {
    setDetailWarning(false);
  };

  return (
    <>
      <Header headerText="SEARCH" />
      <OptionTag {...props} />
      <div>
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              onClick={() => {
                props.setDetail(image.title);
                handleClickOpen(image.title);
              }}
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

          <Snackbar
            open={detailWarning}
            style={{ height: "100%" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              severity="error"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="error"
                    display="flex"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            >
              이미 선택하신 카테고리 입니다👕
            </Alert>
          </Snackbar>

          <ChooseDetail
            {...props}
            detailOpen={detailOpen}
            setDetailOpen={setDetailOpen}
          />
        </div>
      </div>
      <PageButton {...props} />
    </>
  );
}

export default SearchPage2;
