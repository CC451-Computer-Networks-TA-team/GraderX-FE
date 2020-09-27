import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { Icon } from "semantic-ui-react";
import { Label, Input, Transition, Container, Dropdown } from "semantic-ui-react";
import ReactHtmlParser from 'react-html-parser';
import apiClient from "../../../api-client"
import MicrosoftLogin from "react-microsoft-login";

import { Button, TextInput } from 'carbon-components-react';

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

    const onFieldsChange = (_, data) => {
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
                <span>
                    <GoogleLogin
                        clientId="653543257974-p3uuv08hcftdhkolqpl2hpbbta2d1ck2.apps.googleusercontent.com"
                        scope="https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly"
                        render={renderProps => (
                            <Button
                                kind="secondary"
                                hasIconOnly
                                iconDescription="Google Sheet"
                                onClick={renderProps.onClick}>
                                <Icon name='google' size='small' />
                            </Button>

                        )}
                        onSuccess={(response) => {
                            authSuccessful(response);
                            setAuthorized(true);
                        }}
                        onFailure={err => { }}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Button
                        kind="secondary"
                        hasIconOnly
                        style={{ marginLeft: 8 }}
                        iconDescription="Micosoft Sheet">
                        <Icon name='microsoft' size='small' />
                    </Button>

                </span>


            </div>

            <Transition animation='slide left' duration={200} visible={authorized}>
                <Container>
                    <p>Enter the spreadsheet link:</p>
                    <div style={{ height: 16 }}></div>
                    <TextInput
                        id='spreadsheetLinkField'
                        disabled={disableSheetInput}
                        value={sheetLink}
                        invalid={!validSheet}
                        type='text'
                        invalidText={warningText}
                        placeholder="Spreadsheet Link"
                        onChange={(e) => setSheetLink(e.target.value)}
                    />

                    <input />
                    {
                        sheetFields.length > 0 &&
                        <Dropdown
                            selectOnBlur={false}
                            placeholder="Select Field"
                            compact
                            button
                            selection
                            options={sheetFields}
                            onChange={onFieldsChange}
                        />
                    }
                    <Button
                        loading={disableSheetInput}
                        disabled={disableContinue}
                        onClick={() => props.importAndGrade(accessToken, sheetLink, selectedField)}
                    >
                        Continue
                        </Button>

                </Container>
            </Transition>
        </React.Fragment>
    )
}


export default ImportSubmissions
