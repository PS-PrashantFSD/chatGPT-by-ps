import React from 'react'
import {Box, Typography,Link, useTheme} from '@mui/material'


const Navbar = () => {
  const theme = useTheme()
  return (
    <Box width={'100%'} backgroundColor ={theme.palette.background.alt} p="1rem 6%" textAlign={'center'} sx={{boxShadow:3, mb:2}}>
      <Typography variant='h1' color={'primary'} fontWeight='bold'>
        A1 GPT3 Clone by PS
      </Typography>
      <Link href='/register' p={1}>Sign Up</Link>
      <Link  href='/Login' p={1}>Sign In</Link>
    </Box>
  )
}

export default Navbar