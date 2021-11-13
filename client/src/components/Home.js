import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { useAuthContext } from '../contenxt/AuthContext';

const Home = () => {
    const history = useHistory();
    const [, removeCookie] = useCookies();
    const { user, setUser } = useAuthContext();
    const handleLogout = async () => {
        removeCookie('access_token')
        setUser('');
        history.push('/signin')
    }
    return (
        <div>
            <h1>Welcome to Home Page {user ? user.username : 'none' } さん</h1>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    )
}

export default Home;