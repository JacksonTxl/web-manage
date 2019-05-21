
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择来源</span>
    <template v-for="(tag,index) in tags">
      <a-tooltip :key="index" :title="tag">
        <a-tag :key="index" :closable="true" :afterClose="() => handleClose(tag,index)">{{tag}}</a-tag>
      </a-tooltip>
    </template>
    <a-tag style="background: #fff; borderStyle: dashed;">
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="plus"/>添加
        </a>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="(item,key,index) in crowdEnums.crowd_source_channel.value"
            :key="index"
          >
            <a href="javascript:;" @click="dropdownFunc(item,{[key]:item})">{{item}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tag>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import titleInfo from './title-info.vue'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      crowdEnums: user.crowdEnums$
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
        title: '来源方式',
        info: '选择来源方式为以下范围的用户'
      },
      radioValue: '',
      tags: [],

      inputValue: ''
    }
  },
  created() {
    this.tags = Object.values(
      Object.assign({}, ...this.value.getData.source_channel)
    )
  },
  methods: {
    dropdownFunc(inputValue, selectValue) {
      let tags = this.tags

      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags
      })
      this.value.getData.source_channel.push(selectValue)
    },

    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.value.getData.source_channel.splice(index, 1)
      this.tags = tags
    }
  },
  mounted() {}
}
</script>
