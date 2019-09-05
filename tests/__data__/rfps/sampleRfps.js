import defaultPresentationConfig from '@/data/defaultRfpFields/trauma/defaultPresentationConfig.json'
import ascRfps from './ASC/sampleRfps.json'
import ascCreatedRfp from './ASC/sampleCreatedRfp.json'
import traumaRfps from './TRAUMA/sampleRfps.json'
import traumaCreatedRfp from './TRAUMA/sampleCreatedRfp.json'
import updateSlideContentResp from './sampleUpdateSlideContentResp.json'
import { useAllDepartmentSlides } from '@/data/allSlides'
import traumaShareRfp from './TRAUMA/sampleShareRfp.json'
import ascShareRfp from './ASC/sampleShareRfp.json'

const SAMPLE_CONTACTS = [
  {
    name: 'Contact 1',
    role: 'COO',
    email: 'contact1@depuy.com',
  },
  {
    name: 'Contact 2',
    role: 'CEO',
    email: 'contact2@depuy.com',
  },
]
const todaysDate = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
}).format(new Date())

const emptyCurrentRfpDefault = (allSlides) => ({
  presentationId: '',
  date: todaysDate,
  customerName: '',
  contact: JSON.stringify(SAMPLE_CONTACTS),
  customerProblem: '',
  stakeholders: null,
  discoveries: null,
  contract: {
    gpoAffilation: '',
    numberAndName: '',
    endDate: '',
    notes: '',
    priceAvailable: false,
  },
  slideSelection: defaultPresentationConfig,
  links: [],
  slides: allSlides,
})

const departments = {
  TRAUMA: {
    rfps: traumaRfps,
    createRfp: traumaCreatedRfp,
    shareRfp: traumaShareRfp,
  },
  ASC: {
    rfps: ascRfps,
    createRfp: ascCreatedRfp,
    shareRfp: ascShareRfp,
  },
}

function getEmptyCurrentRfpDefault() {
  const { allDepartmentSlides } = useAllDepartmentSlides()
  return emptyCurrentRfpDefault(allDepartmentSlides.value)
}

function getCreatedRfp(department) {
  return JSON.parse(
    JSON.stringify(
      departments[department]?.createRfp || departments.TRAUMA.createRfp,
    ),
  )
}

function getShareRfpPayload(department) {
  return JSON.parse(
    JSON.stringify(
      departments[department]?.shareRfp || departments.TRAUMA.shareRfp,
    ),
  )
}

function getMyRfps(department) {
  let data = []
  if (department) data = departments[department].rfps
  else {
    for (const dep in departments) {
      data = [...data, ...departments[dep].rfps]
    }
  }
  return JSON.parse(JSON.stringify(data))
}

function getUpdatedSlideContent(department) {
  return JSON.parse(
    JSON.stringify({
      ...updateSlideContentResp,
      department: department,
    }),
  )
}

function getSampleUpdatePresentation(department, pid) {
  const rfps = departments[department]?.rfps || departments.TRAUMA.rfps
  const updatedRfp = rfps.find((rfp) => rfp.presentationId === pid)

  return JSON.parse(JSON.stringify(updatedRfp))
}

function getAscRfps() {
  return JSON.parse(JSON.stringify(ascRfps))
}
function getAscCreatedRfp() {
  return JSON.parse(JSON.stringify(ascCreatedRfp))
}
export {
  getEmptyCurrentRfpDefault,
  getCreatedRfp,
  getShareRfpPayload,
  getMyRfps,
  getUpdatedSlideContent,
  getSampleUpdatePresentation,
  getAscRfps,
  getAscCreatedRfp,
}
