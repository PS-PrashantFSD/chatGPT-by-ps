import './App.css';
import {Routes, Route} from 'react-router-dom'
import { useMemo } from 'react';
import {CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import {Toaster} from 'react-hot-toast'

import {themeSettings} from './theme'
import Navbar from './component/Navbar';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Summary from './pages/Summary';
import Paragraph from './pages/Paragraph';


function App() {
  const theme = useMemo( () => createTheme(themeSettings()),[]) 

  return (
    <>
    <ThemeProvider theme ={theme}>
      <CssBaseline/>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element= {<Homepage/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/register' element= {<Register/>} />
        <Route path='/summary' element= {<Summary/>} />
        <Route path='/paragraph' element= {<Paragraph/>} />
      </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
