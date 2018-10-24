import request from '../utils/request'
import { config } from '../utils/config'

const { base } = config

export const getPaymentPageData = params => {
    const options = {
        path: `${base}/pay/getPaymentPageDat`,
        params,
        needAuth: false,
    }
    return request(options)
};