/**
 * m: mock
 */
// 我 所需接口
export default (m)=>{
    return {
      postJSON: {
        submitFeedBack: m.POST + '/feedback/add', // 提交反馈意见
      }
    }
  };