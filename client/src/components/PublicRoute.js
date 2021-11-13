import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contenxt/AuthContext';

const PublicRoute = ({ component, exact, path }) => {
    const { user } = useAuthContext();
    return !user ? (
        <Route exact={exact} path={path} component={component} />
    ) : (
        <Redirect to="/" />
    )
}

export default PublicRoute;