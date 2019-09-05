/*eslint-env node, jest, amd*/
import allReportData from '../../../tests/__data__/gaReport/allReport.json'
const getReport = jest.fn(() => Promise.resolve(allReportData))

export { getReport }
