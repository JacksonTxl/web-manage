<template>
  <div class="stat-marketing-persona" :style="{ height }">
    <!-- 用户画像 -->
    <img class="stat-marketing-persona__avatar" :src="src" alt="avatar" />
    <div class="stat-marketing-persona__area">
      <div
        class="stat-marketing-persona__tag-box"
        v-for="(item, idx) in data"
        :key="item.name"
        :style="tagBoxStyle(idx)"
      >
        <span class="stat-marketing-persona__tag" :style="tagStyle(idx)">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * @example
     * 右下角为第一个
     * [{name:'北京市'},{name:'大专'},{name:'00后'}]
     */
    data: {
      type: Array,
      default: () => []
    },
    // 用户头像地址
    src: {
      type: String,
      default: 'https://i02piccdn.sogoucdn.com/8af4ef11ffb1c8b0'
    },
    height: {
      type: String,
      default: '290px'
    }
  },
  computed: {
    perDeg() {
      if (this.data.length <= 1) {
        return 0
      }
      return 360 / this.data.length
    }
  },
  methods: {
    tagBoxStyle(idx) {
      return {
        transform: `rotate(${idx * this.perDeg + 15}deg) translate(88px)`
      }
    },
    tagStyle(idx) {
      return {
        transform: `rotate(-${idx * this.perDeg + 15}deg)`
      }
    }
  }
}
</script>

<style lang="less"></style>
