import { useState, useEffect, createContext } from 'react';
const AuthContext = createContext();
import axiosInstancia from '../config/axiosConfig';

//creamos un compnente que va tener dentro los hijos que definamos dentro de el
const AuthProvider = (props) => {
    //pasamos los valores del props a la palabra reservada children para poder visualizar nuestro componentes
    const { children } = props;
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});//creamos nuestros state que seran globales

    useEffect(() => {

        //creamos una funcion para autenticra usuario
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');//recuperamos el token almacenado en el localstorage

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {

                //creamos las cabeceras para indicar el tipo de auticacion del token, en este caso es bearer
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data } = await axiosInstancia('/veterinarios/perfil', config);//pasamos la configuracion para la validacion del token
                setAuth(data);//cogemos los datos del servidor y se lo pasamos a nuestro state global para que los datos esten disponibles desde cualquier lugar desde nuestro state.

            } catch (error) {
                setAuth({});

                console.log({ msg: error.response.data.msg })

            }
            setCargando(false);

        }

        //llamamos a la funcio autenticar usuario, que tiene toda la informacion del usuario
        autenticarUsuario();
    }, [])

    //creamos una funcion para cerra sesion
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});

    }

    //Actualizar perfil
    const actualizarPerfil = async (datos) => {

        const token = localStorage.getItem('token');//recuperamos el token almacenado en el localstorage

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {

            //creamos las cabeceras para indicar el tipo de auticacion del token, en este caso es bearer
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await axiosInstancia.put(url, datos, config);//pasamos la url, los datos que vamos a almacenar y la configuracion
            //directamente aplicamos un return por que luego mostraremos mensaje desde el provaider 

            return {
                msg: 'Almacenado Correctamente'
            }

        } catch (error) {

            return { msg: error.response.data.msg, error: true };

        }

    }


    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');//recuperamos el token almacenado en el localstorage

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {

            //creamos las cabeceras para indicar el tipo de auticacion del token, en este caso es bearer
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url ='/veterinarios/actualizar-password';

            const {data}= await axiosInstancia.put(url,datos,config);
            console.log(data);

            return{
                msg:data.msg, 
                error:false
            }
            
        } catch (error) {
            
            return {
                msg:error.response.data.msg,
                error:true
            };
        }
    }


    //devolvemos en el provaider todos nuestras varibles y funciones
    return (
        <AuthContext.Provider
            value={{
                //pasamos un objeto al componente con setauth, setAuth y cargando que esten disponibles por default
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}

        >
            {
                //AuthContext.Provider => componete que contiene los hijos para poder usar los state de forma global dentro de los compenentes hijos, 
                //children  es un prop reservado llamdo children, hace referencia a los componentes hijos  Routes y Route del fichero app.jsx
                children
            }
        </AuthContext.Provider>
    )


}

export {
    AuthProvider
}

export default AuthContext