
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择门店</span>
    <template v-for="(tag,index) in tags">
      <a-tooltip :key="index" :title="tag">
        <a-tag :key="index" :closable="true" :afterClose="() => handleClose(tag,index)">{{tag}}</a-tag>
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
    {{this.value.getData.base_shop}}
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
      tags: [],
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
    dropdownFunc(inputValue, selectValue) {
      let tags = this.tags

      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags
      })
      console.log(tags, selectValue)
      this.value.getData.base_shop.push(selectValue)
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.value.getData.base_shop.splice(index, 1)
      this.tags = tags
    }
  },
  mounted() {}
}
</script>
