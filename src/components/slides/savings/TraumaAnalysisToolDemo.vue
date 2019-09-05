<template>
  <section class="h-full slide-1-container slide-section-16">
    <!-- content div -->
    <div class="flex flex-col h-full justify-between pb-2">
      <header class="flex justify-end py-3 pr-4 ml-16">
        <div class="flex justify-between">
          <img class="h-12" src="/src/assets/jnjIcons/dollar.png" />
          <p class="text-base text-center font-bold text-blue-900">
            <span class="block pl-2">SAV</span>8
          </p>
        </div>
      </header>
      <div>
        <div class="flex flex-row h-32 width-48 bg-gray-50 bg-opacity-80">
          <div class="w-2/5 pl-4 pr-4 mt-9 bColor">
            <img
              src="@/assets/images/truma3.jpg"
              alt=""
              class="opacity-100 bg-gray-50"
            />
          </div>
          <div class="px-2 mt-9 w-3/5">
            <img src="@/assets/images/truma1.png" alt="" class="mb-2" />
            <div class="text-dark-blue text-xl font-bold">How it works</div>
          </div>
        </div>
        <img src="@/assets/images/truma2.png" alt="" class="width-49 -mt-2" />
        <div class="flex flex-row mx-3 mt-4">
          <div class="flex-1 text-left">
            <p class="text-xxs flt">
              For demonstration purposes only. Actual results may vary depending
              on hospital efficiency.
            </p>
            <p class="text-xxs flt">
              This document contains confidential and proprietary trade secrets
              of DePuy Synthes Sales, Inc. Its contents may not be disclosed by
              an authorized recipient without prior written consent of DePuy
              Synthes.
            </p>
          </div>
          <div class="flex-1">
            <p class="text-white text-xs text-right">
              © DePuy Synthes 2020. All rights reserved. 144492-200623 DSUS
            </p>
            <p class="text-white text-xs text-right">
              The third party trademarks used herein are the trademarks of their
              respective owners.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- First fragment -->
    <div id="fragment1" class="fragment" data-fragment-index="1">
      <div
        id="fragment1-gray-transition"
        class="slider-wrapper bg-black opacity-0 -mt-100"
      />
      <div
        id="fragment1-animation2"
        class="slider-wrapper flex flex-col justify-start mb-16"
      >
        <div
          class="title font-bold text-white text-4xl mt-12 flex flex-row justify-center"
        >
          <p
            class="bg-gray-900 rounded-md bg-opacity-60 px-6 w-1/3 text-center py-2"
          >
            How it works
          </p>
        </div>
      </div>
      <div
        id="fragment1-animation3"
        class="slider-wrapper flex flex-col justify-center pr-14 items-end"
      >
        <img
          src="@/assets/images/slides/saving/sav8-table.png"
          alt=""
          class="width-45"
        />
      </div>
    </div>

    <!-- Second fragment -->
    <div id="fragment2" class="fragment" data-fragment-index="2">
      <div
        id="fragment2-animation1"
        class="slider-wrapper flex flex-col justify-center pr-5 items-end -mt-90"
      >
        <div class="w-1/2 h-90">
          <div class="absolute opacity-1 toobar-container width-50 h-90">
            <img
              v-for="(tool, i) in toolData"
              :key="i"
              :class="tool.class"
              :src="tool.src"
              alt="alt"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Left tools -->
    <div id="fragment3" class="fragment" data-fragment-index="3">
      <div
        class="flex flex-row slider-wrapper justify-center pr-5 items-center -mt-97"
      >
        <div id="fragment2-start"></div>
        <div class="pl-8 pb-12 w-1/2">
          <div
            v-for="(imagesTool, i) in imagesTools"
            :id="imagesTool.id"
            :key="i"
            :class="
              showTools[i]
                ? 'inline-block pr-12 py-1 w-1/2 display'
                : 'inline-block pr-12 py-1 w-1/2 opacity-0'
            "
          >
            <img :src="imagesTool.src" class="w-full" />
          </div>
        </div>
        <div class="w-1/2 h-90">
          <div class="width-50 h-90 absolute opacity-1 toobar-container">
            <img
              v-for="(tool, i) in toolData.slice(0, 5)"
              :id="tool.id"
              :key="i"
              :class="[showTool1[i] ? `effect1-${i + 1}` : '', tool.class]"
              :src="tool.src"
              alt="alt"
            />
            <img
              v-for="(tool, i) in toolData.slice(5, 14)"
              :id="tool.id"
              :key="i"
              :class="[showTool3[i] ? `effect3-${i + 1}` : '', tool.class]"
              :src="tool.src"
              alt="alt"
            />
            <img
              v-for="(tool, i) in toolData.slice(14, 23)"
              :id="tool.id"
              :key="i"
              :class="[showTool4[i] ? `effect4-${i + 1}` : '', tool.class]"
              :src="tool.src"
              alt="alt"
            />
            <img
              v-for="(tool, i) in toolData.slice(23, 32)"
              :id="tool.id"
              :key="i"
              :class="[showTool2[i] ? `effect2-${i + 1}` : '', tool.class]"
              :src="tool.src"
              alt="alt"
            />
          </div>
        </div>
      </div>
      <div
        class="slider-wrapper flex flex-col justify-center pr-2 items-end -mt-90"
      >
        <div
          id="fragment3-animation5"
          class="title-font text-left opacity-0 z-10 mr-4"
          :class="showTexts[0] ? 'display' : ''"
        >
          Benefits of Procedural Analysis:
        </div>
        <ul class="content-font list-disc text-left mt-6 z-10 mr-6">
          <li
            id="fragment3-animation6"
            class="my-2 opacity-0"
            :class="showTexts[1] ? 'display' : ''"
          >
            Standardized approach using your hospital’s spend data
          </li>
          <li
            id="fragment3-animation7"
            class="my-2 opacity-0"
            :class="showTexts[2] ? 'display' : ''"
          >
            Consistent outputs make it easy to compare total procedure costs
            across vendors
          </li>
          <li
            id="fragment3-animation8"
            class="my-2 opacity-0"
            :class="showTexts[3] ? 'display' : ''"
          >
            Transparency of the data helps uncover possible unnecessary expenses
            such as instruments
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Text in Fragment 3 -->
    <div
      id="fragment4"
      data-fragment-index="4"
      class="fragment slider-wrapper flex justify-center items-center -mt-98"
    >
      <img
        id="fragment4-animation1"
        class="pb-20 z-20"
        src="@/assets/images/slides/saving/sav8-background.png"
        alt=""
      />
    </div>
  </section>
</template>
<script>
import toolData from '@/data/slideContent/sav8slide'
import tool1 from '@/assets/images/slides/saving/sav8-tool1.png'
import tool2 from '@/assets/images/slides/saving/sav8-tool2.png'
import tool3 from '@/assets/images/slides/saving/sav8-tool3.png'
import tool4 from '@/assets/images/slides/saving/sav8-tool4.png'

const elementFragment1Animation3 = () =>
  document.getElementById('fragment1-animation3')
const elementFragment2Animation1 = () =>
  document.getElementById('fragment2-animation1')
const elementFragment1Animation2 = () =>
  document.getElementById('fragment1-animation2')

export default {
  props: {
    isAnimated: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toolData: toolData,
      showTools: [],
      showTexts: [],
      showTool1: [],
      showTool2: [],
      showTool3: [],
      showTool4: [],
      imagesTools: [
        {
          id: 'fragment3-animation1',
          src: tool1,
        },
        {
          id: 'fragment3-animation2',
          src: tool2,
        },
        {
          id: 'fragment3-animation3',
          src: tool3,
        },
        {
          id: 'fragment3-animation4',
          src: tool4,
        },
      ],
    }
  },

  mounted() {
    let currentState = [false, false, false, false, false]
    let section = document.getElementsByClassName('slide-section-16')[0]
    let tools = []
    let tool1 = []
    let tool3 = []
    let tool4 = []
    let tool2 = []
    let texts = []
    let fragment1 = document.getElementById('fragment1')
    let fragment2 = document.getElementById('fragment2')
    let fragment3 = document.getElementById('fragment3')
    let fragment4 = document.getElementById('fragment4')
    let animation1_1 = document
      .getElementById('fragment1-gray-transition')
      .animate([{ opacity: 0.2 }, { opacity: 0.3 }, { opacity: 0.2 }], {
        duration: 600,
      })
    // Animation for title
    let animation1_2 = elementFragment1Animation2().animate(
      [{ opacity: 0 }, { opacity: 0 }],
      {
        duration: 0,
      },
    )
    animation1_2.onfinish = () => {
      elementFragment1Animation2().style.opacity = '1'
    }

    // Animation for image
    let animation1_3 = elementFragment1Animation3().animate(
      [{ opacity: 0 }, { opacity: 0 }],
      {
        duration: 0,
      },
    )
    animation1_3.onfinish = () => {
      elementFragment1Animation3().style.opacity = '1'
    }

    // Second fragment animation
    let animation2_1 = elementFragment2Animation1().animate(
      [{ opacity: 0 }, { opacity: 0 }],
      {
        duration: 0,
      },
    )
    animation2_1.onfinish = () => {
      elementFragment2Animation1().style.opacity = '1'
      if (animationFlag) {
        init()
      }
    }
    let animation3_1 = document
      .getElementById('fragment2-start')
      .animate([{ opacity: 0 }, { opacity: 0 }], {
        duration: 0,
      })
    let animationFlag = false
    animation3_1.onfinish = () => {
      animationFlag = true
      if (animationFlag) {
        init()
        animationFunc()
      }
    }

    //animation init function

    const init = () => {
      this.showTools = []
      this.showTool1 = []
      this.showTool3 = []
      this.showTool4 = []
      this.showTool2 = []
      this.showTexts = []
      for (let i = 0; i < 4; i++) {
        clearTimeout(tools[i])
        tools[i] = 0
      }
      for (let i = 0; i < 5; i++) {
        clearTimeout(tool1[i])
        tool1[i] = 0
      }
      for (let i = 0; i < 9; i++) {
        clearTimeout(tool3[i])
        tool3[i] = 0
        clearTimeout(tool4[i])
        tool4[i] = 0
        clearTimeout(tool2[i])
        tool2[i] = 0
      }
      for (let i = 0; i < 4; i++) {
        clearTimeout(texts[i])
        texts[i] = 0
      }
    }

    //animation function
    const animationFunc = () => {
      for (let i = 0; i < 4; i++) {
        tools[i] = setTimeout(() => {
          this.showTools.push(true)
        }, i * 3000 + 150)
      }
      for (let i = 0; i < 5; i++) {
        tool1[i] = setTimeout(() => {
          this.showTool1.push(true)
        }, i * 10 + 250)
      }

      for (let i = 0; i < 9; i++) {
        tool3[i] = setTimeout(() => {
          this.showTool3.push(true)
        }, i * 10 + 3250)
      }

      for (let i = 0; i < 9; i++) {
        tool4[i] = setTimeout(() => {
          this.showTool4.push(true)
        }, i * 10 + 6250)
      }

      for (let i = 0; i < 9; i++) {
        tool2[i] = setTimeout(() => {
          this.showTool2.push(true)
        }, 9250)
      }
      for (let i = 0; i < 4; i++) {
        texts[i] = setTimeout(() => {
          this.showTexts.push(true)
        }, (i + 1) * 1000 + 11250)
      }
    }
    // Fourth fragment animation
    let animation4_1 = document
      .getElementById('fragment4-animation1')
      .animate([{ opacity: 0 }, { opacity: 0 }], {
        duration: 0,
      })
    animation4_1.onfinish = () => {
      document.getElementById('fragment4-animation1').style.opacity = '1'
      if (animationFlag) {
        init()
      }
    }

    animation1_1.onfinish = () => {
      animation1_2.play()
      animation1_3.play()
    }
    setInterval(() => {
      if (!section?.classList.contains('present')) {
        try {
          elementFragment1Animation2().style.opacity = '0'
          elementFragment1Animation3().style.opacity = '0'
          elementFragment2Animation1().style.opacity = '0'

          document.getElementById('fragment3-animation1').style.opacity = '0'
          document.getElementById('fragment3-animation2').style.opacity = '0'
          document.getElementById('fragment3-animation3').style.opacity = '0'
          document.getElementById('fragment3-animation4').style.opacity = '0'
        } catch (err) {
          // console.error(err)
        }
      } else {
        manageAnimations(fragment1, 1)
        manageAnimations(fragment2, 2)
        manageAnimations(fragment3, 3)
        manageAnimations(fragment4, 4)
      }
    }, 1000)

    function manageAnimations(fragment, index) {
      if (!fragment?.classList.contains('current-fragment')) {
        currentState[index] = false
        return
      }
      if (currentState[index] === true) return
      currentState[index] = true
      // Slide changed
      if (index == 1) animation1_1.play()
      else if (index == 2) {
        elementFragment1Animation3().style.opacity = '0'
        animation2_1.play()
      } else if (index == 3) animation3_1.play()
      else if (index == 4) animation4_1.play()
    }
  },
}
</script>

<style scoped lang="postcss">
.reveal .slides section .fragment {
  transition: none !important;
}
.slider-wrapper {
  @apply w-full h-full left-0 top-0;
}

.slide-1-container {
  background: url('@/assets/images/slides/saving/sav8-background.jpg') no-repeat
    center center;
  background-size: cover;
  background-position: top;
}

.toobar-container {
  background: url('@/assets/images/slides/saving/sav8-toolkits-bk.png')
    no-repeat;
  background-size: 100% 100%;
}
@keyframes keyeffect1 {
  to {
    transform: translateX(-613px) translateY(15px);
  }
}
.effect1-1 {
  animation: keyeffect1 2s ease forwards !important;
}
@keyframes keyeffect2 {
  to {
    transform: translateX(-630px) translateY(-175px);
  }
}
.effect1-2 {
  animation: keyeffect2 2s ease forwards !important;
}
@keyframes keyeffect3 {
  to {
    transform: translateX(-800px) translateY(-115px);
  }
}
.effect1-3 {
  animation: keyeffect3 2s ease forwards !important;
}
@keyframes keyeffect4 {
  to {
    transform: translateX(-700px) translateY(-190px);
  }
}
.effect1-4 {
  animation: keyeffect4 2s ease forwards !important;
}
@keyframes keyeffect5 {
  to {
    transform: translateX(-920px) translateY(-30px);
  }
}
.effect1-5 {
  animation: keyeffect5 2s ease forwards !important;
}

@keyframes keyeffect21 {
  to {
    transform: translateX(-490px) translateY(-50px);
  }
}
.effect2-1 {
  animation: keyeffect21 2s ease forwards !important;
}
@keyframes keyeffect22 {
  to {
    transform: translateX(-645px) translateY(-25px);
  }
}
.effect2-2 {
  animation: keyeffect22 2s ease forwards !important;
}
@keyframes keyeffect23 {
  to {
    transform: translateX(-340px) translateY(-50px);
  }
}
.effect2-3 {
  animation: keyeffect23 2s ease forwards !important;
}
@keyframes keyeffect24 {
  to {
    transform: translateX(-240px) translateY(5px);
  }
}
.effect2-4 {
  animation: keyeffect24 2s ease forwards !important;
}
@keyframes keyeffect25 {
  to {
    transform: translateX(-725px) translateY(75px);
  }
}
.effect2-5 {
  animation: keyeffect25 2s ease forwards !important;
}
@keyframes keyeffect26 {
  to {
    transform: translateX(-433px) translateY(63px);
  }
}
.effect2-6 {
  animation: keyeffect26 2s ease forwards !important;
}
@keyframes keyeffect27 {
  to {
    transform: translateX(-660px) translateY(85px);
  }
}
.effect2-7 {
  animation: keyeffect27 2s ease forwards !important;
}
@keyframes keyeffect28 {
  to {
    transform: translateX(-240px) translateY(-30px);
  }
}
.effect2-8 {
  animation: keyeffect28 2s ease forwards !important;
}
@keyframes keyeffect29 {
  to {
    transform: translateX(-640px) translateY(0px);
  }
}
.effect2-9 {
  animation: keyeffect29 2s ease forwards !important;
}

@keyframes keyeffect31 {
  to {
    transform: translateX(-350px) translateY(-150px);
  }
}
.effect3-1 {
  animation: keyeffect31 2s ease forwards !important;
}
@keyframes keyeffect32 {
  to {
    transform: translateX(-265px) translateY(0px);
  }
}
.effect3-2 {
  animation: keyeffect32 2s ease forwards !important;
}
@keyframes keyeffect33 {
  to {
    transform: translateX(-533px) translateY(8px);
  }
}
.effect3-3 {
  animation: keyeffect33 2s ease forwards !important;
}
@keyframes keyeffect34 {
  to {
    transform: translateX(-470px) translateY(-110px);
  }
}
.effect3-4 {
  animation: keyeffect34 2s ease forwards !important;
}
@keyframes keyeffect35 {
  to {
    transform: translateX(-465px) translateY(-40px);
  }
}
.effect3-5 {
  animation: keyeffect35 2s ease forwards !important;
}
@keyframes keyeffect36 {
  to {
    transform: translateX(-676px) translateY(-210px);
  }
}
.effect3-6 {
  animation: keyeffect36 2s ease forwards !important;
}
@keyframes keyeffect37 {
  to {
    transform: translateX(-320px) translateY(-205px);
  }
}
.effect3-7 {
  animation: keyeffect37 2s ease forwards !important;
}
@keyframes keyeffect38 {
  to {
    transform: translateX(-430px) translateY(30px);
  }
}
.effect3-8 {
  animation: keyeffect38 2s ease forwards !important;
}
@keyframes keyeffect39 {
  to {
    transform: translateX(-230px) translateY(-5px);
  }
}
.effect3-9 {
  animation: keyeffect39 2s ease forwards !important;
}

@keyframes keyeffect41 {
  to {
    transform: translatex(-920px) translatey(150px);
  }
}
.effect4-1 {
  animation: keyeffect41 2s ease forwards !important;
}
@keyframes keyeffect42 {
  to {
    transform: translateX(-660px) translateY(100px);
  }
}
.effect4-2 {
  animation: keyeffect42 2s ease forwards !important;
}
@keyframes keyeffect43 {
  to {
    transform: translateX(-930px) translateY(140px);
  }
}
.effect4-3 {
  animation: keyeffect43 2s ease forwards !important;
}
@keyframes keyeffect44 {
  to {
    transform: translateX(-930px) translateY(70px);
  }
}
.effect4-4 {
  animation: keyeffect44 2s ease forwards !important;
}
@keyframes keyeffect45 {
  to {
    transform: translateX(-855px) translateY(-60px);
  }
}
.effect4-5 {
  animation: keyeffect45 2s ease forwards !important;
}
@keyframes keyeffect46 {
  to {
    transform: translateX(-625px) translateY(80px);
  }
}
.effect4-6 {
  animation: keyeffect46 2s ease forwards !important;
}
@keyframes keyeffect47 {
  to {
    transform: translateX(-900px) translateY(155px);
  }
}
.effect4-7 {
  animation: keyeffect47 2s ease forwards !important;
}
@keyframes keyeffect48 {
  to {
    transform: translateX(-950px) translateY(210px);
  }
}
.effect4-8 {
  animation: keyeffect48 2s ease forwards !important;
}

@keyframes keyeffect49 {
  to {
    transform: translateX(-665px) translateY(195px);
  }
}
.effect4-9 {
  animation: keyeffect49 2s ease forwards !important;
}

.display {
  opacity: 1 !important;
}
/* The element to apply the animation to*/
.resource {
  color: #212121;
}

.bColor {
  border-left-color: #8f8f8f;
  border-left-width: 1px;
}

.aTool {
  color: #c8102e;
}

.flt {
  color: #bfbfbf;
}

.width-45 {
  width: 45%;
}
.width-48 {
  width: 48%;
}
.width-49 {
  width: 48.7%;
}

.-mt-100 {
  margin-top: -45rem;
}
.-mt-98 {
  margin-top: -29rem;
}
.-mt-97 {
  margin-top: -24.05rem;
}
.-mt-90 {
  margin-top: -22rem;
}
.width-50 {
  width: calc(46.7%);
}
.title-font {
  font-size: 30px;
  line-height: 34px;
  width: 600px;
}
.content-font {
  font-size: 22px;
  line-height: 30px;
  width: 500px;
  margin-right: 80px;
}
</style>
