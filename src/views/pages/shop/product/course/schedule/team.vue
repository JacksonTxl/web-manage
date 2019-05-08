<template>
  <div class='page-team-personal'>
    <FullCalendar
      class='page-team-personal__calendar'
      ref="fullCalendar"
      :defaultView="defaultView"
      :header="header"
      @eventPositioned='onEventPositioned'
      :plugins="calendarPlugins"
      minTime="11:11:00"
      :columnHeaderFormat="columnHeaderFormat"
      locale="zh-cn"
      :views="views"
      maxTime="16:30:00"
      :weekends="calendarWeekends"
      :customButtons="customButtons"
      :slotLabelFormat="slotLabelFormat"
      eventBackgroundColor="#fff"
      @eventClick="onEventClick"
      @eventMouseEnter='onEventMouseEnter'
      @eventMouseLeave='onEventMouseLeave'
      @eventRender="onEventRender($event)"
      :events="calendarEvents"
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

export default {
  name: 'ScheduleTeam',
  components: {
    FullCalendar // make the <FullCalendar> tag available
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
        right: 'timeGridWeek,timeGridDay, custom3,custom4'
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
          click: function() {
            alert('clicked custom button 1!')
          }
        },
        custom2: {
          text: '复制排期',
          click: function() {
            alert('clicked custom button 2!')
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
            that.$set(that.header, 'right', 'timeGridWeek,timeGridDay, custom3,custom4')
            that.$nextTick().then(() => {
              $('.fc-timeGridWeek-button').click()
            })
          }
        },
        custom4: {
          text: '列表',
          click() {
            that.defaultView = 'listWeek'
            that.views = {
              listDay: { buttonText: '日' },
              listWeek: { buttonText: '周' }
            }
            that.$set(that.header, 'right', 'listWeek,listDay, custom3,custom4')
            that.$nextTick().then(() => {
              $('.fc-listWeek-button').click()
            })
          }
        }
      },
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
      ]
    }
  },
  updated() {
    this.setAddButton()
  },
  mounted() {
    this.setAddButton()
    this.gotoPast()
  },
  methods: {
    setAddButton() {
      this.$nextTick().then(() => {
        var cellSize = {
          width: $('.fc-day').width() + 2, // count border pixels
          heigth: $('.fc-slats > table > tbody > tr').height() - 1
        }
        var tmpCellCss = [
          'border: 0px',
          'width:' + (cellSize.width) + 'px',
          'height:' + (cellSize.heigth) + 'px'
        ].join(';')

        var hoverCss = [
          'width:' + (cellSize.width - 6 * 2) + 'px', // 3px padding left, 3px padding right
          'height:' + (cellSize.heigth - 4) + 'px', // 2px padding top, 2px padding bottom
          'line-height:' + (cellSize.heigth - 4) + 'px' // center text vertically
        ].join(';')
        var hoverHtml = '<div class="hover-button" style="' + hoverCss + '">+</div>'

        $('.fc-widget-content').hover(function() {
          if (!$(this).html()) {
            for (var i = 0; i < 7; i++) {
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
      // calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
      // this.$nextTick().then(()=>{
      //   this.$refs.fullCalendar.setOption('locale', 'zh-cn')
      //   this.$refs.fullCalendar.setOption('view', {
      //     timeGridWeek:{ buttonText: '周' },
      //     timeGridDay: { buttonText: '天' },
      //     listWeek: { buttonText: '三' }
      //   })
      // })
    },
    onEventMouseEnter(e) {
      console.log('onEventMouseEnter', e)
    },
    onEventMouseLeave(e) {
      console.log('onEventMouseLeave', e)
    },
    onEventPositioned() {
      console.log('dds')
    },
    onEventRender: function(event, element) {
      event.el.querySelector('.fc-title').remove()
      event.el.querySelector('.fc-time').remove()
      console.log('onEventRender')
      this.start = event.start
      this.end = event.end
      var new_description =
          this.start.format('HH:mm') + '-' +
          this.end.format('HH:mm') + '<br/>' +
          'event.customer' + '<br/>' +
          '<strong>Address: </strong><br/>' + event.title + '<br/>' +
          '<strong>Task: </strong><br/>' + 'event.tas' + '<br/>' +
          '<strong>Place: </strong>' + 'event.place' + '<br/>'
      event.el.querySelector('.fc-content').innerHTML = new_description
    },
    onEventClick(event) {
      console.log(event)
      window.alert('我这是详情')
    },
    handleDateClick(arg) {
      this.$modalRouter.push({
        name: 'course-add-course-schdules',
        props: {
          time: arg.date
        },
        on: {
          ok: res => {
            this.calendarEvents.push({ // add new event data
              title: 'New Event',
              start: moment(arg.date),
              end: moment(arg.date).add(60, 'm'),
              allDay: arg.allDay
            })
            console.log(res)
          }
        }
      })
      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      //   this.calendarEvents.push({ // add new event data
      //     title: 'New Event',
      //     start: arg.date,
      //     allDay: arg.allDay
      //   })
      // }
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
  color: #e33
}
.fc-time-grid-event.fc-event.fc-start.fc-end{
  background:rgba(255,255,255,0.9);
  box-shadow:0px 0px 10px 0px rgba(56,62,68,0.1);
  border: 0;
  border-left: 3px #FF805B solid;
  border-radius:0px 2px 2px 0px;
}
</style>
