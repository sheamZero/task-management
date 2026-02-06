import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const useAuth = () => {
    const info = useContext(AuthContext);
    return info
};

export default useAuth;