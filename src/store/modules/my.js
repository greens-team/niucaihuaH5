// 我 功能模块所需数据
export default {
    state: {
        submitParams: {
            phone: '',
            pics: '',
            content: ''
        },
    },
    mutations: {
        setParamsEmpty(state) {
            state.submitParams = {
                phone: '',
                pics: '',
                content: ''
            }
        },
    },
    actions: {
        selectdpcheck({}, data = {}){
            return new Promise(resolve => {
                window.$ajax.auth.selectdpcheck(data).then(res => {
                    if (!Number(res.code)) {
                        resolve(res)
                    }
                })
            })
        },
        dataprivilegecheck({}, data = {}){
            return new Promise(resolve => {
                window.$ajax.auth.dataprivilegecheck(data).then(res => {
                    if (!Number(res.code)) {
                        resolve(res)
                    }
                })
            })
        },
        getUserInfo(){
            return new Promise(resolve => {
                window.$ajax.auth.getUserInfo().then(res => {
                    if (!Number(res.code)) {
                        resolve(res.data)
                    }
                })
            })
        },
        submitFeedBack({ state }, data = {}) {   // 提交反馈意见
            return new Promise(resolve => {
                window.$ajax.my.submitFeedBack(Object.assign(state.submitParams, data)).then(res => {
                    if (!Number(res.code)) {
                        resolve('操作成功')
                    }
                })
            })
        },
        getAuthInfo() {
            return new Promise(resolve => {
                window.$ajax.my.getAuthInfo().then(res => {
                    if (!Number(res.code)) {
                        resolve(res.data)
                    }
                })
            })
        }
    }
}