import React from 'react'

const FakeAnchor = (props) => {
    return (
        <a href="#" onClick={() => props.openLink(props.link)}>
            {props.content}
        </a>
    )
}

export default FakeAnchor
