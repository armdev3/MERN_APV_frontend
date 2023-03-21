import { Outlet, Navigate } from "react-router-dom"//importamos nuestro nuevo componente para que sea visieble con oultlet desde app.jsx
import useAuth from "../hooks/useAuth";//para proteger nuestras paginas utilizamos nuestrio custom hook

import Header from '../components/Header';
import Footer from '../components/Footer';


const RutaProtegida = () => {

    //llamamos a la funcion de nustro hook para utilizar las variables de autenticacion globales
    const { auth, cargando } = useAuth();
   
    // console.log(useAuth());
    console.log(auth?._id);
    console.log(cargando);
  
    const compruebaCarga=()=>{
        if (auth?._id==='undefined' && cargando){
            return 'cargando....';
        }else{
            return auth?._id
        }
       

    }
   
    console.log(compruebaCarga());
   

    return (
        <>

            <Header />
            {//protegemos nuestro outlet para que solo se ingrese cuando se haya iniciado sesion y detecte nuestro id en caso contrario nos redirige a la pagina del login
                // auth?._id=>Optional Chaining => la interrogacion al lado de la  auth? accede a la propiedad de un objeto o funcion, si la propiedad o funcion, es undenifinied o nula , la epresion cortosicuita y se evelua como undefinied ante de arrojar un error.
                compruebaCarga()? (<main className="container mx-auto mt-109">
                    <Outlet /></main>) : <Navigate to="/" />
                //auth?._id? <Outlet /> : <Navigate to="/" />
              
            }
            <Footer />

        </>

    )
}

export default RutaProtegida