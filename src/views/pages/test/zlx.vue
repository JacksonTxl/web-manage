<template>
  <st-panel class='demo-app'>
    <st-t2>课程列表（品牌）</st-t2>
    <p class="mg-t8">
      <router-link to="/brand/product/course/personal/list/brand">私教课 品牌私教课库</router-link>
      <router-link class="mg-l8" to="src/views/pages/brand/product/course/personal/list/brand">私教课 场馆私教课库</router-link>
      <router-link class="mg-l8" to="/brand/product/course/personal/info">私教课详情</router-link>
      <router-link to="/brand/product/course/team/list/brand">团课课 品牌团课课库</router-link>
      <router-link class="mg-l8" to="/brand/product/course/team/list/brand">团课课 场馆团课课库</router-link>
      <router-link class="mg-l8" to="/brand/product/course/team/info">团课课详情</router-link>
    </p>
    <st-t2>员工列表(品牌)</st-t2>
    <p class="mg-t8">
      <router-link to="/shop/product/course/schedule/team">团课排期</router-link>
      <router-link class="mg-l8" to="/shop/product/course/schedule/personal">私教1v1</router-link>
      <router-link class="mg-l8" to="/shop/product/course/schedule/personal-team">私教小团课</router-link>
    </p>
    <st-t2>课程排期</st-t2>
    <p class="mg-t8">
      <router-link to="/shop/product/course/schedule/team">团课排期</router-link>
      <router-link class="mg-l8" to="/pages/shop/product/course/schedule/personal">私教1v1</router-link>
      <router-link class="mg-l8" to="/pages/shop/product/course/schedule/personal-team">私教小团课</router-link>
    </p>
    <div class='demo-app-top'>
      <button @click="toggleWeekends">toggle weekends</button>
      <button @click="gotoPast">go to a date in the past</button>
      (also, click a date/time to add an event)
    </div>
      <TimePicker></TimePicker>
    <FullCalendar
      class='demo-app-calendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="calendarEvents"
      @dateClick="handleDateClick"
      />
      <st-shop-hour-picker></st-shop-hour-picker>
  </st-panel>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import TimePicker from './zlx/timepicker#/index'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    TimePicker
  },
  data: function() {
    return {
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
      ]
    }
  },
  methods: {
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    }
  }
}
</script>

<style lang='less'>

// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-top {
  margin: 0 0 3em;
}

.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}

</style>
