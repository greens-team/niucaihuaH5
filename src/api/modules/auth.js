


/**
 * m: mock
 */

const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';

export default (m)=>{
  return {
    get: {
      dept: m.GET + '/api/dept',
      getUsersList: TEST_URL + '/api/users/list'
    },
    postJSON: {
      login: m.POST + '/auth/login', // '/lbccrm/system/user/login', //m.GET + 
      postTest: m.POST + '/getList',   
      testtest: TEST_URL    // 无用接口
    }
  }
};