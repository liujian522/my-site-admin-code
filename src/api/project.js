import request from '@/utils/request'
//获得所有项目
export function getProject() {
    return request.get('/api/project');
};
//修改
export function putProject(id, data) {
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        data,
    });
};

//新增项目
export function postProject(data) {
    return request.post('/api/project', data);
};

//删除项目
export function delProject(id) {
    return request.delete(`/api/project/${id}`);
};