export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const setUserSession = (token) => {
    localStorage.setItem('accessToken', token);
    //sessionStorage.setItem('user', user);
}

export const removeUserSession = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
}

export const BASE_URL="http://localhost:5000";