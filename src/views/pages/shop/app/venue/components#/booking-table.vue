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
          <div v-for="(i, inx) in item.site_data" :key="ikey(item, inx)">
            <div
              :key="ikey(item, inx)"
              :class="[
                content('row'),
                rowClass(i),
                { act: selectedId.includes(item.site_id + '-' + inx) }
              ]"
              @click="selectHandler(i, inx, item)"
              v-html="titleFilter(i)"
            ></div>
          </div>
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
    query: {
      type: Object,
      default: () => {
        return {
          reserve_day: ''
        }
      }
    }
  },
  computed: {
    reserve_day() {
      return this.query.reserve_day
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
    titleFilter(i) {
      if (i.status === 1) return '不可约'
      if (i.status === 2) return '&yen;' + i.price
      if (i.status === 3) return i.member_name
    },
    rowClass(i) {
      if (i.status === 1) return this.content('row-unreserve')
      if (i.status === 2) return this.content('row-action')
      if (i.status === 3) return this.content('row-reserved')
    },
    ikey(item, inx) {
      return item.site_id + '-' + this.reserve_day + '-' + inx
    },
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
      if (time.status !== 2) return
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
