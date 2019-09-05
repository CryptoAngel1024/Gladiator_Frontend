/*eslint-env node, jest, amd*/
import { mockUserDetail } from '../../../tests/__data__/auth/authData.js'
import { DEPARTMENTS_DATA } from '../../../tests/integration/views/testUtils'

const getUser = jest.fn(async (email) => {
  let department = 'TRAUMA'
  for (const key in DEPARTMENTS_DATA) {
    if (
      Object.hasOwnProperty.call(DEPARTMENTS_DATA, key) &&
      DEPARTMENTS_DATA[key]?.email === email
    ) {
      department = key
      break
    }
  }
  return Promise.resolve({ ...mockUserDetail, department: department })
})

const createUser = jest.fn((userToCreate, department) =>
  Promise.resolve({
    ...mockUserDetail,
    ...userToCreate,
    department: department,
  }),
)

const updateUser = jest.fn((userToUpdate) =>
  Promise.resolve({ ...mockUserDetail, ...userToUpdate }),
)

export { getUser, createUser, updateUser }
