<template>
  <div :class="cardRadio()">
    <a-radio-group v-model="radioIndex">
      <a-radio :class="i.className" v-for="(i,index) in cardBgList" :key="index" :value="i.index"></a-radio>
      <a-radio :value="0">自定义背景</a-radio>
    </a-radio-group>
    <div :class="cardRadio('image')">
      <img
        v-if="radioIndex!==0&&cardBgList[bgIndex]"
        :src="cardBgList[bgIndex].url"
        width="192"
        height="108"
        alt="会员卡背景"
      >
      <div v-else :class="cardRadio('upload')">
        <file-upload width="192px" height="108px" :list="fileList" @change="onImgChange"></file-upload>
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
    {{fileList}}
    <p>

    {{cardBgList}}
    </p>
  </div>
</template>
<script>
import { CardBgService } from './card-bg-radio.service'
import _ from 'lodash'
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
      cardBgList: this.cardBgService.cardBgList$,
      backups: this.cardBgService.cardBgList$
    }
  },
  beforeCreate() {
    this.cardBgService.getCardBgListAction$.dispatch()
  },
  mounted() {
    this.init()
    var a = { x: 1 }
    console.log(_.cloneDeep(a))
  },
  computed: {
    bgIndex() {
      return this.radioIndex === 0 ? 4 : this.radioIndex - 1
    }
  },
  data() {
    return {
      // radioIndex
      radioIndex: 0,
      // 选择的cardBg
      cardBg: {
        id: 0,
        path: '',
        url: '',
        index: 1
      },
      // 自定义cardBg
      customCardBg: {
        id: 0,
        path: '',
        url: '',
        index: 0
      },
      // 回显的自定义bg
      fileList: []
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.radioIndex = newVal.index
        if (newVal.index === 0) {
          this.cardBg = _.cloneDeep(newVal)
          this.customCardBg = _.cloneDeep(newVal)
          this.fileList = [
            {
              image_id: newVal.id,
              image_key: newVal.url
            }
          ]
        } else {
          this.cardBgList = _.cloneDeep(this.backups)
          let i = newVal.index
          --i
          this.cardBgList[i].id = newVal.id
          this.cardBg.id = this.cardBgList[i].id
          this.cardBg.path = this.cardBgList[i].path
          this.cardBg.url = this.cardBgList[i].url
          this.cardBg.index = this.cardBgList[i].index
        }
      },
      deep: true
    },
    radioIndex(newVal, oldVal) {
      console.log(this.customCardBg)
      if (newVal !== 0) {
        let i = newVal
        --i
        this.cardBg.id = this.cardBgList[i].id
        this.cardBg.path = this.cardBgList[i].path
        this.cardBg.url = this.cardBgList[i].url
        this.cardBg.index = this.cardBgList[i].index
      } else {
        this.cardBg.id = this.customCardBg.id
        this.cardBg.path = this.customCardBg.path
        this.cardBg.url = this.customCardBg.url
        this.cardBg.index = this.customCardBg.index
      }
      this.$emit('input', this.cardBg)
      this.$emit('change', this.cardBg)
    }
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          id: 0,
          path: '',
          url: '',
          index: 1
        }
      }
    }
  },
  methods: {
    init() {
      this.radioIndex = this.value.index
      if (this.value.index === 0) {
        this.cardBg = _.cloneDeep(this.value)
        this.customCardBg = _.cloneDeep(this.value)
        this.fileList = [
          {
            image_id: this.value.id,
            image_key: this.value.url
          }
        ]
      } else {
        let i = this.value.index
        --i
        console.log(i)
        console.log(this.cardBgList)
        this.cardBgList[i].id = this.value.id
        this.cardBg.id = this.cardBgList[i].id
        this.cardBg.path = this.cardBgList[i].path
        this.cardBg.url = this.cardBgList[i].url
        this.cardBg.index = this.cardBgList[i].index
      }
    },
    onImgChange(fileList) {
      if (fileList.length) {
        this.customCardBg.id = fileList[0].image_id
        this.customCardBg.path = fileList[0].image_key
        this.customCardBg.url = ''
        this.customCardBg.index = 0
      } else {
        this.customCardBg.id = undefined
        this.customCardBg.path = ''
        this.customCardBg.url = ''
        this.customCardBg.index = 0
        this.fileList = []
      }
      this.cardBg = _.cloneDeep(this.customCardBg)
      this.$emit('input', this.cardBg)
      this.$emit('change', this.cardBg)
    }
  }
}
</script>
