import service from './axios';

const url1 = '/api/integrator';
const url2 = '/api/step';
const url3 = '/api/document';
const url4 = '/api/question';

/**
 * 获取步骤列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */
export async function getEductionList(pageSize, pageNumber, name) {
    const res = await service({
        url: `${url2}/getStepList`,
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
 * 获取文档列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */
export async function getDocumentList(pageSize, pageNumber, name) {
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
 * @param questionId
 * @returns {Promise<null|any>}
 */
export async function removeQuestion(questionId) {
    const res = await service({
        url: `${url4}/deleteQuestion`,
        method: 'delete',
        params: {
            questionId
        }
    });

    return res.data;
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
        method: 'put',
        data: form
    });
    return res.data;
}
