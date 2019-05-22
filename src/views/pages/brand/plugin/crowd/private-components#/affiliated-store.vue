
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择门店</span>
    <template v-for="(tag,index) in tags">
      <a-tooltip :key="tag" :title="tag">
        <a-tag :key="tag" :closable="true" :afterClose="() => handleClose(tag,index)">{{tag}}</a-tag>
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
              href="javascript:;"
              @click="dropdownFunc(item.shop_name,{[item.shop_id]:item.shop_name})"
            >{{item.shop_name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tag>
  </div>
</template>
<script>
import { AffiliatedStoreService } from './affiliated-store.service'
import titleInfo from './title-info.vue'
export default {
  serviceInject() {
    return {
      affiliatedStoreService: AffiliatedStoreService
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
        title: '所属门店',
        info: '选择所属门店在以下范围内的用户'
      },
      radioValue: '',
      tags: ['拉访', '拉访1'],
      inputValue: ''
    }
  },
  created() {
    this.affiliatedStoreService.getShopList().subscribe(res => {
      this.shopList = res.shop_info
      this.tags = Object.values(
        Object.assign({}, ...this.value.getData.base_shop)
      )
    })
  },
  methods: {
    dropdownFunc(inputValue, inputValueObj) {
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags, inputValue, inputValueObj, this.value.getData.base_shop)
      this.value.getData.base_shop.push(inputValueObj)
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
    handleClose(removedTag, index) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
      this.value.getData.base_shop.splice(index, 1)
    }
  },
  mounted() {}
}
</script>
