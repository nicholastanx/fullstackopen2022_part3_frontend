import axios from 'axios'

const baseUrl = `/api/persons`

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = (obj) => {
  const req = axios.post(baseUrl, obj)
  return req.then(response => response.data)
}

const update = (id, obj) => {
  const req = axios.put(`${baseUrl}/${id}`, obj)
  return req.then(response => response.data)
}

const del = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(response => response.data)
}

export default { getAll, create, update, del }