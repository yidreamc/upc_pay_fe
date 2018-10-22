import request from '../utils/request'
import { config } from '../utils/config'

const { base } = config

export const logout = params => {
    const options = {
        path: `${base}/logout`,
        method: 'POST'
    }
    return request(options)
};