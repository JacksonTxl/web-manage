<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span style="margin-right:16px">选择性别</span>
    <a-radio-group
      name="radioGroup"
      v-model="value.getData.base_sex"
      @change="onChange"
    >
      <a-radio :value="item" v-for="(item, index) in sexOptions" :key="index">
        {{ item.name }}
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      sexOptions: this.userService.getOptions$('staff.sex', {
        labelField: 'name'
      })
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
        title: '性别',
        info: '满足以下性别属性的用户'
      }
    }
  },
  methods: {
    onChange(event) {
      this.value.getData.base_sex = event.target.value
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {
    if (this.value.getData.base_sex) {
      this.value.getData.base_sex = this.sexOptions.filter(item => {
        return this.value.getData.base_sex.value === item.value
      })[0]
    }
  }
}
</script>
