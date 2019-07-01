<template>
    <div :class="h5('scroll-wrapper')">
    <div :class="h5()">
        <div :class="h5('slider')"></div>
        <div :class="h5('header')">
            <div class="imgBox">
            </div>
            <div class="title">IFITSTAR星健身(国贸大厦店)</div>
        </div>
        <div :class="h5('action')">
            <div v-for="(li,index) in actions" class="action-li" :key="index">
                <img :src="li.img">
                <p>{{li.text}}</p>
            </div>
        </div>
        <div :class="h5('event')">
            <div v-for="(li,index) in events" class="event-li" :key="index">
                <img :src="li.img">
            </div>
        </div>
        <div :class="h5('hr')"></div>
        <st-t3>教练风采</st-t3>
        <div :class="h5('coach')">
            <div v-for="(li,index) in coachs" class="coach-li" :key="index">
                <img :src="li.img">
                <st-t3>{{li.title}}</st-t3>
                <p>{{li.text}}</p>
                <p>{{li.price}}</p>
            </div>
        </div>
        <div :class="h5('hr')"></div>
        <st-t3>私教课推荐</st-t3>
        <div :class="h5('course')">
            <div v-for="(li,index) in courses" class="course-li" :key="index">
                <img :src="li.img">
                <div class="abox">
                    <st-t3>{{li.title}}</st-t3>
                    <p>{{li.text}}</p>
                </div>
            </div>
        </div>
        <div :class="h5('hr')"></div>
        <st-t3>团体课推荐</st-t3>
        <div :class="h5('course')">
            <div v-for="(li,index) in courses" class="course-li" :key="index">
                <img :src="li.img">
                <div class="abox">
                    <st-t3>{{li.title}}</st-t3>
                    <p>{{li.text}}</p>
                </div>
            </div>
        </div>
        <div :class="h5('hr')"></div>
        <st-t3>课程包推荐</st-t3>
        <div :class="h5('course')">
            <div v-for="(li,index) in courses" class="course-li" :key="index">
                <img :src="li.img">
                <div class="abox">
                    <st-t3>{{li.title}}</st-t3>
                    <p>{{li.text}}</p>
                </div>
            </div>
        </div>
        <div :class="h5('nav')">
            <div v-for="(li,index) in menus" class="nav-li" :key="index">
                <img :src="li.img">
                <p>{{li.text}}</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  bem: {
    h5: 'h5-component'
  },
  data() {
    return {
      actions: [],
      events: [],
      coachs: [],
      courses: [],
      menus: []
    }
  },
  created() {
    this.actions = [
      {
        text: '约课',
        img: '~@/assets/img/brand/markting/register.svg'
      },
      {
        text: '约课',
        img: '~@/assets/img/brand/markting/register.svg'
      },
      {
        text: '约课',
        img: '~@/assets/img/brand/markting/register.svg'
      },
      {
        text: '约课',
        img: '~@/assets/img/brand/markting/register.svg'
      }
    ]
    this.events = [
      { img: '' },
      { img: '' },
      { img: '' },
      { img: '' }
    ]
    this.coachs = [
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节',
        price: '¥200'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节',
        price: '¥200'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节',
        price: '¥200'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节',
        price: '¥200'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节',
        price: '¥200'
      }
    ]
    this.courses = [
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节'
      },
      {
        img: '',
        title: '高级教练-赵四',
        text: '累计上课230节'
      }
    ]
    this.menus = [
      {
        img: '',
        text: '首页'
      },
      {
        img: '',
        text: '训练'
      },
      {
        img: '',
        text: '我的'
      }
    ]
  }
}
</script>
