
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择门店</span>
    <template v-for="tag in tags">
      <a-tooltip :key="tag" :title="tag">
        <a-tag :key="tag" :closable="true" :afterClose="() => handleClose(tag)">{{tag}}</a-tag>
      </a-tooltip>
    </template>
    <a-tag style="background: #fff; borderStyle: dashed;">
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="plus"/>添加
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="dropdownFunc('1st menu item')">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tag>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
export default {
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
        title: '所属门店',
        info: '选择所属门店在以下范围内的用户'
      },
      radioValue: '',
      tags: ['拉访'],
      inputValue: ''
    }
  },
  methods: {
    dropdownFunc(inputValue) {
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
    }
  },
  mounted() {}
}
</script>
