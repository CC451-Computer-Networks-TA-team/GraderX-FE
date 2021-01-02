import React, { useState, useEffect } from "react";
import { Button } from "carbon-components-react";
import { Upload16 } from "@carbon/icons-react";
import "../styles.scss";
import apiClient from "../../api-client";
import MossFileUpload from "./MossFileUpload";
import Status, { statusState } from "./Status";
import MossLinkView from './MossLinkView'

function MossOne() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [mossLink, setMossLink] = useState("");

  const resetFile = () => {
    setFile(null);
    setStatus("");
  };

  const changeFile = (file) => {
    setStatus(statusState.LOADING);
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("submissions_file", file);
      apiClient
        .uploadMossSubmissions(formData)
        .then((res) => {
          setMossLink(res.data.url)
          setStatus("")
        }).catch(err => {
          setStatus(statusState.FAILED)
        });
    }
  }, [file]);

  const determineVisible = () => {
    if (!file) {
      return <MossFileUpload setFile={changeFile} />;
    } else if (status) {
      return <Status statusState={status} loadingText="processing" reset={resetFile} />;
    } else {
    return <MossLinkView link={mossLink} />;
    }
  };

  return determineVisible();
}

export default MossOne;
