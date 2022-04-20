import axios from 'axios'
import { useState } from 'react'
import './c-form-confeccionista.css'

const FormConfeccionista = (props) => {

  const [input, setInput] = useState({
    nombre:'',
    password:''
  })

  const generatePassword=()=>{

    const allCaracteres = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&?¡¿+*-_.';
    let password = ''

    for (let i = 0 ; i < 15 ; i++){
      password += allCaracteres[Math.floor(Math.random() * allCaracteres.length)]
    }

    setInput({...input, password})
  }

  const submitConfeccionista=()=>{
    console.log(input)
    axios.post('http://localhost:3000/confeccionistas/insert', input)
    .then(r => console.log(r.data))
  }

  const changeInput=(e)=>{
    setInput({...input, nombre:e.target.value})
  }

  return (
    <div className='containerAddConfe'>
      {
        props.active === true &&
      <form >
        <label >Nombre: </label>
        <br />
        <input onChange={changeInput} type="text" />
        <br />
        <label >Contraseña: </label>
        {
          input.password != '' && 
          <div>{input.password}</div>
        }
        <div className="generatePassword" onClick={generatePassword}>Generar contraseña</div>
        <div className="generatePassword" onClick={submitConfeccionista}>Guardar</div>
      </form>

      }
      
    </div>
  )
}

export default FormConfeccionista