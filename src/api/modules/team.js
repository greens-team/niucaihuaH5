/**
 * m: mock
 */
// const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m) => {
  return {
    get: {
      getTeamInfo: '/team',
    },
    postJSON: {
      postUserList: '/user/list',
      postProductsList: '/products/list',
    },
    upload: {
      // fileUpload: '/common/upload', // 普通文件上传接口
    }
  }
};