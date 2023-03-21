import { useEffect, useState } from "react";

import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();//tate golbal :nos devuelve los datos de la autenticacion
    const [perfil, setPerfil] = useState({});//creamos  el state local para poder trabajar con ellas y no perder el valor de set global

    const [alerta, setAlerta] = useState({});

    //utilizamos useEffect
    useEffect(() => {

        setPerfil(auth);


    }, [auth])

    //console.log(perfil);//devuelve el objeto con los datos del perfil

    const handleSubmit = async e => {
        e.preventDefault();

        //console.log('desde el submit');
        const { nombre, email } = perfil;


        if ([nombre, email].includes('')) {

            setAlerta({ msg: 'Email y Nombre son Obligatorios', error: true });
            return;

        }

        //pasamos al state global el pefil
        const resultado = await actualizarPerfil(perfil); //con el await detenemos el codigo hasta que se ejecute la consulta con los datos

        setAlerta(resultado);

        setTimeout(() => {
            setAlerta({})
        }, 3000);

    }


    const { msg } = alerta;

    return (
        <>

            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar tu perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu{' '}
                <span className="text-indigo-600 font-bold">Información Aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {

                        msg && <Alerta

                            alerta={alerta}
                        />
                    }
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"//tenemos que escribir  mismo nombre de la propiedad del objeto  que tenemdo en el state para que los datos se pasen directamente desde
                                value={perfil.nombre || ''}//pasamo directamente el perfil.nombre pero la console nos indicara un  error para quitralo colocamos || '', asi mostraremos el valor actual de la propiedad
                                onChange={e => setPerfil({
                                    //tomamos una copia del objeto perfil y accedemos a sus propiedades para modificar solo la propiedad que vamos a moficar este caso es le nombre
                                    ...perfil,
                                    //accedemos a la propieda del array perfil con los corchetes y le psamos el valor actual del formulario 
                                    [e.target.name]: e.target.value

                                })}

                            ></input>

                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"//tenemos que escribir  mismo nombre de la propiedad del objeto  que tenemos en el state, para que los datos se pasen directamente 
                                value={perfil.web || ''}//pasamo directamente el perfil.nombre pero la console nos indicara un  error para quitralo colocamos || '', asi mostraremos el valor actual de la propiedad
                                onChange={e => setPerfil({
                                    //tomamos una copia del objeto perfil y accedemos a sus propiedades para modificar solo la propiedad que vamos a moficar este caso es web
                                    ...perfil,
                                    //accedemos a la propieda del array perfil con los corchetes y le psamos el valor actual del formulario 
                                    [e.target.name]: e.target.value

                                })}


                            ></input>

                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="telefono"//tenemos que escribir  mismo nombre de la propiedad del objeto  que tenemdo en el state para que los datos se pasen directamente desde
                                value={perfil.telefono || ''}//pasamo directamente el perfil.nombre pero la console nos indicara un  error para quitralo colocamos || '', asi mostraremos el valor actual de la propiedad
                                onChange={e => setPerfil({
                                    //tomamos una copia del objeto perfil y accedemos a sus propiedades para modificar solo la propiedad que vamos a moficar este caso es le nombre
                                    ...perfil,
                                    //accedemos a la propieda del array perfil con los corchetes y le psamos el valor actual del formulario 
                                    [e.target.name]: e.target.value

                                })}

                            ></input>

                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">email</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"//tenemos que escribir  mismo nombre de la propiedad del objeto  que tenemdo en el state para que los datos se pasen directamente desde
                                value={perfil.email || ''}//pasamo directamente el perfil.nombre pero la console nos indicara un  error para quitralo colocamos || '', asi mostraremos el valor actual de la propiedad
                                onChange={e => setPerfil({
                                    //tomamos una copia del objeto perfil y accedemos a sus propiedades para modificar solo la propiedad que vamos a moficar este caso es le nombre
                                    ...perfil,
                                    //accedemos a la propieda del array perfil con los corchetes y le psamos el valor actual del formulario 
                                    [e.target.name]: e.target.value

                                })}

                            ></input>

                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />

                    </form>

                </div>

            </div>

        </>

    )
}

export default EditarPerfil