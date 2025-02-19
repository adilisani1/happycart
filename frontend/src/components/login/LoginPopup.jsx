import React, { useContext, useEffect, useState } from "react";
import "./loginPopup.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login");

    const { url, setToken } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [passwordError, setPasswordError] = useState("");

    const isValidPassword = (password) => {
        const passwordRegex = /^[A-Z][A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setData((data) => ({
            ...data,
            [name]: value,
        }));

        if (name === "password") {
            if (!isValidPassword(value)) {
                setPasswordError("Password must start with a capital letter & include at least 1 special character.");
            } else {
                setPasswordError("");
            }
        }
    };



    const onLogin = async (e) => {
        e.preventDefault();

        if (!isValidPassword(data.password)) {
            toast.error("Password must start with a capital letter and include at least one special character.");
            return;
        }

        const endpoint =
            currentState === "Login" ? "/api/user/login" : "/api/user/register";
        const newUrl = `${url}${endpoint}`;

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                if (currentState === "Sign up") {
                    toast.success("Registration successful! Please log in.");
                    setTimeout(() => setCurrentState("Login"), 100);
                } else {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login successful!");
                    setShowLogin(false);
                }
            } else {
                toast.error(response.data.message || "Action failed!");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };


    return (
        <div className="login-popup pt-20 ">
            <form className="login-popup-container bg-black-gradient border shadow-2xl" onSubmit={onLogin} >
                <div className=" flex items-center justify-between mb-2 mt-2">
                    <h2 className="login-popup-title">{currentState}</h2>

                    <GrClose
                        className="cursor-pointer"
                        onClick={() => setShowLogin(false)}
                    />
                </div>

                <div className="login-popup-inputs">

                    {currentState === "Sign up" && (
                        <input
                            className="input-name border mb-2 mt-2 md:text-lg text-[14px] border-gray-300 py-2.5 px-3 rounded-md w-full"
                            type="text"
                            placeholder="Username"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                        />
                    )}

                    <input
                        className="input-name border mb-2 mt-2  md:text-lg text-[14px] border-gray-300 py-2.5 px-3 rounded-md w-full"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                    />
                    <input
                        className="input-name border mb-2 mt-2  md:text-lg text-[14px] border-gray-300 py-2.5 px-3 rounded-md w-full"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                    />

                    {currentState === "Sign up" && (
                        <p className="text-price-color opacity-55 text-xs mt-1">
                            Must start with a capital & include 1 special character.
                        </p>

                    )}
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}

                </div>
                <button
                    className="w-full mb-4 mt-2 md:text-lg text-sm bg-blue-gradient hover:bg-light-gradient text-white py-2.5 rounded-md"
                    type="submit"
                >
                    {currentState === "Sign up" ? "Create account" : "Login"}
                </button>

                {currentState === "Login" ? (
                    <p className="text-gray-500 font-normal md:text-lg text-[14px]">
                        Create a new account?{" "}
                        <span
                            className="cursor-pointer font-semibold  text-bg-blue-gradient "
                            onClick={() => setCurrentState("Sign up")}
                        >
                            Sign up
                        </span>
                    </p>
                ) : (
                    <p className="text-gray-500 font-normal  md:text-lg text-[14px]">
                        Already have an account?{" "}
                        <span
                                className="cursor-pointer font-semibold"
                            onClick={() => setCurrentState("Login")}
                        >
                            Login
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
