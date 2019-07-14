
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
        <a class="ant-dropdown-link">
          <a-tooltip>
            <template slot='title' v-if="shopList.length <= 0">
              没有可选的标签
            </template>
            <a-icon type="plus"/>添加
          </a-tooltip>
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
      tags: []
    }
  },
  created() {
    this.affiliatedStoreService.getShopList().subscribe(res => {
      this.shopList = res.shop_info
      if (this.value.getData.shop.length > 0) {
        this.tags = cloneDeep(this.value.getData.shop)
      }
    })
  },
  methods: {
    dropdownFunc(item) {
      const arr = this.tags.filter(i => { return i.value === item.value })
      if (arr.length > 0) {
        return
      }
      this.value.getData.shop.push(item)
      this.tags.push(item)
    },
    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      this.value.getData.shop.forEach((element, i) => {
        if (element.shop_id === item.shop_id) {
          this.value.getData.shop.splice(i, 1)
        }
      })
    }
  },
  mounted() {}
}
</script>
