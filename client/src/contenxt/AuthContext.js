import { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies, ] = useCookies();
    const value = {
        user,
        loading,
        setUser,
    };
    
    useEffect(() => {
        if (cookies.access_token) {
            fetch('http://localhost:5000/auth/me', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${cookies.access_token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setUser(data.user)
            })
            .catch(err => setUser(''))
        }
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
}