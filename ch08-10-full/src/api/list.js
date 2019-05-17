import client from './client'

export default {
  fetch: token => {
    return new Promise((resolve, reject) => {
      client.get('/lists', { headers: { 'x-kbn-token': token } })
        .then(res => resolve({ lists: res.data.lists }))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
