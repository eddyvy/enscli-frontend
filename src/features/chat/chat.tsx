import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { FC, useState } from 'react'
import { useFeedback } from '../feedback'
import axios from 'axios'
import MarkdownPreview from '@uiw/react-markdown-preview'

type Message = {
  sender: 'user' | 'assistant'
  text: string
}

type Props = {
  auth: string
}

export const Chat: FC<Props> = ({ auth }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<string>('')
  const [input, setInput] = useState('')

  const { Feedback, setIsLoading, setError } = useFeedback()

  const handleSend = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage: Message = { sender: 'user', text: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput('')

    axios
      .post<{ response: string; sessionId: string }>(
        'https://enscli-backend.fly.dev/clinical-protocol/ncov004/chat',
        {
          message: userMessage.text,
          sessionId,
        },
        {
          headers: { Authorization: auth },
        }
      )
      .then((res) => {
        const assistantResponse: Message = {
          sender: 'assistant',
          text: res.data.response,
        }
        setMessages((prevMessages) => [...prevMessages, assistantResponse])
        setSessionId(res.data.sessionId)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <Box>
      <Typography variant="h4">Pregunta sobre NCOV004</Typography>
      <List
        sx={{
          width: '90vw',
          maxWidth: '700px',
          height: '50vh',
          minHeight: '300px',
          overflowY: 'scroll',
        }}
      >
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              secondary={message.sender === 'user' ? 'You' : 'Assistant'}
              sx={{
                textAlign: message.sender === 'user' ? 'right' : 'left',
              }}
            >
              <MarkdownPreview source={message.text} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <TextField
        label="Escribe tu mensaje"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />
      <Feedback />
      <Button
        sx={{ marginTop: 2 }}
        onClick={handleSend}
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </Box>
  )
}
