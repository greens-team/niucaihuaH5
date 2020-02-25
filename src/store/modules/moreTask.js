import moment from '@/plugins/moment' // 时间统一处理
export default {
    state: {
        isLastPage: false,
        listParams: {
            myJoinType: 0,
            taskType: 0,
            orderType: 0,
            pageNum: 1,
            pageSize: 20,
            taskName: '',
            startTime: 0,
            endTime: 0,
            ownerUserGids: [],
            followerUserGids: [],
            dealerGids: [],
            finishType: 0
        },
        taskList: [],
        dropDownType: [
            { text: '全部活动', value: 0 },
            { text: '我负责的', value: 1 },
            { text: '我参与的', value: 2 }
        ],
        dropDownValue: 0,
        taskType: [
            { name: '全部', id: 0 },
            { name: '经销商拜访', id: 1 },
            { name: '任务事项', id: 2 }
        ],
        orderType: [
            { text: '默认排序', value: 0 },
            { text: '按拜访/截止时间排序', value: 1 },
            { text: '按名称排序', value: 2 }
        ],
        taskTypeArr: [
            {
                text: '拜访', value: 1
            },
            {
                text: '任务', value: 2
            }
        ],
    },
    mutations: {
        setEmptyParams(state) {
            state.listParams = {
                queryString: '',
                myJoinType: 0,
                taskType: 0,
                orderType: 0,
                pageNum: 1,
                pageSize: 20,
                taskName: '',
                startTime: 0,
                endTime: 0,
                ownerUserGids: [],
                followerUserGids: [],
                dealerGids: [],
                finishType: 0
            }
        },
    },
    actions: {
        // 新增的拜访记录列表
        getMoreTaskList({ state }, data = {}) {
            let params = Object.assign(state.listParams, data)

            //负责人
            if (params.ownerUserGids && params.ownerUserGids.length && params.ownerUserGids[0].id) {
                params.ownerUserGids = params.ownerUserGids.map(r => {
                    return String(r.id)
                })
            }
            //参与人
            if (params.followerUserGids && params.followerUserGids.length && params.followerUserGids[0].id) {
                params.followerUserGids = params.followerUserGids.map(r => {
                    return String(r.id)
                })
            }

            // // 相关经销商
            // if (params.dealerGids && params.dealerGids.length && params.dealerGids[0].gid) {
            //     params.dealerGids = params.dealerGids.map(r => {
            //         return String(r.gid)
            //     })
            // }

            if (params.pageNum == 1) {
                state.isLastPage = false;
            }
            return new Promise(resolve => {
                if (state.isLastPage) {
                    resolve();
                    return;
                }
                let timevals = {
                    startTime: String(params.startTime).length == 13 ? params.startTime / 1000 : params.startTime,
                    endTime: String(params.endTime).length == 13 ? params.endTime / 1000 : params.endTime
                }
                window.$ajax.workbench.morelistpage(Object.assign({}, params, timevals)).then(res => {
                    if (!res.code) {
                        state.taskList = params.pageNum == 1 ? (res.data.list || []) : state.taskList.concat(res.data.list);
                        if (res.data.list && res.data.list.length < params.pageSize) {
                            state.isLastPage = true;
                        }
                        resolve(res.data.list)
                    }
                })
            })
        }
    }
}