import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { Icon } from "semantic-ui-react";
import apiClient from "../../../api-client"
import MicrosoftLogin from "react-microsoft-login";
import '../../styles.scss'

import { Button, TextInput, Dropdown } from 'carbon-components-react';

const ImportSubmissions = (props) => {
    const [accessToken, setAccessToken] = useState("")
    const [sheetLink, setSheetLink] = useState("")
    const [disableContinue, setDisableContinue] = useState(true)
    const [disableSheetInput, setDisableSheetInput] = useState(false)
    const [validSheet, setValidSheet] = useState(true)
    const [warningText, setWarningText] = useState("")
    const [authorized, setAuthorized] = useState(false)
    const [optionsVisibity, setOptionsVisibility] = useState(true)
    const [sheetFields, setSheetFields] = useState([])
    const [selectedField, setSelectedField] = useState("")
    const MS_CLIENT_ID = "21adf918-a9cb-41af-8a1c-f8e4866a8107"

    const authSuccessful = (response) => {
        setAccessToken(response.accessToken)
        setOptionsVisibility(false)
    }


    const authHandler = (err, data) => {
        setAccessToken(data.authResponseWithAccessToken.accessToken);
        setOptionsVisibility(false);
        setAuthorized(true);
    };

    const createFieldsObjects = fieldsArray => {
        let fieldsObjects = [];
        fieldsArray.forEach(field => {
            fieldsObjects.push({ key: field, text: field, value: field });
        });
        setSheetFields(fieldsObjects);
    };


    useEffect(() => {
        if (sheetLink.length > 0) {
            setDisableSheetInput(true)
            apiClient.validateSheet(accessToken, sheetLink)
                .then((res) => {
                    setSheetFields([])
                    setValidSheet(true)
                    setDisableContinue(false)
                })
                .catch((err) => {
                    setValidSheet(false)
                    setDisableContinue(true)
                    if (err.response) {
                        if (err.response.data.fields) {
                            createFieldsObjects(err.response.data.fields)
                            setWarningText(err.response.data.msg + "<br>Please select the form field that represents submissions")
                        } else {
                            setSheetFields([])
                            setWarningText(err.response.data)
                        }
                    }
                })
                .finally(() => {
                    setDisableSheetInput(false)
                })
        }
        // eslint-disable-next-line
    }, [sheetLink])

    const onFieldsChange = (data) => {
        setDisableContinue(false)
        setValidSheet(true)
        setSelectedField(data.value)
    }


    return (
        <React.Fragment >
            <div style={optionsVisibity ? {} : { display: 'none' }}>
                <div>
                    <p>Import From:</p>
                    <div style={{ height: 16 }}></div>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div style={{ display: "inline-block" }}>
                        <GoogleLogin
                            clientId="653543257974-p3uuv08hcftdhkolqpl2hpbbta2d1ck2.apps.googleusercontent.com"
                            scope="https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly"
                            render={renderProps => (
                                <div
                                    id="googlebutton"
                                    onClick={renderProps.onClick}
                                    style={{
                                        backgroundColor: "#4285F4",
                                        height: 40,
                                        width: 104,
                                        display: "flex",
                                        alignItems: "center",
                                        paddingLeft: 16,
                                    }}
                                >
                                    <div style={{ display: "inline-block" }}><Icon name='google' /></div>
                                    <p style={{ display: "inline-block" }}>Sign in</p>
                                </div>
                            )}
                            onSuccess={(response) => {
                                authSuccessful(response);
                                setAuthorized(true);
                            }}
                            onFailure={err => { }}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div style={{ width: 5 }}></div>
                    <div
                        style={{ height: 40, width: 104, display: "inline-block" }}
                    ><MicrosoftLogin
                            clientId={MS_CLIENT_ID}
                            authCallback={authHandler}
                            buttonTheme="dark_short"
                            graphScopes={["user.read", "Files.Read.All"]}
                        />
                    </div>
                </div>
            </div>

            <div style={authorized ? {} : { display: 'none' }}>
                <p>Enter the spreadsheet link:</p>
                <div style={{ height: 16 }}></div>
                <TextInput
                    id='spreadsheetLinkField'
                    labelText='Spreadsheet Link'
                    disabled={disableSheetInput}
                    value={sheetLink}
                    invalid={!validSheet}
                    type='text'
                    invalidText={warningText}

                    onChange={(e) => setSheetLink(e.target.value)}
                />



                {
                    sheetFields.length > 0 ?
                        <div>
                            <div style={{ height: 16 }}></div>
                            <Dropdown
                                id="fieldsDropdown"
                                titleText="Select Field"
                                label="Select"
                                onChange={(data) => {
                                    onFieldsChange(data.selectedItem);
                                }}
                                itemToString={(item) => (item ? item.text : '')}
                                items={sheetFields}
                            />
                        </div>


                        : <div></div>
                }

                <div style={{ height: 16 }}></div>
                <Button
                    disabled={disableContinue}
                    onClick={() => props.importAndGrade(accessToken, sheetLink, selectedField)}
                >
                    Continue
                        </Button>

            </div>
        </React.Fragment>
    )
}


export default ImportSubmissions
