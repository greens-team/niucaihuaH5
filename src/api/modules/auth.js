/**
 * m: mock
 */
// 登录、获取同事及部门 所需部门
const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m) => {
  return {
    get: {
      dept: '/api/dept',
      colleague: '/api/user/list',
      getUsersList: '/api/users/list',
      getUserInfo: '/auth/info',
    },
    postJSON: {
      getOftenuselist: '/common/oftenuselist',
      login: TEST_URL + '/auth/login', // '/lbccrm/system/user/login', //m.GET + 
      testtest: TEST_URL,    // 无用接口
      dataprivilegecheck: '/common/writedpcheck',
      selectdpcheck: '/common/selectdpcheck'
    }
  }
};