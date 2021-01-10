import React from "react";

function TableInfo({ countries }) {
  return (
    <div className="tableInfo">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default TableInfo;
