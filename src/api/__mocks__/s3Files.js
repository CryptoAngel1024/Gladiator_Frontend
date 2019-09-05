/*eslint-env node, jest, amd*/

const getSignedFileUrl = jest.fn(() => Promise.resolve())

const saveFileSigned = jest.fn(() => Promise.resolve())

const deleteFileSigned = jest.fn(() => Promise.resolve())

export { getSignedFileUrl, saveFileSigned, deleteFileSigned }
