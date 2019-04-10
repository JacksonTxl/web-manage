<template>
  <div :class="cardRadio()">
    <a-radio-group v-model="value">
      <a-radio :class="i.className" v-for="(i,index) in cardBgList" :key="index" :value="i.id">{{i.label}}</a-radio>
    </a-radio-group>
    <div :class="cardRadio('image')">
      <img v-if="value!==4" :src="cardBgList[value].url" width="192" height="108" alt="会员卡背景">
      <div v-else :class="cardRadio('upload')">
        <file-upload :list="fileList" @change="onImgChange"></file-upload>
        <div :class="cardRadio('describe')">
          <p>
            <span>1.</span>
            <span>图片格式必须为：png,bmp,jpeg,jpg,gif,建议使用png格 式图片，以保存最佳效果</span>
          </p>
          <p>
            <span>2.</span>
            <span>建议尺寸为xx像素Xxx像素， 不可大于2m</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CardBgService } from './card-bg-radio.service'
export default {
  name: 'StCardBgRadio',
  bem: {
    cardRadio: 'st-card-bg-radio'
  },
  serviceInject() {
    return {
      cardBgService: CardBgService
    }
  },
  subscriptions() {
    return {
      cardBgList1: this.cardBgService.cardBgList$
    }
  },
  mounted() {
    console.log(this.cardBgList1)
  },
  data() {
    return {
      fileList: [],
      value: 4,
      cardBgList: [
        {
          id: 0,
          className: 'first custom',
          label: '',
          url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/VZ0RGBwTX7FA1yKb.png'
        },
        {
          id: 1,
          className: 'second custom',
          label: '',
          url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/oRoVYhYc26wVMKb9.png'
        },
        {
          id: 2,
          className: 'third custom',
          label: '',
          url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/CHrzOBv71D5_rK1i.png'
        },
        {
          id: 3,
          className: 'fourth custom',
          label: '',
          url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pAc7WsQ0BFhFBzGK.png'
        },
        {
          id: 4,
          className: '',
          label: '自定义背景',
          url: ''
        }
      ]
    }
  },
  methods: {
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    onImgChange(fileList) {
      console.log('file changed, fileList: ', fileList)
    }
  }
}
</script>
