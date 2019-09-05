/*eslint-env node, jest, amd*/
import { getNewStore } from './setupStore.js'
import { getReport } from '@/api/gaReport.api'
import allReportJson from '../../__data__/gaReport/allReport.json'

jest.mock('@/api/gaReport.api')
jest.mock('@/api/pingIdAuth')

function getGAReportData(store) {
  return store.getters['ga/reportData']
}
function getGAReport1(store) {
  return store.getters['ga/report1']
}
function getGAReport2(store) {
  return store.getters['ga/report2']
}

for (const dep of ['ASC', 'TRAUMA']) {
  let store = getNewStore()
  describe(`store gaReport module spec ${dep}`, () => {
    beforeAll(() => {
      store.commit('setting/setCurrentDepartment', dep)
    })

    it('should get all report data', async () => {
      const payload = {
        reportType: 'ALL',
        department: dep.toLocaleLowerCase(),
      }
      await store.dispatch('ga/fetchReportData', payload)
      expect(getReport).toHaveBeenCalledWith(payload)
      const storedData = getGAReportData(store)
      expect(storedData).toEqual(allReportJson)
    })

    it('should get report1 data', async () => {
      const storedData = getGAReport1(store)
      expect(storedData).toEqual(allReportJson.data.r1)
    })

    it('should get report2 data', async () => {
      const storedData = getGAReport2(store)
      expect(storedData).toEqual(allReportJson.data.r2)
    })
  })
}
