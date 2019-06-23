import React from "react";
import namor from "namor";
import "./index.css";

export const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export const newPerson = () => {
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    room: Math.floor(Math.random() * 30),
    phone: Math.floor(Math.random() * 30)
  };
};

export function makeData(len = 9) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export const Logo = () => (
  <div
    style={{
      margin: "1rem auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    For more examples, visit {""}
    <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>
);

export const Tips = () => (
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
);
