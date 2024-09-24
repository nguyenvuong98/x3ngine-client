import { baseUrl, LOGIN_PATH } from '@/lib/ajax';
import axios from 'axios';

export const login = async (body: any) => {
    const loginData = await axios.post(`${baseUrl}${LOGIN_PATH}`, body)
                                    .then(res => res.data)
                                    .catch(err => err)
    
    return loginData
}

