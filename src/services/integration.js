import service from './axios';
// TODO: service
const url = '/api/user';

/**
 * 获取步骤列表数据
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<void>}
 */
export async function getEductionList(pageSize, pageNumber, name) {
    const res = await service({
        url: `${url}/getStepList`,
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/**
 * 删除步骤
 * @param id
 * @returns {Promise<null|any>}
 */
export async function removeEduction(id) {
    const res = await service({
        url: `${url}/deleteStep/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 新增步骤
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createEduction(form) {
    const res = await service({
        url: `${url}/addStep`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑步骤
 * @param form
 * @returns {Promise<null|any>}
 */
export async function updateEduction(form) {
    const res = await service({
        url: `${url}/updateStep`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 获取文档列表数据
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<void>}
 */
export async function getDocumentList(pageSize, pageNumber, name) {
    const res = await service({
        url: `${url}/getDocumentList`,
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/**
 * 删除文档
 * @param id
 * @returns {Promise<null|any>}
 */
export async function removeDocument(id) {
    const res = await service({
        url: `${url}/deleteDocument/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 新增文档
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createDocument(form) {
    const res = await service({
        url: `${url}/addDocument`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑文档
 * @param form
 * @returns {Promise<null|any>}
 */
export async function updateDocument(form) {
    const res = await service({
        url: `${url}/updateDocument`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑详情
 * @param form
 * @returns {Promise<null|any>}
 */
export async function updateDetail(form) {
    const res = await service({
        url: `${url}/createUpdate`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 获取问题列表数据
 * @returns {Promise<void>}
 */
export async function getQuestionList() {
    const res = await service({
        url: `${url}/getQuestionList`
    });
    return res.data;
}

/**
 * 删除问题
 * @param data
 * @returns {Promise<null|any>}
 */
export async function removeQuestion(data) {
    const res = await service({
        url: `${url}/deleteQuestion`,
        method: 'delete',
        data
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}

/**
 * 新增问题
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createQuestion(form) {
    const res = await service({
        url: `${url}/addQuestion`,
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 编辑问题
 * @param form
 * @returns {Promise<null|any>}
 */
export async function updateQuestion(form) {
    const res = await service({
        url: `${url}/updateQuestion`,
        method: 'post',
        data: form
    });
    return res.data;
}
