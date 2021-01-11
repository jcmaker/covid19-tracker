import React from "react";
import numeral from "numeral";

function TableInfo({ countries }) {
  return (
    <div className="tableInfo">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{numeral(cases).format()}</td>
        </tr>
      ))}
    </div>
  );
}

export default TableInfo;
