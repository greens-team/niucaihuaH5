/**
 * m: mock
 */
// 经销商备案 所需接口
export default (m) => {
  return {
    get: {
    },
    postJSON: {
      checkRecord: '/dealer/checkrecord', // 经销商备案前校验接口
      recordSubmit: '/dealer/record', // 经销商提交备案准入接口
    },
    upload: {
      fileUpload: '/common/upload', // 普通文件上传接口
    }
  }
};