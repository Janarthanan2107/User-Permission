import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Login.css'; // Custom CSS file for login styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setSubmitted(true);
        const storedUsers = JSON.parse(localStorage.getItem('users'));

        if (storedUsers) {
            const user = storedUsers.find(user => user.name === username && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the logged-in user
                navigate('/blog');
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('No users found');
        }
    };

    return (
        <div className="flex align-items-center justify-content-center login-container">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                </div>

                <div>
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className={`w-full mb-3 ${submitted && !username ? 'p-invalid' : ''}`} />
                    {submitted && !username && <small className="p-error">Username is required.</small>}

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`w-full mb-3 ${submitted && !password ? 'p-invalid' : ''}`} />
                    {submitted && !password && <small className="p-error">Password is required.</small>}

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleLogin} />
                </div>
            </div>
        </div>
    );
};

export default Login;
