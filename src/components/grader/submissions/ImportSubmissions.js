import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";
import { Button, Header, Grid, GridColumn, Icon } from "semantic-ui-react";
import { Label, Input, Transition, Container, Dropdown } from "semantic-ui-react";
import ReactHtmlParser from 'react-html-parser';
import GradingService from '../../../services/GradingService'

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
        setAccessToken(data.authResponseWithAccessToken.accessToken)
        setOptionsVisibility(false)

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
            GradingService.validateSheet(accessToken, sheetLink)
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
            <Transition animation='slide right' duration={200}
                visible={optionsVisibity}
                onHide={() => setAuthorized(true)}>
                <Container >
                    <Header style={{ margin: '0', marginBottom: '7px' }} textAlign="center" as="h4">
                        Import From
                </Header >

                    <Grid >
                        <GridColumn style={{ marginLeft: "27%", marginRight: "20%" }}>
                            <div class="ui buttons">
                                <GoogleLogin
                                    clientId="653543257974-p3uuv08hcftdhkolqpl2hpbbta2d1ck2.apps.googleusercontent.com"
                                    scope="https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly"
                                    render={renderProps => (
                                        <Button onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            style={{ backgroundColor: '#2f2f2f', color: 'white' }}>

                                            <Icon name='google' />
                                            Sign in
                                        </Button>
                                    )}
                                    onSuccess={authSuccessful}
                                    onFailure={err => { }}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <div class="or"></div>
                                <MicrosoftLogin
                                    clientId={MS_CLIENT_ID}
                                    authCallback={authHandler}
                                    buttonTheme="dark_short"
                                    graphScopes={["user.read", "Files.Read.All"]}
                                />
                            </div>


                        </GridColumn>



                    </Grid>


                </Container>

            </Transition>

            <Transition animation='slide left' duration={200} visible={authorized}>
                <Container>
                    <Header
                        as="h4"
                        style={{ marginBottom: '5px' }} >
                        Enter the link of the form's responses spreadsheet
                    </Header>
                    <Input
                        disabled={disableSheetInput}
                        type='text'
                        placeholder='Spreadsheet Link'
                        action
                        fluid
                        value={sheetLink}
                        error={!validSheet}
                        onChange={(e) => setSheetLink(e.target.value)}
                    >
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
                            style={{ backgroundColor: '#7147BC', color: 'white' }}
                            onClick={() => props.importAndGrade(accessToken, sheetLink, selectedField)}
                        >
                            Continue
                        </Button>
                    </Input>
                    {
                        !validSheet &&
                        <Label basic color='red' pointing>
                            {ReactHtmlParser(warningText)}
                        </Label>
                    }

                </Container>
            </Transition>
        </React.Fragment>
    )
}


export default ImportSubmissions
