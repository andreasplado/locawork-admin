export default function authHeader() {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return { Authorization: '' };
    }
}