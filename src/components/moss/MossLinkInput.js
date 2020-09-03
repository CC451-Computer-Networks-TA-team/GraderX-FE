import React, {useState} from 'react'
import {Input, Header, Label, Button} from 'semantic-ui-react'

const MossLinkInput = (props) => {
    const [linkInvalid, setLinkInvalid] = useState(false)
    const [mossLink, setMossLink] = useState("")

    const mossLinkChange = (e) =>{
        setMossLink(e.target.value)
        if(/results\/\d\/(\d{8,15}|\d{8,15}\/)$/.test(e.target.value)){
            props.useExisting(e.target.value)
        }else{
            setLinkInvalid(true)
        }
    }

    return (
        <React.Fragment>
            <Header as="h4" style={{ marginBottom: '5px' }}>
            Enter an existing MOSS link
            </Header>
            <Input 
            fluid 
            icon='linkify' 
            placeholder='MOSS Link' 
            value={mossLink} 
            onChange={mossLinkChange} />
            {linkInvalid ? (
                <Label pointing size={"medium"} basic color="red">
                Invalid MOSS Link
                </Label>
            ) : null}
        </React.Fragment>
    )
}

export default MossLinkInput
