
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择等级</span>
    <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange"/>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import { UserService } from '@/services/user.service'
import { forEach } from 'lodash-es'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      shopMemberEnums: this.userService.shopMemberEnums$
    }
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  components: {
    titleInfo
  },
  data() {
    return {
      titleData: {
        title: '用户等级',
        info: '满足以下用户等级的用户'
      },
      radioValue: '',
      plainOptions: [],
      plainOptionsIndex: [],
      checkedList: []
    }
  },
  created() {
    this.plainOptions = Object.values(this.shopMemberEnums.member_level.value)
    this.plainOptionsIndex = Object.keys(
      this.shopMemberEnums.member_level.value
    )
    this.checkedList = Object.values(
      Object.assign({}, ...this.value.getData.base_member_level)
    )
  },
  methods: {
    selectionFun(item) {
      this.value.selectionData = item
    },
    onChange(data) {
      let arr = []
      let arrIndex = []
      data.forEach(item => {
        arrIndex.push(this.plainOptions.indexOf(item))
      })
      data.forEach((item, index) => {
        arr.push({ [arrIndex[index]]: item })
      })
      this.value.getData.base_member_level.length = 0
      this.value.getData.base_member_level.push(...arr)
    }
  },
  mounted() {}
}
</script>
