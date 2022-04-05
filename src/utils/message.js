import { Message } from 'element-ui'
import Vue from 'vue'

Vue.prototype.$success = (message, callBack) => {
    return Message.success({
        message,
        duration: 1000,
        offset: 250,
        onClose: () => {
            callBack && callBack()
        },
    })
}
Vue.prototype.$error = (message, callBack) => {
    return Message.error({
        message,
        duration: 1000,
        offset: 250,
        onClose: () => {
            callBack && callBack()
        },
    })
}