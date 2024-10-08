import { baseUrl, REGISTER_PATH } from "@/lib/ajax"
import axios from "axios"

export const register = async (body: any) => {
    const response = await axios.post(`${baseUrl}${REGISTER_PATH}`, body)
                                    .then(res => res.data)
                                    .catch(err => {
                                        let message = err?.response?.data?.message

                                        if (typeof message === 'object') {
                                            message = message.join()
                                        }

                                        return {message}
                                    })
    
    return response
}