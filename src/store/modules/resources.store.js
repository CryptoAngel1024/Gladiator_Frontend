import resources from '@/data/resources.json'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  state: () => ({
    resources: JSON.parse(JSON.stringify(resources)),
    downloaded: [],
    downloadCount: 0,
  }),
  getters: {
    getResources: (state) => {
      return state.resources
    },
    getDownload: (state) => {
      return state.downloaded
    },
    resourcesPerTag: (state, getters) => (tag) => {
      return getters.allResources.filter((resource) =>
        resource.tags?.includes(tag),
      )
    },
    resourcesPerUrls: (state, getters) => (pageUrlFragments) => {
      return getters.allResources
        .filter((resource) => resource.displayInUrls?.length > 0)
        .filter((resource) => {
          let urlFound = true
          resource.displayInUrls.forEach((displayInUrl) => {
            if (!pageUrlFragments.includes(displayInUrl)) urlFound = false
          })
          return urlFound
        })
    },
    allResources: (state) => {
      return [].concat(
        ...state.resources.map((folder) =>
          folder.data.map((resource) => ({
            ...resource,
            folderID: folder.folderID,
          })),
        ),
      )
    },
  },
  mutations: {
    setDownload(state, payload) {
      gaEvent({
        action: 'set-download',
        event_category: 'resource',
        event_label: 'User-set-download',
      })

      let flag = false
      for (let i = 0; i < state.downloaded.length; i++) {
        if (
          state.downloaded[i].folder_id == payload.folder_id &&
          state.downloaded[i].downloaded.id == payload.downloaded.id
        ) {
          flag = true
        }
      }
      if (!flag) {
        state.downloaded.push(payload)
      }
      flag = false
    },
    setFavorite(state, payload) {
      gaEvent({
        action: 'set-favorite',
        event_category: 'resource',
        event_label: 'User-set-favorites',
      })
      state.resources.map((folder, i) => {
        if (i == payload.folder_id) {
          folder.data.map((file, j) => {
            if (j === payload.file_id - 1) {
              state.resources[i].data[j].favorite =
                !state.resources[i].data[j].favorite
            }
          })
        }
      })
    },
  },
}
