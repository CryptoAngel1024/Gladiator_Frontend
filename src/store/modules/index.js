/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = import.meta.globEager('./*.js')

const modules = {}

Object.keys(requireModule).forEach((filename) => {
  // create the module name from fileName
  // remove the store.js extension
  const moduleName = filename.replace(/(\.\/|\.store\.js)/g, '')

  modules[moduleName] =
    requireModule[filename].default || requireModule[filename]
  modules[moduleName].namespaced = true
})

export default modules
