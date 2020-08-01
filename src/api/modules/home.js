/**
 * m: mock
 */
// const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m) => {
  return {
    get: {
      getUserInfo: '/user',
      getProduct: '/products',
    },
    postJSON: {
      postProLetter: '/proLetter/list',
      postPostalAdd: '/postal/add',
      postRelation: '/relation/list',
    },
    upload: {
      // fileUpload: '/common/upload', // 普通文件上传接口
    }
  }
};