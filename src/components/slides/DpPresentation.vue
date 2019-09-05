<template>
  <div class="flex flex-wrap justify-evenly pt-5 h-screen">
    <button
      class="w-7 h-7"
      data-test="show-overview-button"
      @click="showNavigator(), dbPresShowNavGaLog()"
    >
      <SvgIcon name="slideDotted" class="w-7 h-7" />
    </button>
    <div class="reveal">
      <div class="slides border-2 mt-4">
        <slot name="mainView" />
      </div>
    </div>
    <button
      class="w-7 h-7"
      data-test="show-full-screen-button"
      :class="fullScreenMode(isFullScreenMode)"
      @click="showFullScreen(), fullScreenGaLog()"
    >
      <SvgIcon class="w-7 h-7" name="enlarge" />
    </button>

    <div
      class="flex justify-between items-center font-Arial w-full px-10"
      :class="fullScreenMode(isFullScreenMode)"
    >
      <p class="text-3xl font-medium text-gray-900" data-test="customer-name">
        {{ customerName }}
      </p>
      <div class="flex content-center">
        <router-link :to="linkToSlide1" data-test="link-to-slide1">
          <SvgIcon class="w-12 h-12 pr-4" name="homeIcon" />
        </router-link>

        <div class="flex content-center self-stretch">
          <button
            data-test="previous-button"
            @click="previousSlide(), dpPresPrevGaLog()"
          >
            <SvgIcon
              class="w-8 h-8 stroke-current stroke-2 text-black"
              name="slideNavigatorLeft"
              :class="isEndOfSlide(!isPrevSlideAvailable)"
            />
          </button>

          <p class="text-center my-auto">
            {{ currentSlideNumberString }}/{{ totalNumOfSlides }}
          </p>

          <button
            data-test="next-button"
            @click="nextSlide(), dpPresNextGaLog()"
          >
            <SvgIcon
              class="w-8 h-8"
              name="slideNavigatorRight"
              :class="isEndOfSlide(!isNextSlideAvailable)"
            />
          </button>
        </div>
      </div>
      <p class="text-3xl font-medium text-white">
        {{ customerName }}
      </p>
      <div class="absolute right-0 bottom-0">
        <s3Image
          class="h-32 w-full object-scale-down"
          :s3-directory="`presentations/${presentationId}/`"
          s3-file-name="customerProfile.png"
          alt="Logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Reveal from 'reveal.js'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import s3Image from '@/components/utils/s3/s3Image.vue'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { s3Image },
  props: {
    prevRoute: {
      type: String,
      default() {
        return 'default'
      },
    },
  },

  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    let totalNumOfSlides = ref(0)
    const currentSlideNumberString = computed(() => route.hash.slice(2) || '1')

    const link = computed(() =>
      store.getters['rfps/getLinkByHyperLink'](
        route.params.clientName?.replace('-', ' '),
        route.params.hyperLink?.replace('-', ' '),
      ),
    )

    const linkToSlide1 = computed(() => {
      const { presentationId, hyperLink } = route.params
      return hyperLink
        ? {
            name: 'present',
            hash: '#/1',
            params: {
              hyperLink,
            },
          }
        : {
            name: 'slide',
            hash: '#/1',
            params: {
              presentationId,
            },
          }
    })

    const customerName = computed(() =>
      route.params.hyperLink
        ? link.value?.clientName.replace('-', ' ')
        : store.getters['rfps/getCustomerNameByPresentationId'](
            route.params.presentationId,
          ),
    )
    let reavleInstance = reactive({})
    let isNextSlideAvailable = ref(false)
    let isPrevSlideAvailable = ref(false)
    let isFullScreenMode = ref(false)
    let isPlaying = ref(false)

    const setupReveal = async () => {
      if (reavleInstance.value?.getSlides().length) {
        reavleInstance.value.sync()
        reavleInstance.value.layout()
        reavleInstance.value.slide(currentSlideNumberString.value)
        return
      }

      const hashSlideIndex = route.hash.slice(2)

      await Reveal.initialize({
        embedded: true,
        center: true,
        controls: false,
        history: true,
        hashOneBasedIndex: true,
        minScale: 0.5,
        width: 1280,
        height: 720,
        autoPlayMedia: isPlaying.value,
        keyboard: true,
      })

      reavleInstance.value = Reveal

      totalNumOfSlides.value = Reveal.getTotalSlides()

      if (document.querySelector('.reveal')) {
        document.querySelector('.reveal').style.marginTop = '30px'
        document.querySelector('.reveal').style.width = '90vw'
        document.querySelector('.reveal').style.height = '90%'
      }

      // Make reveal.js aware of the size change
      Reveal.layout()

      if (Reveal.getSlides().length >= currentSlideNumberString.value) {
        if (hashSlideIndex?.length) Reveal.slide(hashSlideIndex - 1)
        if (
          props.prevRoute === 'slideOverview' ||
          props.prevRoute === 'linkOverview'
        ) {
          // Reveal.sync();
          // Reveal.layout();
          // Reveal.slide(hashSlideIndex - 1)
          router.go()
        }

        isNextSlideAvailable.value = Reveal.availableRoutes().right

        isPrevSlideAvailable.value = Reveal.availableRoutes().left
      } else {
        Reveal.slide(0)
      }
      Reveal.addKeyBinding(39, () => {
        nextSlide()
      })
      // Reveal.on("slidechanged", (event) => { });
      // Reveal.on("overviewshown", (event) => { });
      // Reveal.on("overviewhidden", (event) => { });
    }

    onMounted(setupReveal)
    onBeforeRouteUpdate((to) => {
      // Reveal?.layout();
      const revealId = `${Reveal.getIndices().h + 1}`
      const currentSlideIndex = to.hash.slice(2).split('/')[0]

      if (currentSlideIndex && revealId !== currentSlideIndex) {
        Reveal.slide(currentSlideIndex - 1)
      }
    })

    const presentationId = computed(
      () => route.params.presentationId || link.value.presentationId,
    )

    const dbPresShowNavGaLog = () => {
      gaEvent({
        action: 'show-navigatore-menu',
        event_category: 'dashboard',
        event_label: 'User-clicked-show-navigatore-menu',
      })
    }

    const fullScreenGaLog = () => {
      gaEvent({
        action: 'presentation-fullScreen',
        event_category: 'dashboard',
        event_label: 'User-clicked-presentation-fullScreen-btn',
      })
    }

    const dpPresPrevGaLog = () => {
      gaEvent({
        action: 'previous-presentation',
        event_category: 'dashboard',
        event_label: 'User-clicked-db-previous-presentation-btn',
      })
    }

    const dpPresNextGaLog = () => {
      gaEvent({
        action: 'next-presentation',
        event_category: 'dashboard',
        event_label: 'User-clicked-db-next-presentation-btn',
      })
    }
    const EmbeddedVideoSlideNumber = computed(
      () =>
        1 +
        store.getters['rfps/enabledSlideNumber']({
          presentationId: route.params.presentationId,
          slideId: 'INTR1',
          hyperLink: route.params.hyperLink?.replace('-', ' '),
          clientName: route.params.clientName?.replace('-', ' '),
        }),
    )

    const nextSlide = () => {
      if (reavleInstance.value.availableRoutes().right) {
        isPlaying.value =
          currentSlideNumberString.value ==
            EmbeddedVideoSlideNumber.value - 1 && !isPlaying.value

        const autoPlayVideo = false
        if (!autoPlayVideo) isPlaying.value = false

        if (autoPlayVideo)
          Reveal.initialize({
            autoPlayMedia: isPlaying.value,
          })
        if (!isPlaying.value) {
          reavleInstance.value.next()
          isPrevSlideAvailable = true
          isNextSlideAvailable = Boolean(
            reavleInstance.value.availableRoutes().right,
          )
        }
      }
    }
    return {
      presentationId,
      totalNumOfSlides,
      currentSlideNumberString,
      reavleInstance,
      isNextSlideAvailable,
      isPrevSlideAvailable,
      isFullScreenMode,
      customerName,
      dbPresShowNavGaLog,
      fullScreenGaLog,
      dpPresPrevGaLog,
      dpPresNextGaLog,
      linkToSlide1,
      nextSlide,
    }
  },

  mounted() {
    if (document.addEventListener) {
      document.addEventListener(
        'fullscreenchange',
        this.fullScreenExitHandler,
        false,
      )
      document.addEventListener(
        'mozfullscreenchange',
        this.fullScreenExitHandler,
        false,
      )
      document.addEventListener(
        'MSFullscreenChange',
        this.fullScreenExitHandler,
        false,
      )
      document.addEventListener(
        'webkitfullscreenchange',
        this.fullScreenExitHandler,
        false,
      )
      document.addEventListener('mousemove', this.showSlideControlls)
    }
    // this.$store.dispatch('rfps/getMyRfpbyId', this.presentationId)
  },

  methods: {
    previousSlide() {
      if (this.reavleInstance.value.availableRoutes().left) {
        this.reavleInstance.value.prev()
        this.isNextSlideAvailable = true

        this.isPrevSlideAvailable = Boolean(
          this.reavleInstance.value.availableRoutes().left,
        )
      }
    },

    isEndOfSlide(endOfSlide) {
      return {
        'opacity-25': endOfSlide,
      }
    },

    showNavigator() {
      this.displayOverview(this.currentSlideNumberString)
    },

    showFullScreen() {
      document.querySelector('.reveal').style.width = '95vw'
      document.querySelector('.reveal').style.height = '100%'
      document.documentElement.requestFullscreen()
      this.isFullScreenMode = true
    },

    fullScreenMode(isActive) {
      return {
        invisible: isActive,
      }
    },

    updateFullScreenLayOut() {
      this.reavleInstance.value.configure({ controls: false })
      this.isFullScreenMode = false
      document.querySelector('.reveal').style.width = '90vw'
      document.querySelector('.reveal').style.height = '90%'
    },

    fullScreenExitHandler() {
      if (
        document.webkitIsFullScreen === false ||
        document.mozFullScreen === false ||
        document.msFullscreenElement === false
      ) {
        this.updateFullScreenLayOut()
      }
      this.reavleInstance.value.layout()
    },

    showSlideControlls(event) {
      if (
        (document.webkitIsFullScreen ||
          document.mozFullScreen ||
          document.msFullscreenElement) &&
        (event.movementX > 20 || event.movementY > 20)
      ) {
        this.reavleInstance.value.configure({ controls: true })
        this.reavleInstance.value.sync()
      }
    },

    displayOverview(slideId) {
      this.$router.push({
        name: this.$route.params.hyperLink ? 'linkOverview' : 'slideOverview',
        params: {
          slideId: slideId,
          presentationId: this.presentationId,
          hyperLink: this.$route.params.hyperLink?.replace('-', ' '),
          clientName: this.$route.params.clientName?.replace('-', ' '),
        },
      })
    },
  },
}
</script>
