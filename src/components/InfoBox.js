import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent className="infoBox__title">
        <Typography color="textSecondary">{title}</Typography>
        <Typography className="infoBox__total">{total} Total</Typography>
        <h2 className="infoBox__cases">
          <ArrowDropUpIcon />
          {cases}
        </h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
