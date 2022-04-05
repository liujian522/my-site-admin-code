import request from '@/utils/request'
// 设置关于我页面
export function putAdmin(data) {
    return request({
        url: '/api/admin',
        method: 'put',
        data,
    })
}