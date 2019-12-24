<!-- 九宫格 -->
<template>
  <a-menu class="layout-fast-entry">
    <a-menu-item
      v-for="(item, id) in iconList"
      :key="id"
      class="layout-fast-entry__item"
      :class="iconClassFilter(item)"
      @click="goToPage(item)"
      :disabled="!item.enable"
    >
      <div class="layout-fast-entry__pic">
        <img
          :src="item.enable ? item.icon : item.disable_icon"
          :alt="item.text"
          class="layout-fast-entry__pic-img"
        />
      </div>
      <div class="layout-fast-entry__text">{{ item.text }}</div>
    </a-menu-item>
  </a-menu>
</template>
<script>
import { FastEntryService } from './fast-entry.service'
import { UdeskService } from '@/services/udesk.service'
import FastEntryMiniProgram from '@/views/biz-modals/fast-entry/mini-program'
import FastEntryHousekeeper from '@/views/biz-modals/fast-entry/housekeeper'
export default {
  name: 'FastEntry',
  serviceInject() {
    return {
      fastEntryService: FastEntryService,
      udeskService: UdeskService
    }
  },
  rxState() {
    return {
      iconList: this.fastEntryService.iconList$
    }
  },
  created() {
    this.fastEntryService.getList().subscribe()
  },
  modals: {
    FastEntryMiniProgram,
    FastEntryHousekeeper
  },
  methods: {
    iconClassFilter(item) {
      return !item.enable
        ? 'layout-fast-entry__disabled'
        : 'layout-fast-entry__activity'
    },
    goToPage(item) {
      if (item.url) {
        window.open(item.url)
      }
      if (item.open_program === 'mini_program') {
        const urlData = item
        this.$modalRouter.push({
          name: 'fast-entry-mini-program',
          props: {
            urlData
          }
        })
      }
      if (item.open_program === 'house_keeper') {
        this.$modalRouter.push({
          name: 'fast-entry-housekeeper'
        })
      }
      if (item.open_program === 'export') {
        this.$router.push({
          path: '/common/export'
        })
      }
      if (item.open_program === 'udesk') {
        this.udeskService.setIsShowUdeskBtn(true)
        this.udeskService.show()
      }
    }
  }
}
</script>
