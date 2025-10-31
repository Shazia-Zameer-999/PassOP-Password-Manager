import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.VITE_API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Logged in successfully!");
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                toast.error(data.message || "Invalid credentials.");
            }
        } catch (error) {
            toast.error("An error occurred during login.", error);
        }
    };

    return (<>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
        />

        <div className="min-h-screen w-full bg-green-50 flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className='sm:text-4xl text-3xl font-bold'><span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span></h1>
                    <p className='text-green-900 mt-2'>Login to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input
                            value={form.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-2 border border-green-300 rounded-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 "
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-gray-600 block ">Password</label>
                        <div className='flex relative'>

                            <input
                                value={form.password}
                                onChange={handleChange}
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                className="w-full p-2 border border-green-300 rounded-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 "
                                required
                            />
                            <span className="cursor-pointer absolute right-2 top-[13px]" onClick={showPassword}>
                                <img className='w-5' src={isPasswordVisible ? "/icons/eyecross.png" : "/icons/eye.png"} alt="Show/Hide Password" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='w-full flex justify-center items-center bg-green-400 rounded-full py-2 px-4 text-center hover:bg-green-600 gap-2 font-bold text-white'>
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p>Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </div>
    </>
    );
};

export default Login;