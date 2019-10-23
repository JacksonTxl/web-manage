<template>
  <ul :class="b()">
    <li
      v-for="(item, index) in entries"
      :key="index"
      :class="b('item')"
      @click="goToPage(item)"
    >
      <div>
        <img :src="item.icon" :alt="item.text" :class="b('item-icon')" />
      </div>
      <div :class="b('item-text')">{{ item.text }}</div>
    </li>
  </ul>
</template>

<script>
import { entries } from './fast-entry.config'
import FastEntryMiniProgram from '@/views/biz-modals/fast-entry/mini-program'
import FastEntryHousekeeper from '@/views/biz-modals/fast-entry/housekeeper'
export default {
  name: 'FastEntry',
  bem: {
    b: 'layout-fast-entry'
  },
  data() {
    return {
      entries
    }
  },
  modals: {
    FastEntryMiniProgram,
    FastEntryHousekeeper
  },
  methods: {
    goToPage(item) {
      if (item.openProgram !== 'help') {
        this.$emit('goToPage')
      }
      if (item.url) {
        window.open(item.url)
        return
      }
      if (item.openProgram === 'miniProgram') {
        this.$modalRouter.push({
          name: 'fast-entry-mini-program',
          props: {},
          on: {}
        })
        return
      }
      if (item.openProgram === 'housekeeper') {
        this.$modalRouter.push({
          name: 'fast-entry-housekeeper',
          props: {},
          on: {}
        })
        return
      }
    }
  }
}
// 做法问题备注：如何关系快速入口
// 如何把按钮置灰
// 是否要改置灰后的基本手型
// 入口的svg icon
</script>
