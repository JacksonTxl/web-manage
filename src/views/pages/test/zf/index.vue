<template>
  <st-panel >
    <!-- <st-range-picker :disabledDays="180"></st-range-picker> -->
    <!-- <st-form :form="form" @submit="save">
      <st-form-item>
        <st-select :list="list" placeholder="请选择" v-decorator="rules.country_prefix"></st-select>
      </st-form-item>
      <st-form-item class="mg-l24" labelOffset>
        <st-button type="primary" ghost html-type="submit">保存</st-button>
      </st-form-item> -->
    <!-- </st-form> -->

    <!-- canvas绘制双图层图片 -->
    <canvas id="myCanvas" width="200" height="200"></canvas>
    {{src}}
    <st-button @click="drawImage">点击绘制</st-button>
  </st-panel>
</template>
<script>
// import StRangePicker from '@/views/components/datetime-picker/range-picker'
import StSelect from '@/views/components/select/select'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      list: [{
        label: 'test1',
        value: 1
      }],
      rules: {
        country_prefix: ['country_prefix']
      },
      src: ''

    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    },
    drawImage() {
      const myCanvas = document.getElementById('myCanvas')
      const ctx = myCanvas.getContext('2d')
      ctx.globalCompositeOperation = 'source-over'
      const logo_img = new Image()
      logo_img.src = 'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/10000/2019-07-30/1564457894729.png'
      const user_img = new Image()
      user_img.src = 'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/10000/2019-07-30/1564458803780.png'
      user_img.onload = () => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
        ctx.drawImage(user_img, 0, 0, 200, 200)
        // ctx.drawImage(logo_img, 0, 0)
        ctx.stroke()
        this.src = myCanvas.toDataURL()
        console.log()
      }
    }
  },
  components: {
    // StSelect
  }
}
</script>
