// 新建承租人数据
export default {
    state: {
        params: {
        },
        marryList: [{             // 选择性别
            text: '男',
            value: 0
        }, {
            text: '女',
            value: 1
        }],
        lesseeTypeList: [
            {
                text: '自然人',
                value: 0
            }

        ]
    },
    mutations: {
        setNewLesseeParams(state) {
            state.params = {

                lesseeName: '',           // 承租人名称
                idcardNum: '',            // 承租人身份证号
                birthday: '',             // 生日 时间戳  秒
                marry: 0,                 // 性别 0男 1女
                lesseeType: 0,            // 客户类型 0自然人
                lesseePhone:'',           // 手机号
                domicilePlace: '',        // 户口所在地
                homeAddress: '',          // 家庭住址
                workingYears: null,          // 从业年限
                comment: '',              // 备注

                // idcardFrontPic: '',  // 身份证正面照片地址
                // idcardBackPic: '',   // 身份证背面照片地址
                // userPic: '',         // 本人照片地址


                // addType: 0,          // 0 直接新建经销商  1 新建经销商并添加联系人
                ownerUserGids: [],      // [1,2,3]负责人gid 集合
                followerUserGids: [],   // 跟进人gid集合
            }
        }
    },
    actions: {
        addNewDealer({ state }) {
            return new Promise(resolve => {
                window.$ajax.lessee.add(state.params).then(res => {
                    if (!res.code) {
                        resolve()
                    }
                })
            })
        }
    }
}