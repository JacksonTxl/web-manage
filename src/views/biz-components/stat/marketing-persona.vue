<template>
  <div class="stat-marketing-persona" :style="{height}">
    <!-- 用户画像 -->
    <img class="stat-marketing-persona__avatar" :src="src" alt="avatar">
    <div class="stat-marketing-persona__area">
      <div
        class="stat-marketing-persona__tag-box"
        v-for="(item,idx) in data"
        :key="item.name"
        :style="tagBoxStyle(idx)"
      >
        <span class="stat-marketing-persona__tag" :style="tagStyle(idx)">{{item.name}}</span>
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

<style lang='less'>
.stat-marketing-persona {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &__avatar {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }
  &__area {
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__tag-box {
    position: absolute;
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-of-type(1) .stat-marketing-persona__tag {
      background: linear-gradient(90deg, #22b4ce 0%, #39e1c7 100%);
    }
    &:nth-child(2) .stat-marketing-persona__tag {
      background: linear-gradient(270deg, #739ffb 0%, #3f66f6 100%);
    }
    &:nth-child(3) .stat-marketing-persona__tag {
      background: linear-gradient(264deg, #c87fff 0%, #798aff 100%);
    }
    &:nth-child(4) .stat-marketing-persona__tag {
      background: linear-gradient(90deg, #22b4ce 0%, #39e1c7 100%);
    }
    &:nth-child(5) .stat-marketing-persona__tag {
      background: linear-gradient(270deg, #739ffb 0%, #3f66f6 100%);
    }
    &:nth-child(6) .stat-marketing-persona__tag {
      background: linear-gradient(264deg, #c87fff 0%, #798aff 100%);
    }
    &:nth-child(7) .stat-marketing-persona__tag {
      background: linear-gradient(270deg, #739ffb 0%, #3f66f6 100%);
    }
  }
  &__tag {
    position: absolute;
    font-size: 14px;
    line-height: 22px;
    color: white;
    padding: 5px 16px;
    border-radius: 16px 0px 16px 0px;

    transform: rotate(0deg) translate(0px);
  }
}
</style>
