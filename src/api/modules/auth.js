/**
 * m: mock
 */
// 登录、获取同事及部门 所需部门
const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m)=>{
  return {
    get: {
      dept: m.GET + '/api/dept',
      colleague:  m.GET + '/api/user/list',
      getUsersList: m.GET + '/api/users/list',
      getUserInfo: m.GET + 'auth/info',
    },
    postJSON: {
      getOftenuselist: m.POST + '/common/oftenuselist',
      login: TEST_URL + '/auth/login', // '/lbccrm/system/user/login', //m.GET + 
      testtest: TEST_URL,    // 无用接口
      dataprivilegecheck: m.POST + '/common/writedpcheck',
      selectdpcheck: m.POST + '/common/selectdpcheck'
    }
  }
};