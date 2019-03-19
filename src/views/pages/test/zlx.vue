<template>
  <div>
    <full-calendar class="test-fc"
    :events="fcEvents"
    first-day='1'
    locale="fr"
    @changeMonth="changeMonth"
    @eventClick="eventClick"
    @dayClick="dayClick"
    @moreClick="moreClick">
    <template slot="fc-event-card"
      slot-scope="p">
      <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
    </template>
    </full-calendar>
    <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Sortable control</h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label><input type="checkbox" v-model="editable">Enable drag and drop</label>
        </div>
        <button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
      </div>
    </div>

    <div class="col-md-3">
      <draggable class="list-group" element="ul" v-model="list" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
          <li class="list-group-item" v-for="element in list" :key="element.order">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.name}}
            <span class="badge">{{element.order}}</span>

          </li>

       </transition-group>
      </draggable>
    </div>

    <div class="col-md-3">
      <draggable element="span" v-model="list2" v-bind="dragOptions" :move="onMove">
        <transition-group name="no" class="list-group" tag="ul">
          <li class="list-group-item" v-for="element in list2" :key="element.order">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.name}}
            <span class="badge">{{element.order}}</span>
          </li>
        </transition-group>
      </draggable>
    </div>

    <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>
    <div class="list-group col-md-3">
      <pre>{{list2String}}</pre>
    </div>
  </div>
  </div>

</template>
<script>
import draggable from 'vuedraggable'
import fullCalendar from 'vue-fullcalendar'
let demoEvents = [
  {
    title: 'Sunny 725-727',
    start: '2017-02-25',
    end: '2017-02-27',
    cssClass: 'family'
  },
  {
    title: 'Lunfel 726-727',
    start: '2017-02-26',
    end: '2017-02-27',
    cssClass: ['home', 'work']
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/26-3/05',
    start: '2017-02-26',
    end: '2017-03-05'
  },
  {
    title: 'Lunfel 1/27-1/28',
    start: '2017-01-27',
    end: '2017-01-28'
  },
  {
    title: 'Lunfel 1/27-2/2',
    start: '2017-01-27',
    end: '2017-02-02'
  },
  {
    title: 'Lunfel 3/27-3/28',
    start: '2017-03-27',
    end: '2017-03-28'
  }
]

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]

export default {
  data() {
    return {
      name: 'Sunny!',
      fcEvents: demoEvents,
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false }
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    }
  },
  components: {
    draggable,
    fullCalendar
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    listString() {
      return JSON.stringify(this.list, null, 2)
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2)
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order
      })
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    changeMonth(start, end, current) {
      // console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  }
}
</script>
<style lang='less'>
.app {
  color: green;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
