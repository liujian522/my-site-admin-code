import request from '@/utils/request'

// 分页获取文章
export function findBlog(page = 1, limit = 5) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: { page: page, limit: limit }
    })
}

//获取一个文章
export function getBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get',
    })
}


// 发布一编文章
export function postBlog(data) {
    // body是data
    return request({
        url: '/api/blog',
        method: 'post',
        data,
    })
}

// 修改一编文章
export function putBlog(id, data) {
    // body是data
    return request({
        url: `/api/blog/${id}`,
        method: 'put',
        data,
    })
}

// 删除一编文章
export function delBlog(id) {
    // body是data
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}








// //查找某一个文章分类
// export function findBlogType(id) {
//     return request.get(`/api/blogtype/${id}`)
// }

//添加文章分类
export function setBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data,
    })
}

//修改文章分类
export function editBlogType(editInof) {
    return request({
        url: `/api/blogtype/${editInof.id}`,
        method: 'put',
        data: editInof.data,
    })
}

//删除文章分类
export function delBlogType(id) {
    return request.delete(`/api/blogtype/${id}`)
}

//获取文章分类
export function getBlogType() {
    return request.get(`/api/blogtype`)
}