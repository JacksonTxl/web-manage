<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">选择性别</span>
    <a-radio-group
      name="radioGroup"
      v-model="value.getData.base_sex"
      @change="onChange"
    >
      <!-- 使用{name:'男',value:1} 作为绑定的模型 -->
      <a-radio :value="item" v-for="item in sexOptions" :key="item.value">
        {{ item.name }}
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import { UserService } from '@/services/user.service'
import { find as lodashFind } from 'lodash-es'
import { map } from 'rxjs/operators'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      sexOptions: this.userService.getOptions$('staff.sex').pipe(
        // 后端需要{name:'男',value:1} 格式
        map(options =>
          options.map(item => {
            item.name = item.label
            return item
          })
        )
      )
    }
  },
  model: {
    type: 'value',
    event: 'dataChange'
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
      this.$emit('dataChange', this.value)
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
