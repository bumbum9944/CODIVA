import React from "react";
import { Grid } from "@material-ui/core";

function PageTemplate({ children }) {
  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
    >
      {children}
    </Grid>
  );
}

export default PageTemplate;
