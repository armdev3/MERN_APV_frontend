import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import axiosInstancia from '../config/axiosConfig.jsx';



const NuevoPassword = () => {

  //definimos nuestr useStat parta poder trabajar con la variables
  const [password, SetPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, SetPasswordModificado] = useState( false);

  //importamos y usuasmos useParamas para obtener el token de la url y poder validarlo posteriormente
  const params = useParams();
  //console.log(params);
  const { token } = params //obtenemos el token de la url

  //comprobacion de nuestro token con la api
  useEffect(() => {

    //creamos una funcion 
    const comprobarToken = async () => {
      try {
        //realizamos envio hhacia la pai para comporbar que el usuario es validdo a trave del token y su es correcto damos por valido el token
        await axiosInstancia(`/veterinarios/olvide-password/${token}`);// enviamos la peticion por defecto con axios como get para saber si el token es valido
        //console.log( await axiosInstancia(`/veterinarios/olvide-password/${token}`))
        setAlerta({ msg: 'Coloca tu nuevo password', error: false });
        //ponemos a true cuando el token sea valido
        setTokenValido(true);

      } catch (error) {
        setAlerta({ msg: 'Hubo un error con el enlace', error: true })
      }

    }

    comprobarToken();

  }, [])

  //Validacion de nustra nuevo password desde el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }

    //interactuamo con nuestra Api
    try {

      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await axiosInstancia.post(url, { password });//enviamos el nuevo password como post
      //console.log(data);
      setAlerta({ msg: data.msg });
      //pasamos a true le password modificado
      SetPasswordModificado(true);
     

    } catch (error) {

      setAlerta({ msg: error.response.data.msg, erro: true })

    }
    
   
  }

  const { msg } = alerta;
  console.log(alerta);

  return (

    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no pierdas Acceso a{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          /*******Formulario para resstablecer contraseña*********** */
        }

        {
          //true && expresión
          // si la condición es true, el elemento justo después de && aparecerá en el resultado. Si es false, React lo ignorará.
          msg && <Alerta
            alerta={alerta}//mostramos la alerta
          />

        }


        {
          //si el token es valido mostramos el formulario para que el usuario puede ingresar su nueva constraseña
          tokenValido && (

            <>
              <form onSubmit={handleSubmit}>

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
                    onChange={e => SetPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Guardar nuevo password"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
              </form>
              {passwordModificado && 
              
              <Link
                className='block text-center my-5 text-gray-500'
                to="/">Iniciar Sesion
              </Link>
              
              }
              

            </>
          )
        }



      </div>
    </>


  )
}

export default NuevoPassword;