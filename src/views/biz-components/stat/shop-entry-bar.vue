<template>
  <div class="stat-shop-entry-bar">
    <div class="stat-shop-entry-bar__item" v-for="item in data" :key="item.name">
      <label class="stat-shop-entry-bar__name">{{item.name}}</label>
      <div class="stat-shop-entry-bar__bar">
        <div class="stat-shop-entry-bar__progress">
          <div class="stat-shop-entry-bar__progress-inner" :style="progressStyle(item)"></div>
        </div>
        <div class="stat-shop-entry-bar__value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @example
     * [{name:'08:00之前',value:128},{name:'08:00-12:00',value:132}]
     */
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    maxValue() {
      return Math.max(...this.data.map(item => +item.value))
    }
  },
  methods: {
    progressStyle(item) {
      return {
        width: `${(item.value / this.maxValue) * 100}%`
      }
    }
  }
}
</script>
