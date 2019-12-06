import axios from '@/services/axios';

import Mock, { Random } from 'mockjs';

Mock.mock(/\/api\/partner\/getPartnerList/, 'get', {
    'list|8': [
        {
            'id|+1': 1,
            name: '@cname',
            'order|+1': 0,
            picture: Random.image('200x100', '#4A7BF7', '@cname')
        }
    ],
    totalSize: 8
});

Mock.mock(/\/api\/career\/getCareerList/, 'get', {
    'list|8': [
        {
            'id|+1': 1,
            name: '@cname',
            city: '@city',
            duty: '@csentence(4)',
            qualification: '@csentence(4)',
            publishTime: '@datetime("yyyy-MM-dd")'
        }
    ],
    totalSize: 8
});

/** 获取合作伙伴列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getPartnerList(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/partner/getPartnerList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/** 新增伙伴
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createPartner(form) {
    const res = await axios({
        url: '/api/partner/addPartner',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新伙伴
 * @param form
 * @returns {Promise<*>}
 */

export async function updatePartner(form) {
    const res = await axios({
        url: '/api/partner/updatePartner',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除伙伴
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deletePartner(id) {
    const res = await axios({
        url: `/api/partner/deletePartner`,
        method: 'delete',
        params: {
            partnerId: id
        }
    });
    return res.data;
}

/** 获取岗位列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getCareerList(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/career/getCareerList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/** 新增岗位
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createCareer(form) {
    const res = await axios({
        url: '/api/career/addCareer',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新岗位
 * @param form
 * @returns {Promise<*>}
 */

export async function updateCareer(form) {
    const res = await axios({
        url: '/api/career/updateCareer',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除岗位
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteCareer(id) {
    const res = await axios({
        url: `/api/career/deleteCareer`,
        method: 'delete',
        params: {
            careerId: id
        }
    });
    return res.data;
}

