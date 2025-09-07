import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const getPasswords = async () => {
        const token = localStorage.getItem("token");
        let req = await fetch("http://localhost:3000/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let passwords = await req.json()
        if (passwords) {
            console.log(passwords)
            setpasswordArray(passwords)
        }
    }

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getPasswords();
        } else {
            window.location.href = '/login';
        }
    }, [])

    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/login';
    };
    const deletePassword = async (id) => {
        let userChoice = window.confirm("Are you sure you want to delete?");
        if (userChoice) {
            const newPasswordArray = (passwordArray.filter(item => item.id !== id))
            setpasswordArray(newPasswordArray)
            const token = localStorage.getItem("token");
            await fetch("http://localhost:3000", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id })
            });


            toast.success('Password deleted Successfully !', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
        }


    }
    const handleEdit = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setform(passwordToEdit);
        }
    };
    const handleUpdate = async () => {
        const idToUpdate = form.id;
        const url = `http://localhost:3000/${idToUpdate}`;
        const token = localStorage.getItem("token");
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        setpasswordArray(passwordArray.map(p => p.id === idToUpdate ? form : p));
        setform({ site: "", username: "", password: "", id: null });
        toast.success("Password updated successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    const savePassword = async () => {
        if (form.site.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
            alert("Please fill all the details")
        } else {
            const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            setpasswordArray(newPasswordArray);

            const token = localStorage.getItem("token");
            await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...form, id: uuidv4() })
            });

            setform({ site: "", username: "", password: "" });
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });


        }



    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });

    }

    return (
        <>
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

            <div className="min-h-screen w-full bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,2_38,.5)_100%)] md:mycontainer  pt-5 sm:pt-15">

                <div className="mb-20 mt-15 px-2 md:px-0 m-2 md:m-0 lg:mt-15 md:w-3/5  md:mx-auto transition-all">
                    <h1 className='sm:text-4xl text-3xl font-bold text-center transition-all'><span className="text-green-500">&lt;</span>
                        <span>
                            Pass
                        </span>
                        <span className="text-green-500">OP/ &gt;</span></h1>

                    <p className='text-green-900 sm:text-lg text-sm text-center transition-all'>Your own Password Manager</p>
                    <button onClick={handleLogout} className="text-white bg-green-500 rounded-md px-2 mt-6 mx-4 md:py-1 py-[2px] md:text-lg text-[16px]">Logout</button>

                    {/*  form section */}
                    <div className="flex flex-col p-4 md:gap-8 gap-4 text-black items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='text-[11px]  sm:text-sm rounded-full bg-white border border-green-500 w-full p-4 py-1 transition-all' type="text" name="site" id="site" />
                        <div className="flex lg:flex-row flex-col lg:gap-8 w-full gap-4 ">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username ' className='text-[11px] sm:text-sm  rounded-full bg-white border border-green-500 lg:w-2/3  p-4 py-1 transition-all' name="username" id="username" type="text" />
                            <div className="relative flex justify-center items-center gap-3.5 lg:w-1/3 ">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='text-[11px] sm:text-sm  rounded-full bg-white border border-green-500 w-full p-4 py-1' type={isPasswordVisible ? "text" : "password"} name="password" id="password" />
                                <button
                                    type="button"
                                    className="absolute right-[35px] top-[4px] cursor-pointer"

                                >
                                    <lord-icon onClick={generatePassword} className='sm:w-5 w-3 relative bottom-1 '
                                        src="https://cdn.lordicon.com/bmyuzxjd.json"
                                        trigger="hover"
                                    >
                                    </lord-icon>
                                </button>

                                <span className="absolute right-0 " onClick={showPassword}>
                                    <img className='sm:w-5 w-3 cursor-pointer m-2' src={isPasswordVisible ? "/icons/eyecross.png" : "/icons/eye.png"} alt="Show/Hide Password" />
                                </span>
                            </div>
                        </div>
                        <button onClick={form.id ? handleUpdate : savePassword} className='flex justify-center items-center bg-green-400 rounded-full w-fit md:p-2 md:px-10 md:py-1.5 px-4 p-[2px] text-center hover:bg-green-600 gap-2 border hover:border-green-400 text-bold sm:text-sm transition-all font-bold'>
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                            >
                            </lord-icon>
                            Save</button>
                    </div>

                    {/* passwords section */}
                    <div className="passwords">
                        <h2 className='font-bold md:text-xl py-4 text-lg'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length !== 0 &&
                            <div className="sm:max-h-[37vh] max-h-[47vh] overflow-y-auto rounded-md custom-scrollbar">
                                <table className="table-auto w-full">
                                    <thead className='bg-green-800 text-white sticky top-0 z-10'>
                                        <tr>
                                            <th className='py-2 sm:text-[17px] text-[11px]'>Site</th>
                                            <th className='py-2 sm:text-[17px] text-[11px]'>Username</th>
                                            <th className='py-2 sm:text-[17px] text-[11px]'>Password</th>
                                            <th className='py-2 sm:text-[17px] text-[11px] px-1'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArray.map((item) => {
                                            return (
                                                <tr key={item.id} >
                                                    <td className='py-2 border border-white text-center p-2 w-3/7 md:text-[17px] text-[12px]'>
                                                        <div className="info flex justify-between items-center break-all text-start">
                                                            <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                            <lord-icon
                                                                onClick={() => copyText(item.site)}
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 h-6 ml-2 w-4"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center p-2 w-2/7 md:text-[17px] text-[12px]'>
                                                        <div className="info flex justify-between items-center break-all text-start">
                                                            <span>{item.username}</span>
                                                            <lord-icon
                                                                onClick={() => copyText(item.username)}
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 w-4 h-6 ml-2"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center p-2 w-2/7 md:text-[17px] text-[12px] h-13 align-middle '>
                                                        <div className="info flex justify-between items-center break-all text-start">
                                                            <span className='cursor-pointer' onMouseEnter={() => setHoveredRowId(item.id)}
                                                                onMouseLeave={() => setHoveredRowId(null)}>
                                                                {hoveredRowId === item.id ? (
                                                                    <span>{item.password}</span>
                                                                ) : (
                                                                    <span className="text-2xl">{item.password && "*".repeat(item.password.length)}</span>
                                                                )}
                                                            </span>

                                                            <lord-icon
                                                                onClick={() => copyText(item.password)}
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 w-4 h-6 ml-2"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center md:w-0.5/7  md:p-2 p-1 md:text-[17px] text-[12px]'>
                                                        <div className="info flex  md:gap-4 gap-2 justify-end">
                                                            <lord-icon onClick={() => { handleEdit(item.id) }} className="md:h-6 h-5  cursor-pointer"
                                                                src="https://cdn.lordicon.com/vwzukuhn.json"
                                                                trigger="hover"
                                                                stroke="light"
                                                            >
                                                            </lord-icon>
                                                            <lord-icon onClick={() => { deletePassword(item.id) }} className="md:h-7 h-4 md:w-5 w-4 cursor-pointer"
                                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                                trigger="hover"
                                                                colors="primary:#000000"
                                                            >

                                                            </lord-icon>

                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default Manager


