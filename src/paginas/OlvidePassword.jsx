
import { useState } from 'react';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import axiosInstancia from '../config/axiosConfig.jsx';



const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  //hace un llamado a nuestra api para comprobar los datos antes de enviarlos
  const handledSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({ msg: 'El Email es Obligatorio', error: true });//seteamos la variable alerta
      return
    }

    try {
      const {data} = await axiosInstancia.post('/veterinarios/olvide-password/', { email: email });
      console.log(data)
    
      setAlerta({ msg: data.msg, error:false });
      

    } catch (error) {
     
      setAlerta({ msg: error.response.data.msg, error: true });

    }

  }

  const { msg } = alerta;//pasamo el valor de alerta


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta
          alerta={alerta}
        />}

        <form
          onSubmit={handledSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
            >Email
            </label>

            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-500'
            to="/">¿Ya tienes una cuenta Inicia Sesion
          </Link>

          <Link
            className='block text-center my-5 text-gray-500'
            to="/registrar">No tienes una cuenta? Registrate
          </Link>
        </nav>


      </div>

    </>

  )
}

export default OlvidePassword;