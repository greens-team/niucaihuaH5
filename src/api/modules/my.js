/**
 * m: mock
 */
// 我 所需接口
// const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m) => {
  return {
    postJSON: {
      submitFeedBack: '/feedback/add', // 提交反馈意见
    },
    get: {
      getAuthInfo: '/auth/info', // 获取登录信息
    }
  }
};