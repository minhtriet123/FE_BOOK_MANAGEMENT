export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
}

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const setUserSession = (token) => {
    sessionStorage.setItem('accessToken', token);
    //sessionStorage.setItem('user', user);
}

export const removeUserSession = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
}