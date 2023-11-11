import React, { useContext } from "react";
import MyInput from "../Componets/UI/inputs/MyInput";
import MyButton from "../Componets/UI/buttons/MyButton";
import { AuthContext } from "../Contexts";

const MyLogin = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
};

export default MyLogin