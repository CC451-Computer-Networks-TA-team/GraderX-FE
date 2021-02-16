import React from "react";
import AppHeader from "../layout/AppHeader";

const MossLinkView = (props) => {
  return (
    <div>

      <div className="moss-container">
        <h3 className="moss-results-header">MOSS Results</h3>
        <div style={{ height: 24 }}></div>
        <a target="_blank" href={props.link}>{props.link}</a>
      </div>
    </div>
  );
};

export default MossLinkView;
