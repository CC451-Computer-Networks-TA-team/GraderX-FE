import React, { useState, useEffect } from "react";
import { Segment, Grid, Container } from "semantic-ui-react";
import LabSelector from "./grader/LabSelector";
import CourseSelector from './grader/CourseSelector'
import GetSubmissions from './grader/submissions/GetSubmissions'
import Status from "./grader/Status";
import apiClient from "../api-client";
import MossInterface from './moss/MossInterface'


function Moss() {
    const [course, setCourse] = useState("")
    const [lab, setLab] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [importing, setImporting] = useState(false)
    const [mossResultsLink, setMossResultsLink] = useState("")
    const [existingLinkUsed, setExistingLinkUsed] = useState(false)

    function changeLab(val) {
        setLab(val);
    }

    function changeCourse(val) {
        setCourse(val);
    }

    const changeFile = f => {
        setStatus("grading");
        setFile(f);
    };

    const resetLab = () => {
        setLab("");
        setFile(null);
        setImporting(false)
        setStatus("");
    };

    const resetFile = () => {
        setFile(null);
        setImporting(false)
        setStatus("");
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append("submissions_file", file);
        apiClient
            .uploadSubmissionsMoss(formData)
            .then(res => {
                setMossResultsLink(res.data.url)
                setStatus("");
            })
            .catch(err => {
                setStatus("failed");
            });
    };

    const useExistingLink = (moss_link) => {
        setMossResultsLink(moss_link)
        setExistingLinkUsed(true)
        setStatus("");
    }


    useEffect(() => {
        if (file) {
            uploadFile();
        }
        // eslint-disable-next-line
    }, [file]);

    const importAndGrade = (accessToken, sheetLink, field) => {
        setStatus("grading")
        setImporting("true")
        apiClient.startImporting(accessToken, sheetLink, field, course, lab)
            .then((res) => {
                apiClient.startGrading(course, lab)
                    .then(res => {
                        setStatus("")
                    })
            })
    }

    const determineVisible = () => {
        if (!importing && !file && !existingLinkUsed) {
            return (
                <Container style={{ marginTop: "7em" }}>
                    <Grid centered>
                        <Grid.Column width={8}>
                            <Segment raised padded>
                                <GetSubmissions 
                                moss 
                                setFile={changeFile} 
                                useExisting={useExistingLink} 
                                resetLab={resetLab} 
                                importAndGrade={importAndGrade} />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
                )
        } else if (status) {
            return (
                <Container style={{ marginTop: "7em" }}>
                    <Grid centered>
                        <Grid.Column width={8}>
                            <Segment raised padded>
                                <Status status={status} resetFile={resetFile} />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
                )
        }else {
            return (
                    <Grid centered style={{ marginTop: "3em" }}>
                        <MossInterface moss_link={mossResultsLink}/>
                    </Grid>
                )
        }
    };

    return (
        determineVisible()
    );
}

export default Moss;
