import React, { useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const clientId = process.env.REACT_APP_CLIENT_ID;

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SignIn = () => {
    const [, setCookie] = useCookies();
    let query = useQuery();
    
    const handleLogin = async () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`
    };

    useEffect(() => {
        if (query.get('code')) {
            fetch(`http://localhost:5000/auth/oauth/callback?code=${query.get('code')}`, {
                method: 'GET',
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => {
                setCookie("access_token", data.accessToken)
                window.location.href = '/'
            })
            .catch(err => {
                window.location.href = '/signin'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>ユーザーログイン</h1>
            <button onClick={handleLogin}>Sign in with Github</button>
        </>
    );
};

export default SignIn;
