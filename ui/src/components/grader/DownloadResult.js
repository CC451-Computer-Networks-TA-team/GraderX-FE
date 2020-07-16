import React from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'


function DownloadResult(props){

    function downloadFile(){
        axios.get(`http://localhost:5000/results/cc451/${props.lab}`).then(res => {
            let resFile = new File([res.data], "results.txt", {
                type: "text/plain",
            });
            fileDownload(resFile, 'results.txt');
        })
    }

    return (
        <React.Fragment>
            <hr></hr>
            <p>Results are ready for download</p>
            <button onClick={downloadFile}>DOWNLOAD</button>
        </React.Fragment>
    )
}

export default DownloadResult