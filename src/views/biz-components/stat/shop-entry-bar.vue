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

<style lang='less'>
.stat-shop-entry-bar {
  &__item {
    display: flex;
    align-items: center;
    &:nth-child(n + 2) {
      margin-top: 20px;
    }
  }
  &__name {
    flex: 0 0 90px;
    font-size: 14px;
    color: #3e4d5c;
    line-height: 22px;
    margin-right: 24px;
  }

  &__bar {
    flex: 1;
    display: flex;
    align-items: center;
    height: 8px;
    padding-right: 8px;
    background: #e2effe;
    border-radius: 4px;
  }
  &__progress {
    flex: 1;
    height: 100%;
  }
  &__value {
    font-family: bebas;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    color: #3f66f6;
    margin-left: 8px;
  }

  &__progress-inner {
    width: 0%;
    transition: width 0.5s;
    border-radius: 4px;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(63, 102, 246, 0) 0%,
      rgba(63, 102, 246, 1) 100%
    );
  }
}
</style>
