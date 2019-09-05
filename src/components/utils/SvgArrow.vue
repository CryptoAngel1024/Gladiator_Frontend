<template>
  <svg :height="height" :width="validWidth">
    <polygon :points="points" :style="style" />
    <text
      x="30"
      :y="height / 1.8"
      fill="black"
      font-size="1rem"
      font-weight="bold"
    >
      {{ name }}
    </text>

    Sorry, your browser does not support inline SVG.
  </svg>
</template>

<script>
export default {
  name: 'SvgArrow',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    width: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      height: 109,
    }
  },
  computed: {
    points() {
      const offsetTop = this.height * 0.2
      const offsetBottom = this.height * 0.8
      const offsetMid = this.height * 0.2
      return `0,${offsetTop} ${this.width - offsetMid},${offsetTop} ${
        this.width
      },${this.height / 2}, ${
        this.width - offsetMid
      },${offsetBottom} 0,${offsetBottom} ${offsetMid},${this.height / 2}`
    },
    style() {
      return `fill:${this.color};`
    },
    validWidth() {
      return this.width > 130 ? this.width : 130
    },
  },
}
</script>
