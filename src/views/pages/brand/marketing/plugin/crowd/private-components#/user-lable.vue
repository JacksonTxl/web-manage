
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择标签</span>
    <template v-for="(tag,index) in value.getData.member_label">
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
      // this.tags = Object.values(
      //   Object.assign({}, ...this.value.getData.base_member_label)
      // )
    })
  },
  methods: {
    dropdownFunc(item) {
      // if (this.value.getData.member_label.find(item) >= 0) {
      //   return;
      // }
      this.value.getData.member_label.push(item)
    },
    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      this.value.getData.member_label.splice(index, 1)
    }
  }
}
</script>
