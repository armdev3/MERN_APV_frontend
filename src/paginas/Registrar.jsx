import { useState } from 'react';
import { Link } from 'react-router-dom';//importamos link para poider utilizarlo
import axiosInstancia from '../config/axiosConfig.jsx';//importamos axios para poder comunicarnos con nuestro backend
import Alerta from '../components/Alerta.jsx';//importamos sin parentesis ya que es un export default


const Registrar = () => {
  //definimos nuestro primer state, en un array vacio
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [repetirPassword, setRepetiPassword] = useState('');

  const [alerta, setAlerta] = useState({});//inicializamos alerta objeto vacio alerta que sera un state 


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Enviando Formulario');realizamos test de comunicacion con el envio del formulario

    if ([nombre, email, password, repetirPassword].includes('')) {//con includes tenemos acceso al metod del arreglo
      setAlerta({ msg: 'hay campos vacios', error: true });//pasasmos dos valores a la alerta
      return;
    }


    if (password !== repetirPassword) {
      setAlerta({ msg: 'Los passwords no son iguales', error: true });

      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'El password es menor de 6 caracteres, vuelva a introducirlo de formma correcta', error: true });

    }

    setAlerta({});


    /*******************con fetch APi************************************ */
    //creamos un objeto con los datos del usuario
   /*  const datosUsuario = {
      nombre, email, password
    }


    async function registrarUsuario() {
      const url = 'http://localhost:4000/api/veterinarios';

      const peticion = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datosUsuario),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })


        .then(request => request.json())
        .then(respuesta => {
          console.log(respuesta)
        })
        .catch(error => console.log(error))

      setAlerta({
        msg: 'creadoCorrectamente, revisa tu email',
        error: false
      })

      return peticion;


    }

    registrarUsuario(); */
    /*******************con fetch APi************************************ */

    /************cons Axios******************* */
    try {
        const url = '/veterinarios';
        await axiosInstancia.post(url,{nombre,email,password});
        
        setAlerta({msg:'Creado Correctamente, revisa tu email',error:false});
        

    } catch (error) {

      //(console.log(error.response.data);//extraemos el error de la respuesta del servidor para poder mostrarlo por pantalla
      const errorRespuesta = error.response.data.msg
      setAlerta({msg:errorRespuesta, error:true});


    }

 /************cons Axios******************* */

  }//fin handled

  const { msg } = alerta;//creamos una nueva variable para obtener el valor de la alerta y poder visualizar la alerta solo cuando tenga un valor

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Adminstra{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {
          //true && expresión
          // si la condición es true, el elemento justo después de && aparecerá en el resultado. Si es false, React lo ignorará.
          msg && <Alerta
            alerta={alerta}//mostramos la alerta
          />

        }

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
            >Nombre
            </label>

            <input
              type="text"
              placeholder="Introduce tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"

              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>




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

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
            >Password
            </label>

            <input
              type="password"
              placeholder="Introduce tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"

              value={password}
              onChange={e => setPasswrod(e.target.value)}
            />
          </div>
        
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
            >Repetir Password
            </label>

            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"

              value={repetirPassword}
              onChange={e => setRepetiPassword(e.target.value)}

            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
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
            to="/olvide-password">Olvide mi Password</Link>
        </nav>

      </div>

    </>

  )
}

export default Registrar;