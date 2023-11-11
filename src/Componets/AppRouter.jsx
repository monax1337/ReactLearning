import React, { useContext } from "react";
import MyError from "../Pages/MyError";
import MyPosts from "../Pages/MyPosts";
import MyAbout from "../Pages/MyAbout";
import { Route, Routes } from "react-router-dom";
import MyPageId from "../Pages/MyPageId";
import MyLogin from "../Pages/MyLogin";
import { AuthContext } from "../Contexts";

const AppRouter = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    return (
        isAuth
        ?
        <Routes>
            <Route path="/about" element={<MyAbout />} />
            <Route path="/posts" element={<MyPosts />} />
            <Route path="/posts/:id" element={<MyPageId />} />
            <Route path="*" element={<MyPosts />} />
            <Route path="/login" element={<MyLogin />} />
        </Routes>
        :
        <Routes>
            <Route path="*" element={<MyLogin />} />
        </Routes>
    )
};

export default AppRouter