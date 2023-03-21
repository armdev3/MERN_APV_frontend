import { useState, useEffect } from "react"
import Alerta from '../components/Alerta';
import usePacientes from "../hooks/usePacientes";//importasmos nuestro hook 

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [_id, set_Id] = useState(null);


    //state para mensajes
    const [alerta, setAlerta] = useState({});

    //state globales
    //definimos nuestra variable que recibe los datos de nuestor state global usePAcientes, 
    // importamos a paciente para poder editar un paciente desde el formulario.
    const { guardarPaciente, paciente } = usePacientes();

    

    //Editar formulario, creamos useEffect para recibir cualquier evento  o respuesta de nuestro componente paciente
    useEffect(() => {
        if (paciente?.nombre) {//para no tener warnings utilizamos el  Optional Chaining de javascript colocando la  interrogacion al final del objeto

            //
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'))
            setSintomas(paciente.sintomas);
            set_Id(paciente._id);
        }

    }, [paciente])



    //definino una funcio para limpiar el formulario
    const limpiarFormulario = (nombre, propietario, email, fecha, sintomas) => {
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    };



    //definimos nuestra funcion para detectar el envio del formulario y poder comprobar los datos
    const handleSubmit = ((e) => {
        e.preventDefault();

        //Validar Formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'todos los campos son obligatorios', error: true });
            return;
        }

       

        //A nuestra funcion guardar paciente que recibimos de nuestro state le pasamos todos los datos del formulario para que nos cree un nuevo objeto
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, _id });
        setAlerta({msg:'Guardado correctamente',error:false});

        //limpiamos la alerta despues de 3 segundos
        setTimeout(() => {
            setAlerta({});
          }, 3000); 

        //limpiamos el formulario
        limpiarFormulario(nombre, propietario, email, fecha, sintomas);
    }

    )

    //Extraemos el mensaje
    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold"> Adminstralos</span>

            </p>

            <form
                className="bg-white py-10 px-5 mb-5 lg:mb-0 shadow-md rounded-mb"
                onSubmit={handleSubmit}

            >
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    >
                    </input>

                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre del Propietario</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    >
                    </input>

                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    >
                    </input>

                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    >
                    </input>

                </div>


                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />

                    <input
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                        value={
                            //evaluamos el _id del paciente, si tiene o no un valor, para mostrar el texto en boton de submit
                            _id ? 'Guardar Cambios' : 'Agregar Paciente'
                        }
                    >
                    </input>


                </div>

            </form>
            {
                //mostramos la alerta
                msg && <Alerta
                    alerta={alerta}
                />
            }

        </>


    )
}

export default Formulario