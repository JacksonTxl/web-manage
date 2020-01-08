<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">选择等级</span>
    <a-checkbox-group v-model="value.getData.member_level">
      <a-checkbox
        v-for="(item, index) in shopMemberEnums"
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
      shopMemberEnums: this.userService.getOptions$(
        'shop_member.member_level',
        { labelField: 'name' }
      )
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
      checkedList: []
    }
  },
  created() {
    const arr = []
    this.value.getData.member_level.forEach(element => {
      arr.push(
        this.shopMemberEnums.filter(item => {
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
