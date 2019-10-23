import service from './axios';
// TODO: service
const url = '/api/user';

/**
 * 获取大事记列表数据
 * @param pageSize
 * @param pageNumber
 * @param date
 * @returns {Promise<void>}
 */
export async function getEventList(pageSize, pageNumber, date) {
    const res = await service({
        url: `${url}/getMemorabiliaList`,
        params: {
            pageSize,
            pageNumber,
            date
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
        url: `${url}/deleteMemorabilia/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 新增大事记
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createEvent(form) {
    const res = await service({
        url: `${url}/addMemorabilia`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑大事记
 * @param form
 * @returns {Promise<null|any>}
 */
export async function updateEvent(form) {
    const res = await service({
        url: `${url}/updateMemorabilia`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 获取新闻列表列表数据
 * @param pageSize
 * @param pageNumber
 * @param publishTime
 * @returns {Promise<void>}
 */
export async function getNewsList(pageSize, pageNumber, publishTime) {
    const res = await service({
        url: `${url}/getReportList`,
        params: {
            pageSize,
            pageNumber,
            publishTime
        }
    });
    return res.data;
}

/**
 * 删除新闻报道
 * @param id
 * @returns {Promise<null|any>}
 */
export async function removeNews(id) {
    const res = await service({
        url: `${url}/deleteReport/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 获取新闻详情数据
 * @param id
 * @returns {Promise<void>}
 */
export async function getNewsContent(id) {
    const res = await service({
        url: `${url}/getReportById/${id}`
    });
    return res.data;
}

/**
 * 新增媒体报道
 * @param form
 * @returns {Promise<void>}
 */
export async function createNews(form) {
    const res = await service({
        url: `${url}/addReport`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑媒体报道
 * @param form
 * @returns {Promise<void>}
 */
export async function updateNews(form) {
    const res = await service({
        url: `${url}/updateReport`,
        method: 'post',
        data: form
    });
    return res.data;
}
