import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center error-container">
            <Card className="error-card">
                <h1 className="p-text-center">404</h1>
                <h2 className="p-text-center">Page Not Found</h2>
                <p className="p-text-center">The page you are looking for does not exist.</p>
                <div className="p-d-flex p-jc-center">
                    <Button label="Go to Home" icon="pi pi-home" onClick={goHome} />
                </div>
            </Card>
        </div>
    );
};

export default ErrorPage;
