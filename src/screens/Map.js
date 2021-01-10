import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "leaflet";

function Map() {
  return (
    <div className="map">
      <LeafletMap>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
      </LeafletMap>
    </div>
  );
}

export default Map;
