import React from 'react'
import { useState, useEffect } from 'react'
const showMeowToast = () => {
    const audio = new Audio('/github_sound.mp3');
    audio.play();
};

const Navbar = () => {
    const [stars, setStars] = useState(null);
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

        fetchStars();
    }, []);

    return (<>
        <nav className='bg-slate-800 fixed top-0 w-full z-100 '>
            <div className="mycontainer flex md:justify-around justify-between items-center px-4 h-14 py-5 text-white lg:gap-100 ">
                <div className="logo font-bold text-2xl flex items-center justify-center">
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
                </div>
                <div className='flex items-center justify-center gap-1'>
                    <lord-icon className='sm:h-10 h-8 '
                        src="https://cdn.lordicon.com/egdmrpms.json"
                        trigger="hover"
                        colors="primary:#000000,secondary:#ffffff,tertiary:#30e849"
                        onClick={showMeowToast}>
                    </lord-icon>
                    <a href="https://github.com/Shazia-Zameer-999/PassOP-Password-Manager" target="_blank" rel="noopener noreferrer">
                        <div className="Github flex gap-2 items-center justify-center bg-green-600 text-white rounded-full px-2 cursor-pointer ring-white ring-1">
                            <button className='cursor-pointer'>
                                <img className='invert sm:w-6 w-4 sm:m-1 my-2' src="/icons/github.svg" alt="" />
                            </button>
                            <span className='font-bold sm:text-lg text-sm'>
                                GitHub {stars !== null && `| ${stars} ★`}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </nav></>
    )
}

export default Navbar
