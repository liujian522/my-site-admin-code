import request from '@/utils/request'

export async function getMessage(page = 1, limit = 10, keyword = '') {
    return await request.get("/api/message", 'get', {
        params: {
            page,
            limit,
            keyword,
        }
    });
}

export function delMessage(id) {
    return request.delete(`/api/message/${id}`)
}