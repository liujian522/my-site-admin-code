export function getToken() {
    return localStorage.getItem('adminToken')
}

export function setToken(token) {
    localStorage.setItem('adminToken', token)
}

export function removeToken() {
    localStorage.removeItem('adminToken')
}