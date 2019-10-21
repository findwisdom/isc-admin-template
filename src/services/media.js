import service from './axios';
// TODO: service
const url = '/api/operation/media';

/**
 * 获取大事记列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */
export async function getEventList(pageSize, pageNumber, name) {
    const res = await service({
        url: url,
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/**
 * 删除大事记
 * @param id
 * @returns {Promise<null|any>}
 */
export async function removeEvent(id) {
    const res = await service({
        url: `${url}/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 编辑大事记
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createUpdateEvent(form) {
    const res = await service({
        url: `${url}/createUpdate`,
        method: 'post',
        data: form
    });
    return res.data;
}
