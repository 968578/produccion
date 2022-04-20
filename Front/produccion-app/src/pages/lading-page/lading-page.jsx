import './lading-page.css'
import { Link } from 'react-router-dom'

const LadingPage=()=>{
  return(
    <div>
      <div>
        <h1>Manejo de Lotes Kbk</h1>

        <div className='c-sections'>  

          <Link to='/home-admin'>
            <div className="c-section">
              <h4>Administracion</h4>
            </div>
          </Link>
          <Link to='/home-auditoria'>
            <div className="c-section">
              <h4>Auditoria</h4>
            </div>
          </Link>
          <Link to='/login-confeccionista'>
            <div className="c-section">
              <h4>Confeccionista</h4>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default LadingPage