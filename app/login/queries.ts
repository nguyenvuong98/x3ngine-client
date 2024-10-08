import { useQuery } from "@tanstack/react-query";
import { login } from "./service";

export const CACHE_KEYS = {
    login: 'x3ngine-login'
}

export const useLogin = (body: any) => {
    return useQuery(
        {
            queryKey: [CACHE_KEYS.login],
            queryFn: () => login(body),
        }
    );
};