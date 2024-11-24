import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import ZangiefSpin from './images/zangief-spinning.gif';
import './Styles/AddMatch.css';

const LoginPage = () => {
    const { loginWithRedirect, isAuthenticated, user, isLoading, error, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const createOrUpdateUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const token = await getAccessTokenSilently({
                        audience: 'https://dev-75ytwc3q1ajy1ls4.us.auth0.com/api/v2/',
                        scope: 'openid profile email'
                    });
                    const response = await fetch('http://localhost:8080/api/user', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        navigate('/home');
                    } else {
                        console.error('Failed to create/update user');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        createOrUpdateUser();
    }, [isAuthenticated, user, navigate, getAccessTokenSilently]);

    if (isLoading) {
        return <div><h1 className="page-title">Redirecting...</h1><img style={{ width: '600px', height: '600px', alignItems: 'center' }} src={ZangiefSpin} alt="Zangief Spin" /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h1 className="homeTitle">Login Page</h1>
                <button onClick={() => loginWithRedirect()}>Sign in with Google</button>
            </div>
        );
    }

    return <div><h1 className="page-title">Redirecting...</h1><img style={{ width: '600px', height: '600px', alignItems: 'center' }} src={ZangiefSpin} alt="Zangief Spin" /></div>;
};

export default LoginPage;
