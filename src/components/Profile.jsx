import React, { useState, useEffect } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Link } from 'react-router-dom'

const Profile = () => {

    const [currentUser, setCurrentUser] = useState({ username: '' })
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [verificationPassword, setVerificationPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const [form, setForm] = useState({ newUsername: '', newPassword: '' })
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                console.log(data)
                if (res.ok) {
                    setCurrentUser(data);
                    setForm({ newUsername: data.username, newPassword: '' });
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        fetchUserData();
    }, []);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }
    const handleCancel = () => {
        setForm({ newUsername: currentUser.username, newPassword: '' })
        setIsEditing(false);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    newUsername: form.newUsername,
                    ...(form.newPassword ? { newPassword: form.newPassword } : {})
                })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Profile updated successfully")
                setCurrentUser({ username: form.newUsername });
                setIsEditing(false);
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error("An error occured.", error)
        };

    }
    const handleVerifyPassword = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/verify-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword: verificationPassword })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                toast.success("Verification successful!");
                setIsEditing(true);
                setIsVerificationModalOpen(false);
                setVerificationPassword("");
            } else {
                toast.error(data.message || "Incorrect password.")
            }
        } catch (error) {
            toast.error("An error occurred during verification.", error)
        }
    }



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
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-900">Your Profile</h1>
                    <p className="text-gray-500 mt-2">View and edit your account details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="newUsername" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input
                            type="text"
                            name="newUsername"
                            value={form.newUsername}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-2 border border-green-300 rounded-full mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="text-sm font-bold text-gray-600 block">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder={isEditing ? "Leave blank to keep current" : "••••••••"}
                            disabled={!isEditing}
                            className="w-full p-2 border border-green-300 rounded-full mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        {isEditing ? (
                            <>
                                <button type="submit" className='w-full flex justify-center items-center bg-green-500 rounded-full py-2 px-4 text-center hover:bg-green-600 font-bold text-white'>
                                    Save Changes
                                </button>
                                <button type="button" onClick={handleCancel} className='w-full flex justify-center items-center bg-gray-500 rounded-full py-2 px-4 text-center hover:bg-gray-600 font-bold text-white'>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsVerificationModalOpen(true)} className='w-full flex justify-center items-center bg-blue-500 rounded-full py-2 px-4 text-center hover:bg-blue-600 font-bold text-white'>
                                Edit Profile
                            </button>
                        )}
                    </div>
                    {isVerificationModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Your Identity</h2>
                                <p className="text-gray-600 mb-6">Please enter your current password to continue.</p>
                                <div className='flex relative'>
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        value={verificationPassword}
                                        onChange={(e) => setVerificationPassword(e.target.value)}
                                        className="w-full p-2 border border-green-300 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400 "
                                        placeholder="Current Password"
                                    />
                                    <span className="cursor-pointer absolute right-5 top-[10px]  " onClick={showPassword}>
                                        <img className='w-5' src={isPasswordVisible ? "/icons/eyecross.png" : "/icons/eye.png"} alt="Show/Hide Password" />
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={handleVerifyPassword} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600">
                                        Verify
                                    </button>
                                    <button onClick={() => setIsVerificationModalOpen(false)} className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <div className="text-center mt-4">
                    <Link to="/" className="text-sm text-green-600 hover:underline">← Back to Password Manager</Link>
                </div>
            </div>
        </div>
    </>
    )
}

export default Profile
