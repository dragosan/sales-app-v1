import React from "react"
import { Message } from "semantic-ui-react"

const MessageInfo = ({ variant, header, text }) => (
  <Message variant={variant}>
    <Message.Header>{header}</Message.Header>
    <p>{text}</p>
  </Message>
)

export default MessageInfo
