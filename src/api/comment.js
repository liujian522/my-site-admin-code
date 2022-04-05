import request from '@/utils/request'

// 分页获取评论
/**
 * 
 * @param {*} page 页码
 * @param {*} limit 页容量
 * @param {*} blogid 文章id
 * @param {*} keyword 
 * @returns 
 */
export function getComment(page = 1, limit = 10, blogid = -1, keyword = '') {
    return request({
        url: '/api/comment',
        method: 'get',
        params: { page, limit, blogid, keyword }
    })
}

//删除一条评论
export function delComment(id) {
    return request.delete(`/api/comment/${id}`)
}