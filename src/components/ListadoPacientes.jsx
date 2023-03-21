
import usePacientes from "../hooks/usePacientes";//importamos nuestro Hook usePAcinetes.jsx
import Paciente from "./Paciente";//importamos nuestro paciente

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();//Extraemos los dato de nuestro Hook
  //console.log(pacientes);

  return (
    <>
      {pacientes.length ?

        (

          <>
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold"> Pacientes y Citas</span>

            </p>
              {
                //En react en el metodo map: utilizamos parentesis en vez de llaves, para simplificar codigo y tambien porque react las llaves solo se utiliza para definir un bloque de codigo
                pacientes.map((paciente) => 
                  <Paciente key={paciente._id} paciente={paciente}/>
                )
              }
              
          </>
        )


        : (

          <>
            <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold"> y  apareceran en este lugar</span>

            </p>
          </>
        )}
        
    </>
  )
}

export default ListadoPacientes