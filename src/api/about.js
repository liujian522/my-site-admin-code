import request from '@/utils/request'
// 设置关于我页面
export function postAbout(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data,
    })
}

// 设置关于我页面
export function getAbout() {
    return request({
        url: '/api/about',
        method: 'get',
    })
}