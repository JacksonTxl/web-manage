<template>
  <div :class="cardRadio()">
    <a-radio-group v-model="radioIndex">
      <a-radio v-for="(i,index) in cardBgList" :class="i.className" :key="index" :value="i.index">{{i.index}}</a-radio>
      <a-radio :value="0">自定义背景</a-radio>
    </a-radio-group>
    <div :class="cardRadio('image')">
      <img
        v-if="radioIndex!==0&&cardBgList[bgIndex]"
        :src="cardBgList[bgIndex].image_url"
        width="192"
        height="108"
        alt="会员卡背景"
      >
      <div v-else :class="cardRadio('upload')">
        <st-image-upload
        @change="imageUploadChange"
        width="192px"
        height="108px"
        :cropperModal="cropperModal"
        :list="fileList"
        :sizeLimit="2"
        placeholder="上传照片"></st-image-upload>
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
import _ from 'lodash'
let className = ['first custom', 'second custom', 'third custom', 'fourth custom']
export default {
  name: 'StCardBgRadio',
  bem: {
    cardRadio: 'st-card-bg-radio'
  },
  created() {
    this.init()
  },
  computed: {
    bgIndex() {
      return this.radioIndex === 0 ? 4 : this.radioIndex - 1
    },
    cardBgList() {
      let arr = []
      this.card_bg_list.forEach((item, index) => {
        item.className = className[index]
        item.index = ++index
        arr.push(item)
      })
      return arr
    }
  },
  data() {
    return {
      // 截图参数对象
      cropperModal: {},
      card_bg_list: [
        {
          image_id: 0,
          image_key: 'image/VZ0RGBwTX7FA1yKb.png',
          image_url:
            'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/VZ0RGBwTX7FA1yKb.png'
        },
        {
          image_id: 0,
          image_key: 'image/oRoVYhYc26wVMKb9.png',
          image_url:
            'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/oRoVYhYc26wVMKb9.png'
        },
        {
          image_id: 0,
          image_key: 'image/CHrzOBv71D5_rK1i.png',
          image_url:
            'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/CHrzOBv71D5_rK1i.png'
        },
        {
          image_id: 0,
          image_key: 'image/pAc7WsQ0BFhFBzGK.png',
          image_url:
            'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pAc7WsQ0BFhFBzGK.png'
        }
      ],
      // 备份
      list: [],
      // radioIndex
      radioIndex: 1,
      // 选择的cardBg
      cardBg: {
        image_id: 0,
        image_key: 'image/VZ0RGBwTX7FA1yKb.png',
        image_url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/VZ0RGBwTX7FA1yKb.png',
        index: 1
      },
      // 自定义cardBg
      customCardBg: {
        image_id: 0,
        image_key: '',
        image_url: '',
        index: 0
      },
      // 回显的自定义bg
      fileList: []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.setdata(newVal)
      },
      deep: true
    },
    radioIndex(newVal) {
      if (newVal === 0) {
        this.cardBg = _.cloneDeep(this.customCardBg)
      } else {
        let i = newVal
        --i
        this.cardBg = _.cloneDeep(this.card_bg_list[i])
        this.cardBg.index = newVal
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
          image_id: 0,
          image_key: '',
          image_url: '',
          index: 1
        }
      }
    }
  },
  methods: {
    init() {
      this.list = _.cloneDeep(this.card_bg_list)
      this.setdata(this.value)
    },
    setdata(data) {
      console.log(data.image_id)
      this.radioIndex = data.index
      if (data.index === 0) {
        this.customCardBg = _.cloneDeep(data)
        if (data.image_url) {
          this.fileList = [
            {
              image_id: data.image_id,
              image_key: data.image_url
            }
          ]
        }
      } else {
        this.card_bg_list = _.cloneDeep(this.list)
        let i = data.index
        --i
        this.card_bg_list[i].image_id = data.image_id
      }
    },
    imageUploadChange(fileList) {
      if (fileList.length) {
        this.customCardBg = {
          image_id: fileList[0].image_id,
          image_key: fileList[0].image_key,
          image_url: '',
          index: 0
        }
      } else {
        this.fileList = []
        this.customCardBg = {
          image_id: 0,
          image_key: '',
          image_url: '',
          index: 0
        }
      }
      this.cardBg = _.cloneDeep(this.customCardBg)
      this.$emit('input', this.cardBg)
      this.$emit('change', this.cardBg)
    }
  }
}
</script>
