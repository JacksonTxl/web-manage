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
    <div
      :class="content()"
      id="booking-left-content"
      v-scrollBar="{ suppressScrollX: false }"
      @scroll="scrollHandler"
    >
      <div
        :class="content('column')"
        v-for="(item, index) in data"
        :key="index"
      >
        <div v-for="(i, inx) in item.site_data" :key="inx">
          <div
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
            v-if="i.status === 3"
            :class="[content('row'), content('row-reserved')]"
          >
            {{ i.member_name }}
          </div>
          <div
            v-if="i.status === 1"
            :class="[content('row'), content('row-unreserve')]"
          >
            不可约
          </div>
        </div>
      </div>
      <st-no-data v-if="!data.length"></st-no-data>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash-es'
export default {
  name: 'bookingTable',
  bem: {
    b: 'page-shop-app-venue-booking-table',
    top: 'page-shop-app-venue-booking-table__top',
    left: 'page-shop-app-venue-booking-table__left',
    content: 'page-shop-app-venue-booking-table__content'
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
      const leftCalendar = document.getElementById('booking-left-calendar')
      const leftContent = document.getElementById('booking-left-content')
      const height =
        left.offsetHeight -
        leftVenue.offsetHeight -
        leftCalendar.offsetHeight -
        32 +
        'px'
      leftContent.style.height = height
      this.$refs.left.style.height = height
    },
    scrollHandler: throttle(function(e) {
      console.log(e)
      const { scrollTop, scrollLeft } = e.target
      this.$refs.top.scroll(scrollLeft, 0)
      this.$refs.left.scroll(0, scrollTop)
    }, 33),
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
