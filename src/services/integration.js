import service from './axios';

const url1 = '/api/integrator';
const url2 = '/api/step';
const url3 = '/api/document';
const url4 = '/api/question';

/**
 * 获取all步骤列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */
export async function getEductionListAll(pageSize, pageNumber) {
    const res = await service({
        url: `${url2}/getStepList`,
        params: {
            pageSize,
            pageNumber
        }
    });
    return res.data;
}

/**
 * 获取filter步骤列表数据
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<void>}
 */
export async function getEductionListByName(pageSize, pageNumber, name) {
    const res = await service({
        url: `${url2}/getStepByName`,
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
 * @param step
 * @returns {Promise<null|any>}
 */
export async function removeEduction(step) {
    const res = await service({
        url: `${url2}/deleteStep`,
        method: 'delete',
        params: {
            step
        }
    });

    return res.data;
}

/**
 * 新增步骤
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createEduction(form) {
    const res = await service({
        url: `${url2}/addStep`,
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
        url: `${url2}/updateStep`,
        method: 'put',
        data: form
    });
    return res.data;
}

/**
 * 获取all文档列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */
export async function getDocumentListAll(pageSize, pageNumber) {
    const res = await service({
        url: `${url3}/getDocumentList`,
        params: {
            pageSize,
            pageNumber
        }
    });
    return res.data;
}

/**
 * 获取filter文档列表数据
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<void>}
 */
export async function getDocumentListByName(pageSize, pageNumber, name) {
    const res = await service({
        url: `${url3}/getDocumentList`,
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
 * @param documentId
 * @returns {Promise<null|any>}
 */
export async function removeDocument(documentId) {
    const res = await service({
        url: `${url3}/deleteDocument`,
        method: 'delete',
        params: {
            documentId
        }
    });

    return res.data;
}

/**
 * 新增文档
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createDocument(form) {
    const res = await service({
        url: `${url3}/addDocument`,
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
        url: `${url3}/updateDocument`,
        method: 'put',
        data: form
    });
    return res.data;
}

/**
 * 获取详情
 * @returns {Promise<void>}
 */
export async function getDetail() {
    const res = await service({
        url: `${url1}/getIntegrator`
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
        url: `${url1}/updateIntegrator`,
        method: 'put',
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
        url: `${url4}/getQuestionList`
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
        url: `${url4}/deleteQuestion`,
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
        url: `${url4}/addQuestion`,
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
        url: `${url4}/updateQuestion`,
        method: 'post',
        data: form
    });
    return res.data;
}
