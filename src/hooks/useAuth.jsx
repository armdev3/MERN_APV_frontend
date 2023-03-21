
/*********Creamos nuestra hook**************** */
import {useContext} from 'react';//con usecontext podemos extraer los datos
import AuthContext from   '../context/AuthProvider';//con este context identifiamos los datos

const useAuth = ()=>{
 return useContext(AuthContext);//au use context pasamos el provider para poder trabajar con lo datos
}

export default useAuth;