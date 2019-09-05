import { get, post, put } from './httpClient.js'

const userEndpoint = '/user'

let userPromise

const getUser = async (email) => {
  if (!userPromise) userPromise = get(`${userEndpoint}`, { email })
  return userPromise
}

const getUserByEmail = (email) => {
  return get(`${userEndpoint}/email?email=${email}`)
}
const createUser = async (user, department) => {
  return post(userEndpoint, { department, ...user })
}

const updateUser = async (user) => {
  return put(userEndpoint, user)
}

export { getUser, getUserByEmail, createUser, updateUser }
