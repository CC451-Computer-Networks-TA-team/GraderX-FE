import React from "react";
import AppHeader from "../layout/AppHeader";

const MossLinkView = (props) => {
  return (
    <div>
      <div>
        <AppHeader />
      </div>

      <div className="moss-container" style={{width: "30%", textAlign: "center"}}>
        <h3>MOSS Results</h3>
        <div style={{ height: 24 }}></div>
        <a target="_blank" href={props.link}>{props.link}</a>
      </div>
    </div>
  );
};

export default MossLinkView;
