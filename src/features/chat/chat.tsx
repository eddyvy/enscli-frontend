import { Box } from '@mui/material'
import { FC } from 'react'

type Props = {
  auth: string
}

export const Chat: FC<Props> = ({ auth }) => {
  return <Box>{auth}</Box>
}
