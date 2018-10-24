import request from '../utils/request'
import { config } from '../utils/config'

const { base } = config

export const getAllList = params => {
    const options = {
        path: `${base}/manage/allList`,
        params,
    }
    return request(options)
};