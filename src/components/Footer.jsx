import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer bg-slate-800 text-white p-1 fixed bottom-0 w-full z-200">


                <div className='flex justify-center items-center'>
                    <h3 className='sm:text-xl text-sm font-bold text-center'><span className="text-green-500">&lt;</span>
                        <span>
                            Pass
                        </span>
                        <span className="text-green-500">OP/ &gt;</span></h3>
                        <lord-icon className='h-6'
                        src="https://cdn.lordicon.com/drdlomqk.json"
                        trigger="hover"
                        colors="primary:#30e849,secondary:#ffffff,tertiary:#0a5c15"
                    >
                    </lord-icon>
                </div>
                <div className='flex gap-1 justify-center items-center sm:text-sm text-[12px]'>
                    Created with
                    <lord-icon
                        src="https://cdn.lordicon.com/ewmfucya.json"
                        trigger="hover"
                        stroke="light"
                        colors="primary:#121331,secondary:#66ee78,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00,senary:#ebe6ef"
                    >
                    </lord-icon>By CodeWithShazia
                </div>
                <div className='flex gap-1 items-center justify-center sm:text-sm text-[10px]'>CopyRight <b>&copy;</b> All Rights Reserved </div>
            </div>

        </>
    )
}

export default Footer

