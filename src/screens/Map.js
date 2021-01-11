import React, { useState } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";
import { Button } from "@material-ui/core";

function Map({ countries, casesType, center, zoom }) {
  const [onoffSwitch, setOnOffSwitch] = useState(true);

  const onClickSwitch = (e) => {
    e.preventDefault();

    if (onoffSwitch === true) {
      setOnOffSwitch(false);
    } else {
      setOnOffSwitch(true);
    }
  };
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        {/* Loop through countries and draw circles */}
        {/* {showDataOnMap(countries, casesType)} */}
        {onoffSwitch === true ? showDataOnMap(countries, casesType) : ""}
      </LeafletMap>
      <Button onClick={onClickSwitch}>
        {onoffSwitch === true ? (
          <span className="oncircle">Circles</span>
        ) : (
          <span className="offcircle">Circles</span>
        )}
      </Button>
    </div>
  );
}

export default Map;
