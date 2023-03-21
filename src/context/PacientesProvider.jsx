import { createContext, useState, useEffect } from 'react';
import axiosInstancia from '../config/axiosConfig';
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = (props) => {
    const { auth } = useAuth();
    //definimos nuestros states
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
  

    useEffect(() => {

        //Funcion para obtener o listar los Pacientes
        const obtenerPacientes = async () => {


            try {
                const token = localStorage.getItem('token');

                if (!token) return;

                //y pasamos la configuracion de la cabeceras para poder pasar la autneticacion con el token en la politica de cors
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                //una vez autenticados con el token realizamo la peticion con axios al servidor para obtener los datos
                const { data } = await axiosInstancia('/pacientes', config);

                //pasamos los dato de nuestros pacientes a nuestro state global paciente
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }



        }

        //llamamos a nuestra funcion y mostramos la información
        obtenerPacientes();


    }, [auth]);//colocamos paciente como componente para queca




    //Funcion guardar Paciente en bases de datos
    const guardarPaciente = async (paciente) => {

        //console.log(paciente.id);
        //para la insercion del los datos en el servidor hay que estar identficado, cogemos el token que tenemos guardado en lo localStorage
        const token = localStorage.getItem('token');

        //y pasamos la configuracion de la cabeceras para poder pasar la autneticacion con el token en la politica de cors
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        /*si el paciente tiene un id estamos editando, si no es un usuario nuevo*/
        if (paciente._id) {

            //Editar Paciente con promesas no recomendable ya que su uso  es mas largo y menos legible

            //funcios para actaulizar
            // const actualizaDatos = (pacientes, pacienteData) => {

            //     //iteramos sobre el state pacientes y lo comparamos que reibimos  del paciente actaulizado
            //     const pacientesActualizado = pacientes.map((pacienteState) => {
            //         //si el id de pacientes es igual al del paciente actualizado mostramos los datos actualizados, sino mostramos los que ya tenismos en las bases de datos
            //         return pacienteState._id === pacienteData._id ? pacienteData : pacienteState

            //     })

            //     setPacientes(pacientesActualizado);

            // }

            // axiosInstancia.put(`/pacientes/${paciente._id}`, paciente, config)
            //     .then((response) => {
            //         // Imprime la respuesta de la solicitud PUT en la consola del navegador
            //         const data = response.data;

            //         //creamos una funcion para que cuando los datos de la peticion este diponibles de la petcion asicrona podemos obtenerlos ya que desde fuera del del los datos no estan disponiiobles
            //         actualizaDatos(pacientes, data);

            //         //Realiza una acción en función de la respuesta de la solicitud PUT
            //         if (response.status === 200) {
            //             console.log('El paciente ha sido actualizado correctamente')
            //         } else {
            //             console.log('Ha ocurrido un error al actualizar el paciente')
            //         }
            //     })
            //     .catch((error) => {
            //         // Imprime el error en la consola del navegador
            //         console.log(error);
            //     });

            //Editar usuario
            try {
                const { data } = await axiosInstancia.put(`/pacientes/${paciente._id}`, paciente, config);

                const pacienteActualizado = pacientes.map(pacienteState => {
                    return pacienteState._id === data._id ? data : pacienteState;
                });

                setPacientes(pacienteActualizado);

            } catch (error) {

                console.log(error);

            }




        } else {

            //Nuevo Paciente
            try {

                //Realizamos la conexion con nuestro servidor 
                const { data } = await axiosInstancia.post('/pacientes', paciente, config);
                //console.log(data);
                //esto nos crea un nuevo objeto sin los valores de la izquierda
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;


                //tomamos una copia de pacientesAlamcenado en pacientes
                setPacientes([pacienteAlmacenado], ...pacientes)


            } catch (error) {
                console.log(error.responsive.data.msg);

            }

        }



    }



    //definimos nuestra funcion donde cargaremos un objeto desde paciente.jsx
    const setEdicion = (obj_paciente) => {

        /*cargamos nuestro estate global setPaciente con el objeto recibido de funcion y
         posteriormente lo rendeizamos en el return para que los datos estes diponible en cuelquier componente*/
        setPaciente(obj_paciente);

    }

    //Eliminar Paciente
    const eliminarPaciente = async (id) => {
    //console.log(id);
     
        const confirmar = confirm('¿Confirmas que deseas eleminar este registro?');//devuelve true o false

        if (confirmar) {

            try {

                const token = localStorage.getItem('token');

                //y pasamos la configuracion de la cabeceras para poder pasar la autneticacion con el token en la politica de cors
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                //Realizamos la conexion con nuestro servidor 
                const { data } = await axiosInstancia.delete(`/pacientes/${id}`, config);
                const pacientesActualizado = pacientes.filter( pacienteState => pacienteState._id !== id);

                //pasamos los datos al state de pacientes para que esten actualizados
               setPacientes(pacientesActualizado);
               alert(data.msg);


            } catch (error) {

                console.log(error);
            }

        }
      
       
    }

    //pasamo los datos children quie es que contiene los hijos
    const { children } = props;

    //dentro del return pasamos nuestros state globales que contendran los datos que devolvamos de las peteciones hechas al servidor
    return (

        <PacientesContext.Provider

            value={{

                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente



            }}
        >
            {children}

        </PacientesContext.Provider>
    )

}

export {
    PacientesProvider
}

export default PacientesContext;