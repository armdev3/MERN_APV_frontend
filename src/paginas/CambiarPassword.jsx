import { useState } from 'react';
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';//importamo nuestro hook para la validacion


const CambiarPassword = () => {

    const {guardarPassword}= useAuth();//pasamos los datos nuestro stata global

    const [alerta,SetAlerta] = useState({});
    const [password, setPassword]= useState({
        //incinamos nuestro state directamente con los name de los inputs de nuestro formulario
        pwd_actual:'',
        pwd_nuevo:''
    });

    //creamos nuestra funcion para recuperar los datos del formulario
    const handleSubmit = async(e) => {
        e.preventDefault();
       if(Object.values(password).some(campo => campo ==='')){//Si hay al menos un cambo vacio devulve true

        SetAlerta({msg:'Todos los campos son obligatorios',error:true})
        return;
    
    }

    if(password.pwd_nuevo.length < 6){
        SetAlerta({msg:'El password debe tener como minimo 6 caraacteres', error:true});
        return;

    }

   //pasamos los password atual y el nuevo passwword
    const respuesta = await guardarPassword(password);

    SetAlerta(respuesta);


    }


   const {msg} = alerta;

    return (

        <>

            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">CambiarPassword</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu{' '}
                <span className="text-indigo-600 font-bold">Password Aquí</span></p>

            {
                //Formulario Password
            }

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
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_actual"
                                placeholder='Escribe tu password Actual'
                                onChange={e =>setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}

                            ></input>

                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">nuevo Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_nuevo"
                                placeholder='Escribe tu nuevo password'
                                onChange={e =>setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}

                            ></input>

                        </div>


                        
                        <input
                            type="submit"
                            value="Actualizar password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />

                    </form>

                </div>

            </div>
        </>

    )
}

export default CambiarPassword