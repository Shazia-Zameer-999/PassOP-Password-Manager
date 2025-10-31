import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';

const Signup = () => {
    const [form, setform] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);




    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const generatePassword = () => {
        const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
        const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
        const allChars = lowerCaseChars + upperCaseChars + numbers + symbols;
        const passwordLength = 14;
        let password = "";
        password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
        password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        for (let i = 4; i < passwordLength; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');
        setform({ ...form, password: shuffledPassword });
        toast.success('New password generated!', {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.VITE_API_BASE}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Account created successfully! Please log in.");
                navigate("/login");
            } else {
                toast.error(data.message || "Failed to create account.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("An error occurred. Please try again.");
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
        <div className="min-h-screen w-full bg-green-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <h1 className='sm:text-4xl text-3xl font-bold'><span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span></h1>
                    <p className='text-green-900 mt-2'>Create your secure account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input
                            value={form.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-2 border border-green-300 rounded-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                            <button
                                type="button"
                                className="cursor-pointer absolute right-13 top-2"
                            >
                                <lord-icon onClick={generatePassword} className='w-[19px] absolute  '
                                    src="https://cdn.lordicon.com/bmyuzxjd.json"
                                    trigger="hover"
                                >
                                </lord-icon>
                            </button>
                            <span className="cursor-pointer absolute right-2 top-[13px]" onClick={showPassword}>
                                <img className='w-5' src={isPasswordVisible ? "/icons/eyecross.png" : "/icons/eye.png"} alt="Show/Hide Password" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='w-full flex justify-center items-center bg-green-500 rounded-full py-2 px-4 text-center hover:bg-green-600 gap-2 font-bold text-white transition-all'>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-green-600 hover:underline font-bold">Login</Link></p>
                </div>
            </div>
        </div>
    </>
    );
};

export default Signup;