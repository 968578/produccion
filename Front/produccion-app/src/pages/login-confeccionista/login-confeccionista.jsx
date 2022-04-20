import axios from 'axios'
import { useEffect, useState } from 'react'
import './login-confeccionista.css'

const LoginConfeccionista=()=>{

  const [input, setInput] = useState({
    nombre:'',
    password:''
  })

  const changeInput=(e)=>{
    setInput({...input, [e.target.name]: e.target.value })
  }

  const submitInput=(e)=>{
    console.log(input)
    e.preventDefault()
    axios.post('http://localhost:3000/confeccionistas/login', input)
    .then(r =>{
      if(r.data.msj === 'Contraseña correcta'){
        window.localStorage.setItem('accessToken', r.data.token)
        window.location.href = '/Home-Confeccionista'
      }
      console.log(r.data)
    })
  }

  useEffect(()=>{
    if(window.localStorage.getItem('accessToken')){
      window.location.href= '/Home-Confeccionista'
    }

    console.log(window.localStorage.getItem('accessToken'))
  },[])


  return(
    <div>
      <form onSubmit={submitInput}>
        <div className="c-loginConfeccionista">
          <label >Nombre: </label>
          <input onChange={changeInput} name='nombre' type="text" />
          <label >Contraseña: </label>
          <input onChange={changeInput} name='password' type="password"  />
          <input type='submit'  className='btn-loginConfeccionista' value='Ingresar' />
        </div>
      </form>
    </div>
  )
}

export default LoginConfeccionista