import { currentAuthenticatedUser } from '@/api/pingIdAuth.js'
import store from '@/store'
import routes from './routes.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { createWebHistory, createRouter } from 'vue-router'
import { trackRouter } from 'vue-gtag-next'

async function isUserLoggedIn() {
  try {
    const resp = await currentAuthenticatedUser()
    if (resp) return true
  } catch (error) {
    return false
  }

  return false
}
async function canUserAccess(to) {
  if (to.meta.isPublic) return true

  return await isUserLoggedIn()
}
async function goToLoginOrDashboard(to) {
  if (['login', 'defaultLogin', 'callback'].includes(to.name)) {
    const isLoggedIn = await isUserLoggedIn()

    if (isLoggedIn) {
      await router.push({ name: 'dashboard' })
    } else if (to.name === 'callback' && !to.query.code) {
      await router.push({
        name: 'defaultLogin',
        query: { returnUrl: to.path },
      })
    }
  }

  const canAccess = await canUserAccess(to)

  if (!canAccess)
    await router.push({ name: 'login', query: { returnUrl: to.path } })
}

function addDepartmentParam(to, from, router) {
  if (
    !to.params.department &&
    !(to.name === 'login' || to.name === 'defaultLogin')
  ) {
    const userDepartment = store.getters['setting/getDepartment']?.toLowerCase()

    const currentDepartment =
      from.params.department || userDepartment || DEFAULT_DEPARTMENT
    to.params.department = currentDepartment

    router.push(to)
  }
}

function setPageTitle(to) {
  const { title: viewTitle } = to.meta

  let fullTitle
  if (viewTitle) {
    fullTitle = typeof viewTitle === 'function' ? viewTitle(to) : viewTitle
  }

  document.title = fullTitle ? `Gladiator | ${fullTitle}` : 'Gladiator'
}

export function setupRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  trackRouter(router)

  router.beforeEach(async (to, from) => {
    const isInitialLoad = from.fullPath === '/' && to.fullPath === '/dashboard'

    if (isInitialLoad) await goToLoginOrDashboard(to)

    const userType = store.getters['setting/getUserType']
    if (userType === 'SuperAdmin' && to.name === 'dashboard') {
      to.name = 'overview'
    }

    addDepartmentParam(to, from, router)
  })

  router.afterEach(async (to) => {
    setPageTitle(to)

    await goToLoginOrDashboard(to)
  })

  return router
}

export const router = setupRouter()
export default router
