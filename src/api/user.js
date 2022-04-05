import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/admin/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/admin/whoami',
        method: 'get',
    })
}