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

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        if (passwords) {
            console.log(passwords)
            setpasswordArray(passwords)
        }
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"

        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"

        }
    }
    const deletePassword = async (id) => {
        let userChoice = window.confirm("Are you sure you want to delete?");
        if (userChoice) {
            const newPasswordArray = (passwordArray.filter(item => item.id !== id))
            setpasswordArray(newPasswordArray)
            let res = await fetch("http://localhost:3000", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id })
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
        // We get the ID directly from the form state that we set in handleEdit.
        const idToUpdate = form.id;

        // Build the correct URL with the real ID
        const url = `http://localhost:3000/${idToUpdate}`;

        // Make the fetch call, sending the CURRENT form data in the body
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            // Send the entire 'form' object, which now contains the user's edits.
            body: JSON.stringify(form)
        });

        // After saving, update the password list in your UI to reflect the changes.
        setpasswordArray(passwordArray.map(p => p.id === idToUpdate ? form : p));

        // Clear the form to be ready for the next new entry.
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
            let res = await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
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
                autoClose={5000}
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

                    {/*  form section */}
                    <div className="flex flex-col p-4 md:gap-8 gap-4 text-black items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='text-[11px]  sm:text-sm rounded-full bg-white border border-green-500 w-full p-4 py-1 transition-all' type="text" name="site" id="site" />
                        <div className="flex md:flex-row flex-col md:gap-8 w-full gap-4 ">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username ' className='text-[11px] sm:text-sm  rounded-full bg-white border border-green-500 md:w-2/3  p-4 py-1 transition-all' name="username" id="username" type="text" />
                            <div className="relative flex justify-center items-center gap-3.5 md:w-1/3 ">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='text-[11px] sm:text-sm  rounded-full bg-white border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                                <span className="absolute right-0 " onClick={showPassword}><img ref={ref} className='m-2 cursor-pointer sm:w-5 w-3' src="/icons/eye.png" alt="" /></span>
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
                            <div className="max-h-[40vh]  overflow-y-auto rounded-md custom-scrollbar">
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
                                                        {/* 1. Add items-center to the flex container */}
                                                        <div className="info flex justify-between items-center break-all text-start">
                                                            <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                            <lord-icon
                                                                onClick={() => copyText(item.site)}
                                                                // 2. Add flex-shrink-0 and use Tailwind classes for size
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 h-6 ml-2 w-4"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center p-2 w-2/7 md:text-[17px] text-[12px]'>
                                                        {/* 1. Add items-center to the flex container */}
                                                        <div className="info flex justify-between items-center break-all text-start">
                                                            <span>{item.username}</span>
                                                            <lord-icon
                                                                onClick={() => copyText(item.username)}
                                                                // 2. Add flex-shrink-0 and use Tailwind classes for size
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 w-4 h-6 ml-2"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center p-2 w-2/7 md:text-[17px] text-[12px] h-13 align-middle '>
                                                        {/* 1. Add items-center to the flex container */}
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
                                                                // 2. Add flex-shrink-0 and use Tailwind classes for size
                                                                className="lordIconCopy cursor-pointer flex-shrink-0 md:w-5 w-4 h-6 ml-2"
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-white text-center md:w-0.5/7  md:p-2 p-1 md:text-[17px] text-[12px]'>
                                                        <div className="info flex  md:gap-4 gap-2 justify-end">
                                                            <lord-icon onClick={() => { handleEdit(item.id) }} className="md:h-7 h-4 md:w-5 w-4 cursor-pointer"
                                                                src="https://cdn.lordicon.com/cbtlerlm.json"
                                                                trigger="hover"
                                                                stroke="light"
                                                                colors="primary:#000000,secondary:#109121,tertiary:#66ee78,quaternary:#d1fad7,quinary:#0a5c15"
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

