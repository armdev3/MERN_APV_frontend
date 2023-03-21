import { useEffect, useState } from 'react'; //importamos un useEffect, es una forma de decirle a React que quieres ejecutar un código cuando el componente este listo
import { useParams, Link } from 'react-router-dom';//importamos el hook useParams para coger el token del enlace, y tambien link par
import axiosInstancia from '../config/axiosConfig.jsx';//importamos axio
import Alerta from '../components/Alerta.jsx';

const ConfirmarCuenta = () => {

  //importamos y definimos useState
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  //console.log(params);//comprobamos el token o id que estamos rebiendo
  const { id } = params;//extraemos el id de params

  useEffect(() => {//siempre lleva un funcion y como segundo parametro una dependencua  un arreglo vacio para que se ejecute cuando este listo

    const confirmarCuenta = async () => {

      try {
        //parte de la url la ponemos como variable de entorno
        const url = `/veterinarios/confirmar/${id}`

        const { data } = await axiosInstancia(url); //axios instancia ya tiene todo el nlace pricipal por eso solo añado /veterinarios

        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });//obtenemos el mensaje del servidor


      } catch (error) {
        //console.log(error.response.data.msg);//devuelve el mensaje de error del servidor
        setAlerta({ msg: error.response.data.msg, error: true });
      }

      setCargando(false);

    }

    confirmarCuenta();

  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y comienza a Adminstrar {" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link
            className='block text-center my-5 text-gray-500'
            to="/">Iniciar Sesión
          </Link>

        )}

      </div>

    </>

  )
}

export default ConfirmarCuenta;