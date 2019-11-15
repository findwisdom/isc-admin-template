import service from './axios';

const url1 = '/api/memorabilia';
const url2 = '/api/report';

/**
 * 获取大事记列表数据
 * @param pageSize
 * @param pageNumber
 * @param date
 * @returns {Promise<void>}
 */
export async function getEventList(pageSize, pageNumber, date) {
    const res = await service({
        url: `${url1}/getMemorabiliaList`,
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
export async function removeEvent(memorabilia) {
    const res = await service({
        url: `${url1}/deleteMemorabilia`,
        method: 'delete',
        params: {
            memorabilia
        }
    });

    return res.data;
}

/**
 * 新增大事记
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createEvent(form) {
    const res = await service({
        url: `${url1}/addMemorabilia`,
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
        url: `${url1}/updateMemorabilia`,
        method: 'put',
        data: form
    });
    return res.data;
}

/**
 * 获取all新闻列表列表数据
 * @param pageSize
 * @param pageNumber
 * @param title
 * @returns {Promise<void>}
 */
export async function getNewsList(pageSize, pageNumber, title) {
    const res = await service({
        url: `${url2}/getReportList`,
        params: {
            pageSize,
            pageNumber,
            title
        }
    });
    return res.data;
}

/**
 * 删除新闻报道
 * @param report
 * @returns {Promise<null|any>}
 */
export async function removeNews(report) {
    const res = await service({
        url: `${url2}/deleteReport`,
        method: 'delete',
        params: {
            report
        }
    });

    return res.data;
}

/**
 * 获取新闻详情数据
 * @param reportId
 * @returns {Promise<void>}
 */
export async function getNewsContent(reportId) {
    const res = await service({
        url: `${url2}/getReportById`,
        params: {
            reportId
        }
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
        url: `${url2}/addReport`,
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
        url: `${url2}/updateReport`,
        method: 'put',
        data: form
    });
    return res.data;
}
