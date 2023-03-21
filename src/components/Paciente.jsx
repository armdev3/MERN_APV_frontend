import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {//recibimos nuestro proops como parametro haciendo destructuring
    //console.log(paciente); obtenemos los datos
   
    //definimos nuestra variable del state global q
    const { setEdicion , eliminarPaciente} = usePacientes();
    //extraemos los datos que nos interesan
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

      
    //formateamos la fecha actual a un formato valido
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);//creamos una instancia de fecha
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);//Intl.DateTimeFormat funcionaliodad  o api de javascript para cambiar el formato de fe fecha, tener en cuenta que solo funcion en navegadores mas modernos, alertiva luxon, date-fns

    }

    return (

        <>

            <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">

                <p className="font-bold uppercase text-indigo-700 my-2">Nombre:{' '}
                    <span className="font-normal normal-case text-black">{nombre}</span>
                </p>

                <p className="font-bold uppercase text-indigo-700 my-2">Propietario:{' '}
                    <span className="font-normal normal-case text-black">{propietario}</span>
                </p>

                <p className="font-bold uppercase text-indigo-700 my-2">Email:{' '}
                    <span className="font-normal normal-case text-black">{email}</span>
                </p>

                <p className="font-bold uppercase text-indigo-700 my-2">Fecha de Alta:{' '}
                    <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
                </p>

                <p className="font-bold uppercase text-indigo-700 my-2">Sintomas:{' '}
                    <span className="font-normal normal-case text-black">{sintomas}</span>
                </p>

                <div className="flex justify-between my-5">
                    <button
                        type="button"
                        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white front-bold rounded-lg uppercase"
                        onClick={()=>{
                            //pasamos directamente el objeto de paciente  a nuestro state global setEdicion
                            setEdicion(paciente);
                        }}

                    >Editar

                    </button>

                    <button
                        type="button"
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white front-bold rounded-lg uppercase"
                        onClick={()=>{
                            //Eliminar paciente
                            eliminarPaciente(_id);
            
                        }}  

                    >Eliminar

                    </button>

                </div>
               
            </div>
           
        </>

    )
}

export default Paciente