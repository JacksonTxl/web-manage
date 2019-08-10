<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">选择等级</span>
    <a-checkbox-group v-model="value.getData.member_level">
      <a-checkbox
        v-for="(item, index) in plainOptions"
        :value="item"
        :key="index"
      >
        {{ item.name }}
      </a-checkbox>
    </a-checkbox-group>
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
      plainOptions: [],
      checkedList: []
    }
  },
  created() {
    let list = []
    if (!this.shopMemberEnums.member_level) return list
    Object.entries(this.shopMemberEnums.member_level.value).forEach(o => {
      list.push({ value: +o[0], name: o[1] })
    })
    this.plainOptions = list
    const arr = []
    this.value.getData.member_level.forEach(element => {
      arr.push(
        list.filter(item => {
          return item.value === element.value
        })[0]
      )
    })
    this.value.getData.member_level = arr
  },
  methods: {},
  mounted() {}
}
</script>
