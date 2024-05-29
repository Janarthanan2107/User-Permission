import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Root = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => { navigate('/blog'); }
        },
        {
            label: 'User Table',
            icon: 'pi pi-users',
            command: () => { navigate('/blog/userTable'); }
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout
        }
    ];

    return (
        <div>
            <Menubar model={items} />
            <div className="p-m-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
