import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';


const Navbar = () => {
    const [stars, setStars] = useState(null);
    const [username, setUsername] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('avatar', file);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:3000/api/user/avatar", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json()
            if (res.ok) {
                setAvatarUrl(data.avatarUrl);
                toast.success('Avatar updated!', {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                toast.error(data.message || "Upload failed");
            }

        } catch (error) {
            toast.error("An error occurred during upload", error)
        }


    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);


    }, [dropdownRef])



    useEffect(() => {
        const fetchStars = async () => {
            try {
                const res = await fetch("https://api.github.com/repos/Shazia-Zameer-999/PassOP-Password-Manager");
                const data = await res.json();
                console.log(data)
                setStars(data.stargazers_count);
            } catch (error) {
                console.error("Failed to fetch GitHub stars:", error);
            }
        };
        const fetchUsername = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await fetch("http://localhost:3000/api/user/me", {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setUsername(data.username);
                        setAvatarUrl(data.avatarUrl || '');
                    }
                } catch (error) {
                    console.error("Failed to fetch username", error);
                }
            }
        }


        fetchStars();
        fetchUsername();
    }, []);

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
        <nav className='bg-slate-800 fixed top-0 w-full z-100 '>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg"
            />

            <div className="mycontainer flex md:justify-around justify-between items-center px-4 h-14 py-5 text-white lg:gap-100 ">
                {isAboutModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
                        <div className="bg-slate-800 text-white p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700 mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className='logo font-bold text-3xl flex items-center'>
                                    <span className="text-green-500 ">&lt;</span>
                                    <span className=''>Pass</span>
                                    <span className="text-green-500  ">OP/ &gt;</span>
                                </div>
                                <button onClick={() => setIsAboutModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <p className="text-gray-300 mb-6">
                                PassOP is a secure, full-stack password management application designed to provide a seamless and safe experience for managing your digital credentials.
                            </p>

                            <div className="bg-slate-700/50 p-4 rounded-lg">
                                <p className="text-sm text-gray-400">Crafted with ❤️ by</p>
                                <p className="font-bold text-lg text-green-400">Shazia Zameer</p>
                            </div>

                            <div className="text-center mt-8">
                                <a
                                    href="https://your-future-portfolio-link.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-500 transition-colors"
                                >
                                    Explore My Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={() => setIsAboutModalOpen(true)} className="logo font-bold text-2xl flex items-center justify-center cursor-pointer">
                    <div className='logo font-bold  md:text-2xl text-xl '>
                        <span className="text-green-500 ">&lt;</span>
                        <span className=''>
                            Pass
                        </span>
                        <span className="text-green-500  ">OP/ &gt;</span>
                    </div>

                    <lord-icon className='sm:h-7 h-6'
                        src="https://cdn.lordicon.com/drdlomqk.json"
                        trigger="hover"
                        colors="primary:#30e849,secondary:#ffffff,tertiary:#0a5c15"
                    >
                    </lord-icon>
                </button>

                <div className='flex items-center justify-center gap-4'>
                    <a href="https://github.com/Shazia-Zameer-999/PassOP-Password-Manager" target="_blank" rel="noopener noreferrer">
                        <div className="Github flex gap-2 items-center justify-center bg-green-600 text-white rounded-full px-2 py-1 cursor-pointer ring-white ring-1">
                            <img className='invert w-5' src="/icons/github.svg" alt="GitHub" />
                            <span className='font-bold text-sm'>
                                GitHub {stars !== null && `| ${stars} ★`}
                            </span>
                        </div>
                    </a>
                    {username && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="sm:w-9 sm:h-9 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-md
                                transition-all duration-300 ease-in-out
                                hover:scale-110 hover:shadow-lg hover:shadow-green-500/50
                                focus:outline-none focus:ring-2 focus:ring-offset-2                      focus:ring-green-400 focus:ring-offset-slate-800 cursor-pointer                           overflow-hidden">
                                {avatarUrl ? (
                                    <img src={`http://localhost:3000${avatarUrl}`} alt="User Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{username.charAt(0).toUpperCase()}</span>
                                )}
                            </button>


                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-slate-700 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-3 border-b border-slate-600">
                                        <p className="text-sm text-gray-400">Signed in as</p>
                                        <p className="font-medium text-green-400 truncate">{username}</p>
                                    </div>

                                    <button onClick={handleAvatarClick} className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-slate-600 transition-colors">
                                        Choose Avatar
                                    </button>

                                    <Link to="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-600 transition-colors">
                                        Manage Profile
                                    </Link>
                                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-slate-600 transition-colors">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </nav></>
    )
}

export default Navbar
