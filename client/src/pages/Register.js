import React, {useState} from 'react'
import {Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse } from '@mui/material'

const Register = () => {

  const theme = useTheme()
  //media
  const isNotMobile = useMediaQuery("(min-width:1000px)")

  //state
  const [username, setUsername] = useState("")
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  return (
    <>
    <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{boxShadow:5}} backgroundColor={theme.palette.background.main}>
      <form>
        <Typography>
          
        </Typography>

      </form>
    </Box>
    </>
  )
}

export default Register