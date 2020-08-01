import moment from '@/plugins/moment' // 时间统一处理
export default {
  state: {
    userInfo: {},
    product: {},
    letter: [],
    letterCount: 0,
    currentIndex: 0
  },
  mutations: {
    setCurrentIndex(state, index){
      state.currentIndex = index
    }
  },
  actions: {
    postRelation({ state, dispatch }, data = {}){
      // return new Promise(resolve => {
        window.$ajax.home.postRelation(data).then(res => {
          // resolve(res)
          if(res.data){
						res.data.map(row=>{
							// 关联信息
              dispatch('getLetter', {product_id: row.relation_id})
						})
					}
        })
      // })
    },
    postPostalAdd({ state }, data = {}){
      // return new Promise(resolve => {
      //   window.$ajax.home.postPostalAdd(data).then(res => {
      //     resolve(res)
      //   })
      // })
      return window.$ajax.home.postPostalAdd(data)
    },
    getUser({ state }, data = {}){
      return new Promise(resolve => {
        window.$ajax.home.getUserInfo(data).then(res => {
          state.userInfo = res
          resolve(res)
        })
      })
    },
    getProduct({ state, dispatch }, id = {}){
      return new Promise(resolve => {
        window.$ajax.home.getProduct(id).then(res => {
          res.data.pics = res.data.pics ? res.data.pics.split(',').map(r=>{return window[window.ENV]+r;}) : []
          state.product = res.data

          state.letterCount = 0;
          state.letter = [];

          dispatch("getLetter",  {product_id: id})
          dispatch("postRelation",  {product_id: id})

          resolve(res)
        })
      })
    },
    getLetter({ state }, data = {}){
      return new Promise(resolve => {
        window.$ajax.home.postProLetter(data).then(res => {

          let temp = res.data.map(r=>{
						r.day = new Date(Number(r.create_time)).getDate()
						r.month = new Date(Number(r.create_time)).getMonth()+1
						if(r.pics){
							r.pics = r.pics.split(',').map(s=>{
								return window[window.ENV] + s;
							})
						}
						if(r.video){
							r.video = r.video.split(',').map(s=>{
								return window[window.ENV] + s;
							})
						}
						return r
          })
          
          console.log(temp, 111)
          state.letterCount += temp.length;
          state.letter.push(temp)
          resolve(res)
        })
      })
    },
  }
}