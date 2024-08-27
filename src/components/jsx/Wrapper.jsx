import { themeContext } from '../../App'
import '../style/Wrapper.css'
import Search from './Search'
import { useContext } from 'react'

function Wrapper() {
  const passedObject=useContext(themeContext)
  const handleChange=()=>{
    passedObject.changeLight(!passedObject.light)
  }
  return (
    <main className={passedObject.light ? 'light' : 'dark'}>
      <div className='d-row'>
        <h3 className={passedObject.light ? 'h3light' : 'h3dark'}>devfinder</h3>
        <div className='d-row-sun'>
          {
            !passedObject.light ?
          (<><span className='spandark'>LIGHT</span>
          <img src='/public/images/icon-sun.svg' onClick={ handleChange} /></>)
      :(<><span className= 'spanlight' >Dark</span>
          <img src='/public/images/icon-moon.svg' onClick={ handleChange} /></>)
         } 
        </div>
      
      </div>
      <Search />
    </main>
  )
}

export default Wrapper