<template>
  <div class='page-team-personal'>
    <FullCalendar
      class='page-team-personal__calendar'
      ref="fullCalendar"
      :defaultView="defaultView"
      :header="header"
      @eventPositioned='onEventPositioned'
      :plugins="calendarPlugins"
      minTime="09:00:00"
      :columnHeaderFormat="columnHeaderFormat"
      locale="zh-cn"
      :views="views"
      maxTime="24:00:00"
      :weekends="calendarWeekends"
      :customButtons="customButtons"
      :slotLabelFormat="slotLabelFormat"
      eventBackgroundColor="#fff"
      @eventClick="onEventClick"
      @eventRender="onEventRender($event)"
      :events="scheduleTeamCourseList"
      @dateClick="handleDateClick"
      />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
import $ from 'jquery'
import { TeamScheduleScheduleService } from './team.service#/schedule.service'

export default {
  name: 'Schedule',
  components: {
    FullCalendar
  },
  serviceInject() {
    return {
      teamScheduleScheduleService: TeamScheduleScheduleService
    }
  },
  rxState() {
    return {
      scheduleTeamCourseList: this.teamScheduleScheduleService.scheduleTeamCourseList$
    }
  },
  data() {
    console.log('this', this)
    const that = this
    return {
      columnHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true },
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        omitZeroMinute: false,
        hour12: false
      },
      defaultView: 'timeGridWeek',
      views: {
        timeGridWeek: { buttonText: '周' },
        timeGridDay: { buttonText: '日' }
      },
      header: {
        left: 'custom1, custom2',
        center: 'prev,next,title',
        right: 'timeGridWeek,timeGridDay, custom4'
      },
      calendarPlugins: [ // plugins must be defined in the JS
        listPlugin,
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      customButtons: {
        custom1: {
          text: '批量排期',
          click() {
            that.$modalRouter.push({ name: 'schedule-team-add-course-schedule-batch' })
          }
        },
        custom2: {
          text: '复制排期',
          click() {
            that.$modalRouter.push({ name: 'schedule-team-copy-schedule' })
          }
        },
        prev: {
          click(e) {
            alert('pre')
          }
        },
        custom3: {
          text: '日历',
          click: () => {
            that.defaultView = 'timeGridWeek'
            that.views = {
              timeGridWeek: { buttonText: '周' },
              timeGridDay: { buttonText: '日' }
            }
            that.$set(that.header, 'right', 'timeGridWeek,timeGridDay, custom4')
            that.$nextTick().then(() => {
              $('.fc-timeGridWeek-button').click()
            })
          }
        },
        custom4: {
          text: '三',
          click() {
            that.defaultView = 'listWeek'
            that.views = {
              listDay: { buttonText: '日' },
              listWeek: { buttonText: '周' }
            }
            that.$set(that.header, 'right', 'listWeek,listDay, custom4')
            that.$nextTick().then(() => {
              that.$router.push({ name: 'shop-product-course-schedule-team-table' })
            })
          }
        }
      },
      calendarWeekends: true,
      calendarEvents: []
    }
  },
  updated() {
    this.$nextTick().then(() => {
      this.setAddButton()
    })
  },
  mounted() {
    this.setAddButton()
    this.gotoPast()
  },
  methods: {
    setAddButton() {
      this.$nextTick().then(() => {
        let cellSize = {
          width: $('.fc-day').width() + 2, // count border pixels
          heigth: $('.fc-slats > table > tbody > tr').height() - 1
        }
        let tmpCellCss = [
          'border: 0px',
          'width:' + (cellSize.width) + 'px',
          'height:' + (cellSize.heigth) + 'px'
        ].join(';')

        let hoverCss = [
          'width:' + (cellSize.width - 6 * 2) + 'px', // 3px padding left, 3px padding right
          'height:' + (cellSize.heigth - 4) + 'px', // 2px padding top, 2px padding bottom
          'line-height:' + (cellSize.heigth - 4) + 'px' // center text vertically
        ].join(';')
        let hoverHtml = '<div class="hover-button" style="' + hoverCss + '">+</div>'

        $('.fc-widget-content').hover(function() {
          if (!$(this).html()) {
            for (let i = 0; i < 7; i++) {
              $(this).append('<td class="temp-cell" style="' + tmpCellCss + '"></td>')
            }

            $(this).children('td').each(function() {
              $(this).hover(function() {
                $(this).html(hoverHtml)
              }, function() {
                $(this).html('')
              })
            })
          }
        }, function() {
          $(this).children('.temp-cell').remove()
        })
      })
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.prev()
    },
    onEventPositioned() {

    },
    onEventRender(event, element) {
      this.$nextTick().then(() => {
        event.el.querySelector('.fc-title').remove()
        event.el.querySelector('.fc-time').remove()
        const item = event.event
        const renderObj = JSON.parse(item.groupId)
        const current = moment().format('HH:mm:SS')
        const courtHtml = renderObj.court_name ? `<div class="court-name"><span class="label">场地: </span><span>${renderObj.court_name}</span></div>` : ''
        let new_description = `<div class="st-schedule-content mg-l8">
                                <div class="time"><a-icon type="clock-circle"></a-icon>${moment(item.start).format('HH:mm')} - ${moment(item.end).format('HH:mm')}</div>
                                <div class="course-name">${item.title}</div>
                                <div class="coach-name"><span class="label">教练: </span><span>${renderObj.coach_name}</span></div>
                                ${courtHtml}
                              </div>`
        let color = ''
        if (moment(item.end) < moment()) {
          color = '#DDDDDD'
        } else if (moment(item.start) < moment() && moment(item.end) > moment()) {
          color = '#FF805B'
        } else if (moment(item.start) > moment()) {
          color = '#3AA0FF'
        }
        event.el.querySelector('.fc-content').innerHTML = new_description
        $(event.el).closest('.fc-time-grid-event').css('border-left', ` 3px ${color} solid`)
      })
    },
    onEventClick(event) {
      this.$modalRouter.push({
        name: 'schedule-team-reserve-info',
        props: {
          id: event.event.id
        },
        on: {
          ok: res => {
            this.calendarEvents.push({
              title: 'New Event',
              start: arg.date,
              allDay: arg.allDay
            })
          }
        }
      })
    },
    handleDateClick(arg) {
      this.$modalRouter.push({
        name: 'schedule-team-add-course-schedule',
        props: {
          time: moment(arg.date)
        },
        on: {
          ok: res => {
            this.calendarEvents.push({
              title: 'New Event',
              start: arg.date,
              allDay: arg.allDay
            })
          }
        }
      })
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
}
.hover-button{
  background-color: rgba(20, 20, 20, 0.10);
  border-radius: 3px;
  color: #9B9B9B;
  position: relative;
  top: 2px;
  left: 5px;
  font-size: 36px;
  cursor: pointer;
}
.fc-content{
  color: #000
}
.fc-time-grid-event.fc-event.fc-start.fc-end{
  background:rgba(255,255,255,0.9);
  box-shadow:0px 0px 10px 0px rgba(56,62,68,0.1);
  border: 0;
  border-left: 3px #FF805B solid;
  border-radius:0px 2px 2px 0px;
}
</style>
