import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import '../assets/css/login.css';
import logo from '../assets/img/logo_pops_2024.webp';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login, user, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/inicio');
    }, [isAuthenticated]);

    const onSubmit = async (values) => {
        await login(values);
    };

    return (
        <div className="container">
        <div className="form-container">
            <div className="header">
                <h1 className="mb-6 text-3xl font-medium">Bienvenido</h1>
            </div>
            <form className="space-y-4" id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col text-left">
                        <label htmlFor="ident" className="mb-1 text-lg font-semibold">Identificación</label>
                        <input
                            type="text"
                            id="ident"
                            placeholder="Identificación"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            {...register('ident',{required:true})}
                        />
                        {
                            errors.ident && (<p className="text-red-500">El campo es requerido</p>)
                        }
                    </div>
                    <div className="flex flex-col text-left">
                        <label htmlFor="clave" className="mb-1 text-lg font-semibold">Contraseña</label>
                        <input
                            type="password"
                            id="clave"
                            placeholder="Contraseña"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            {...register('clave',{required:true, minLength:8})}
                        />
                        {
                            errors.clave?.type === 'required' && (
                                <p className="text-red-500">La contraseña es requerida</p>
                            )
                        }
                        {
                            errors.clave?.type === 'minLength' && (
                                <p className="text-red-500">La contraseña debe tener al menos 8 caracteres</p>
                            )
                        }
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-400 text-white rounded-md text-1lg hover:bg-teal-500 transition"
                    >
                        Ingresar
                    </button>
                <div id="notification" className="notification"></div>
            </form>
            <div className="logo">
                <img src={logo} alt="logo POPS" />
            </div>
        </div>
    </div>
    );
}


export default LoginPage