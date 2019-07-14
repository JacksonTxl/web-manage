
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择门店</span>
    <template v-for="(tag,index) in tags">
      <a-tooltip :key="index" :title="tag.name">
        <a-tag :closable="true" :afterClose="() => handleClose(tag,index)">{{tag.name}}</a-tag>
      </a-tooltip>
    </template>
    <a-tag style="background: #fff; borderStyle: dashed;">
      <a-dropdown overlayClassName="affiliated-store-dropdown">
        <a class="ant-dropdown-link">
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
import { AffiliatedStoreService } from './affiliated-store.service'
import titleInfo from './title-info.vue'
import { cloneDeep } from 'lodash-es'
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
      tags: [],
      titleData: {
        title: '所属门店',
        info: '选择所属门店在以下范围内的用户'
      },
      radioValue: ''
    }
  },
  created() {
    this.affiliatedStoreService.getShopList().subscribe(res => {
      this.shopList = res.list.map(item => {
        return {
          name: item.shop_name,
          value: item.shop_id
        }
      })
    })
    if (this.value.getData.shop.length > 0) {
      this.tags = cloneDeep(this.value.getData.shop)
    }
  },
  methods: {
    dropdownFunc(item) {
      this.value.getData.shop.push(item)
      this.tags.push(item)
    },
    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(item, index) {
      console.log(this.value.getData.shop)
      this.value.getData.shop.forEach((element, i) => {
        if (element.value === item.value) {
          this.value.getData.shop.splice(i, 1)
        }
      })
    }
  },
  mounted() {}
}
</script>
