// 我 功能模块所需数据
export default {
    state: {
        submitParams: {
            phone: '',
            pics: '',
            content: ''
        }

    },
    mutations: {

    },
    actions: {
        submitFeedBack({ state }, data = {}) {   // 提交反馈意见
            return new Promise(resolve => {
                window.$ajax.my.submitFeedBack(Object.assign(state.submitParams, data)).then(res => {
                    if (!Number(res.code)) {
                        resolve(res.msg)
                    }
                })
            })
        },
    }
}