
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择标签</span>
    <template v-for="(tag,index) in tags">
      <a-tooltip :key="index" :title="tag.name">
        <a-tag :key="index" :closable="true" :afterClose="() => handleClose(tag,index)">{{tag.name}}</a-tag>
      </a-tooltip>
    </template>
    <a-tag style="background: #fff; borderStyle: dashed;">
      <a-dropdown overlayClassName="affiliated-store-dropdown">
        <a class="ant-dropdown-link" href="#">
          <a-icon type="plus"/>添加
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item,index) in shopList" :key="index">
            <a
              @click="dropdownFunc(item)"
            >{{item.name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tag>
  </div>
</template>
<script>
import { UserLableService } from './user-lable.service'
import titleInfo from './title-info.vue'
import { cloneDeep } from 'lodash-es'
export default {
  serviceInject() {
    return {
      userLableService: UserLableService
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
      shopList: [],
      tags: [],
      titleData: {
        title: '用户标签',
        info: '选择用户标签为以下范围的用户'
      }
    }
  },
  created() {
    this.userLableService.getShopList().subscribe(res => {
      this.shopList = res.list.map(item => {
        return {
          name: item.tag_name,
          value: item.id
        }
      })
      if (this.value.getData.base_member_label.length > 0) {
        this.tags = cloneDeep(this.value.getData.base_member_label)
      }
      // this.tags = Object.values(
      //   Object.assign({}, ...this.value.getData.base_member_label)
      // )
    })
  },
  methods: {
    dropdownFunc(item) {
      const arr = this.tags.filter(i => { return i.value === item.value })
      if (arr.length > 0) {
        return
      }
      this.value.getData.member_label.push(item)
      this.tags.push(item)
    },
    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      this.value.getData.member_label.forEach((element, i) => {
        if (element.value === item.value) {
          this.value.getData.member_label.splice(i, 1)
        }
      })
    }
  }
}
</script>
