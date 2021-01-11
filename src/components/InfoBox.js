import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import numeral from "numeral";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent className="infoBox__title">
        <Typography color="textSecondary">{title}</Typography>
        <Typography className="infoBox__total">
          {numeral(total).format()} Total
        </Typography>
        <h2 className="infoBox__cases">+{numeral(cases).format()}</h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
