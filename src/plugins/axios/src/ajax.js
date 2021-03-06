/**
 * 扩展axios的methods请求方式
 */ 

import queryString from 'query-string';
// import { Message } from 'element-ui';

const ajax = (axios) => {
  axios.defaults.baseURL = '/api';
  // if (process.env.NODE_ENV === 'development') {
  //   axios.defaults.baseURL = '/api';
  // } else {
  //   axios.defaults.baseURL = window[window.ENV];
  // }

  let get = (url, params = {}) => {
    return new Promise((resolve) => {
      if(typeof params != 'object'){
        axios.get(url+'/'+params).then((response) => {
          resolve(response);
        });
      }else{
        axios.get(url,{
          params: params
        }).then((response) => {
          resolve(response);
        });
      }
    });
  };

  let post = (url, params = {}) => {
    return new Promise((resolve) => {
      axios.post(url, queryString.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((response) => {
        resolve(response);
      });
    });
  };

  let put = (url, params = {}) => {
    return new Promise((resolve) => {
      axios.put(url, queryString.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((response) => {
        resolve(response);
      });
    });
  };

  let putJSON = (url, params = {}) => {
    return new Promise((resolve) => {
      axios.put(url, JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        resolve(response);
      });
    });
  };

  let postJSON = (url, params = {}) => {
    return new Promise((resolve) => {
      axios.post(url, JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        resolve(response);
      });
    });
  };

  let del = (url, params = {}) => {
    return new Promise((resolve) => {
      axios.delete(url, params).then((response) => {
        resolve(response);
      });
    });
  };

  let upload = (url, params = {}) => {
    let formData = new FormData();
    for (let _key in params) {
      formData.append(_key, params[_key]);
    }
    return new Promise((resolve) => {
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        resolve(response);
      });
    });
  };

  return {
    get,
    post,
    put,
    del,
    upload,
    putJSON,
    postJSON
  }
}

// dev环境
let m = {};
let methods = ['GET','POST','PUT','DELETE']
methods.map(r=>{
  (process.env.NODE_ENV === 'development') ? (m[r] = r) : (m[r] = '')
})

export {ajax, m};