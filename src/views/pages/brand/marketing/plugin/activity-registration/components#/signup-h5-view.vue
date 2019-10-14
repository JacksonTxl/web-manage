<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        报名表
      </template>
      <div :class="bComponent('content')">
        <div :class="bComponent('header')">
          <div :class="bComponent('activity-info')">
            <div class="activity-title">
              <st-t2>2019 CHINA FIT 体育与健身大会</st-t2>
            </div>
            <div class="activity-box">
              <div class="time">
                <st-icon type="time"></st-icon>
                <span>2019.06.22 19:30-21:30</span>
              </div>

              <div class="address">
                <st-icon type="address"></st-icon>
                <span>上海市闵行区漕河泾门店</span>
              </div>
              <div class="count">
                <span>早鸟票早鸟票200元</span>
                <span>x10 张</span>
              </div>
            </div>
          </div>
        </div>
        <div :class="bComponent('tip')">
          <div :class="bComponent('tip-title')">
            <st-t3 class="title">报名表</st-t3>
            <span class="sub-title">
              为了更好的服务，我们需要收集您以下信息
            </span>
          </div>
          <div :class="bComponent('tip-phone')">
            您已绑定手机号码 18801726654
          </div>
        </div>
        <ul :class="bComponent('info')">
          <li class="item">
            <span class="label">
              姓名
              <span class="tip">（必填）</span>
            </span>
            <a href="" class="action">请编辑</a>
          </li>
          <li class="item">
            <span class="label">
              单行填写
            </span>
            <a href="" class="action">请编辑</a>
          </li>
          <li class="item">
            <span class="label">
              单选项
            </span>
            <a href="" class="action">请选择</a>
          </li>
        </ul>
        <div :class="bComponent('footer')">
          <st-button pill class="footer__button" type="primary">
            下一步
          </st-button>
        </div>
      </div>
    </h5-container>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'SignUpH5View',
  bem: {
    bComponent: 'component-signup-h5-view'
  },
  components: {
    H5Container
  },
  filters: {
    formatActivityDate(dateArr = []) {
      if (!dateArr.length) return ''
      const startDate = dateArr[0].format('YYYY-MM-DD')
      const endDate = dateArr[1].format('YYYY-MM-DD')
      const startTime = dateArr[0].format('HH:mm')
      const endTime = dateArr[1].format('HH:mm')
      return startDate === endDate
        ? `${startDate} ${startTime} - ${endTime}`
        : `${startDate} ${startTime} - ${endDate} ${endTime}`
    }
  },
  props: {
    stepInfo: {
      type: Object,
      default: () => {
        return {
          content: ''
        }
      }
    }
  }
}
</script>
