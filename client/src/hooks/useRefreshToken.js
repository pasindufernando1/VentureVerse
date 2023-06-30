import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    return async () => {
        console.log("Refresh Token Used");
        const response = await axios.get('/auth/refresh-token', {
            withCredentials: true
        });
        setAuth(response?.data);
        return response.data.accessToken;
    };
};

export default useRefreshToken;
