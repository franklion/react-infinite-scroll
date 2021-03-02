import axios from 'axios';

if (process.env.ACCESS_TOKEN) {
  axios.defaults.headers.common['Authorization'] = `token ${process.env.ACCESS_TOKEN}`;
}

/**
 * @typedef {Object} LoginResponse
 * @property {number} code - 請求回應代碼
 * @property {Object} [data] - 所有資訊集合
 * @property {string} [msg] - 錯誤訊息
 */

/**
 * 取得個人所有的 repo
 * @returns {Promise<FetchResponse>}
 */
export function fetchReposAsync({ user, pageSize, pageNum }) {
  return axios({
    method: 'GET',
    url: `https://api.github.com/users/${user}/repos`,
    params: {
      per_page: pageSize,
      page: pageNum
    }
  });
}
