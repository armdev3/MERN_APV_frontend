
//creamos toda la estructura que basica con el comando rafc

//importamos layout outlet
import { Outlet} from 'react-router-dom';//lo utilizamo para poder visualizar los componentes de paginas


export const AuthLayout = () => {
  return (
    <>
    <main class="container mx-auto md:grid md:grid-cols-2 mt-2 gap-10 p-5 items-center">
        <Outlet/>
    </main>
  
    </>
  )
}

export default AuthLayout;
