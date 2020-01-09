<template>
  <div :class="b()">
    <div :class="top()" ref="top">
      <div :class="top('item')" v-for="(item, index) in siteX" :key="index">
        {{ item.site_name }}
      </div>
    </div>
    <div :class="left()" ref="left">
      <div :class="left('item')" v-for="(item, index) in siteY" :key="index">
        {{ item }}
      </div>
    </div>
    <div :class="[content(), { 'no-border': !data.length }]">
      <div
        :class="content('scroll')"
        id="booking-left-content"
        v-scrollBar="{ suppressScrollX: false }"
        @scroll="scrollHandler"
      >
        <div
          :class="content('column')"
          v-for="(item, index) in data"
          :key="index"
        >
          <template v-for="(i, inx) in item.site_data">
            <div
              :key="item.site_id + '-' + reserve_day + '-' + inx"
              v-if="i.status === 2"
              :class="[
                content('row'),
                content('row-action'),
                { act: selectedId.includes(item.site_id + '-' + inx) }
              ]"
              @click="selectHandler(i, inx, item)"
            >
              ¥{{ i.price }}
            </div>
            <div
              :key="item.site_id + '-' + reserve_day + '-' + inx"
              v-if="i.status === 3"
              :class="[content('row'), content('row-reserved')]"
            >
              {{ i.member_name }}
            </div>
            <div
              :key="item.site_id + '-' + reserve_day + '-' + inx"
              v-if="i.status === 1"
              :class="[content('row'), content('row-unreserve')]"
            >
              不可约
            </div>
          </template>
        </div>
        <st-no-data v-if="!data.length"></st-no-data>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle, debounce } from 'lodash-es'
export default {
  name: 'bookingTable',
  bem: {
    b: 'page-shop-app-venue-booking-table',
    top: 'top',
    left: 'left',
    content: 'content'
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    siteX: {
      type: Array,
      default: () => []
    },
    siteY: {
      type: Array,
      default: () => []
    },
    reserve_day: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      selectedList: [],
      selectedId: []
    }
  },
  mounted() {
    this.calcLeftHeight()
    window.addEventListener('resize', this.calcLeftHeight, false)
  },
  methods: {
    calcLeftHeight() {
      const left = document.getElementById('booking-left')
      const leftVenue = document.getElementById('booking-left-venue')
      const leftContent = document.getElementById('booking-left-content')
      const height = left.offsetHeight - leftVenue.offsetHeight - 139
      leftContent.style.height = height + 'px'
      this.$refs.left.style.height = height + 22 + 'px'
    },
    scrollHandler: throttle(function(e) {
      console.log(e)
      const { scrollTop, scrollLeft } = e.target
      this.$refs.top.scroll(scrollLeft, 0)
      this.$refs.left.scroll(0, scrollTop)
      this.emitNextPage(e)
    }, 33),
    emitNextPage: debounce(function(e) {
      const { target } = e
      if (
        Math.floor(target.scrollLeft) + target.clientWidth >
        target.scrollWidth - 20
      ) {
        console.log('emit next page')
        this.$emit('nextPage')
      }
    }, 200),
    resetScroll() {
      let content = document.getElementById('booking-left-content')
      let left = this.$refs.left
      let top = this.$refs.top
      content.scrollLeft = 0
      content.scrollTop = 0
      left.scrollTop = 0
      top.scrollLeft = 0
    },
    selectHandler(time, number, site) {
      let index = -1
      time.site_name = site.site_name
      time.id = site.site_id + '-' + number
      this.selectedList.forEach((item, inx) => {
        if (item.id === time.id) {
          index = inx
        }
      })
      if (index === -1) {
        this.selectedList.push(time)
        this.selectedId.push(time.id)
      } else {
        this.selectedList.splice(index, 1)
        this.selectedId.splice(index, 1)
      }
      this.$emit('change', this.selectedList)
    },
    deleteRow(index) {
      this.selectedList.splice(index, 1)
      this.selectedId.splice(index, 1)
      this.$emit('change', this.selectedList)
    },
    deleteAll() {
      this.selectedList = []
      this.selectedId = []
      this.$emit('change', this.selectedList)
    }
  }
}
</script>
