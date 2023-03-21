/*********Creamos nuestra hook**************** */
import {useContext} from 'react';//con usecontext podemos extraer los datos
import PacientesContext from   '../context/PacientesProvider';//importamos el export default

const usePacientes = ()=>{
 return useContext(PacientesContext);//au use context pasamos el provider para poder trabajar con lo datos
}

export default usePacientes;