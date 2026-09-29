import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout() {
    return (
        <div className="min-h-screen bg-slate-900 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;