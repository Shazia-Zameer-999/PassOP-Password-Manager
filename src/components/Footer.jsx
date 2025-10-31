import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [appStatus, setAppStatus] = useState({ version: '', status: 'connecting' });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/status`);
                if (res.ok) {
                    const data = await res.json();
                    setAppStatus({ version: data.version, status: 'online' });
                } else {
                    setAppStatus(prev => ({ ...prev, status: 'offline' }));
                }
            } catch (error) {
                console.error("Failed to fetch app status:", error);
                setAppStatus(prev => ({ ...prev, status: 'offline' }));
            }
        };
        fetchStatus();
    }, []);

    return (
        <footer className='bg-slate-800 text-gray-400 w-full'>
            <div className="mycontainer max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Column 1: About Section */}
                    <div className="space-y-4">
                        <Link to="/" className='logo font-bold text-2xl flex items-center text-white'>
                            <span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span>
                        </Link>
                        <p className="text-sm">Your personal, secure password manager. Built with modern web technologies to keep your digital life safe.</p>
                        {/* Social Media Links */}
                        <div className="flex space-x-4 pt-2">
                            <a href="https://github.com/Shazia-Zameer-999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/daten-diva-903014332/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.12-.02-2.57-1.57-2.57-1.57 0-1.81 1.22-1.81 2.48V19h-3v-9h2.87v1.31h.04c.4-.76 1.38-1.56 2.83-1.56 3.03 0 3.59 1.99 3.59 4.58V19z" /></svg>
                            </a>
                            {/* Add LinkedIn, etc. here */}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-white text-lg">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/profile" className="hover:text-green-400 transition-colors">My Profile</Link></li>
                            <li><a href="https://portfolio-dd-ebon.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">Creator's Portfolio</a></li>
                        </ul>
                    </div>

                    {/* Column 3: App Status */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-white text-lg">Application Status</h3>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${appStatus.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="capitalize">
                                {appStatus.status}
                            </span>
                            {appStatus.status === 'online' && <span>(v{appStatus.version})</span>}
                        </div>
                        <p className="text-xs text-gray-500">Live status fetched from the backend.</p>
                    </div>
                </div>

                <div className="text-center mt-12 border-t border-slate-700 pt-8">
                    <p>Copyright © {new Date().getFullYear()} Daten Diva. All Rights Reserved.</p>
                </div>


            </div>

        </footer>
    );
};

export default Footer;




