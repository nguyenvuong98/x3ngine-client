import { ajaxPost, LOGOUT_PATH } from "@/lib/ajax"

export const logOut = () => {
    return ajaxPost(LOGOUT_PATH, {})
}