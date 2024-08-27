/* eslint-disable no-unused-vars */
import './App.css'
import { createContext, useState } from 'react'
import Wrapper from './components/jsx/wrapper'
export const themeContext=createContext(null)
function App() {
const[light,setLight]=useState(false)
  const changeLight = () => {
  setLight(!light)
}
  return (
    <themeContext.Provider value={{light,changeLight}}>
<Wrapper/>
    </themeContext.Provider>
    
   
  )
}

export default App
