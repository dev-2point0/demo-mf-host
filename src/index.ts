import React from 'react';
import ReactDOM from "react-dom";
import appRouting from "./Routes";
import "./styles.scss";

ReactDOM.render(appRouting, document.getElementById("root"));

if ((module as any).hot) {
    (module as any).hot.accept()
}