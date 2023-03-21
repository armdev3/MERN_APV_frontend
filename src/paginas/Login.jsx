import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';//importamos un link de react y utilizamo use navigate para poder redirigir a al usuario
import Alerta from '../components/Alerta.jsx'
import useAuth from '../hooks/useAuth.jsx';//importamos nuestro hook
import axiosInstancia from '../config/axiosConfig.jsx';

const Login = () => {

    //definismo nuestros state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();
     
    const navigate = useNavigate();//esto coge una ruta donde quramos redireccionar al usuario

    const { msg } = alerta;

    //creamos nuestro evento o funcion cuando se envie el formulario
    const handledSubmit = async(e) => {
        e.preventDefault();

        if ([email, password].includes('')) {//metemos las variables en un arrar y con el includes comprobamos si los datos estan vacios
            setAlerta({ msg: 'Todos los campos son Obligatorios', error: true });
            return;

        }

        //realizamos la conexion con nuestra api
        try {

            
           let {data} = await axiosInstancia.post('/veterinarios/login/',{email, password});//pasamos los datos para autenticar el usuario
            //console.log(data);
            // //alamacenamos el nuevo token en localStorage
            localStorage.setItem('token', data.token);
            //aunticamos
            setAuth(data);
            //una vez autenticados redirigimos  a la pagina de admin
            navigate('/admin')
            
            

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })

        }

    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesión y Administra tus
                    <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white' >
                {msg && <Alerta
                    alerta={alerta}
                />

                }



                { //formulario
                }
                <form onSubmit={handledSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block font-bold"

                        >

                            Email
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
                        <label className="uppercase text-gray-600 block font-bold"

                        >

                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Introduce tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                    </div>
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/registrar">No tienes una cuenta? Registrate
                    </Link>

                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/olvide-password">Olvide mi Password</Link>
                </nav>


            </div>
        </>

    )
}

export default Login