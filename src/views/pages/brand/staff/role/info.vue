<template>
  <a-spin :spinning="loading.getInfo">
    <div class="page-role-info">
      <a-row class="page-role-detail">
        <a-col :lg="17" class="item first"><span class='label'>角色名称: </span><span class='value'>{{info.name}}</span></a-col>
        <a-col :lg="17"  class="item pd-y24"><span class='label'>角色描述: </span><span class='value'>{{info.role_description}}</span></a-col>
        <a-col :lg="17"  class="item pd-y24"><span class='label'>数据权限: </span><span class='value'>{{dataGrant}}</span></a-col>
        <a-col class="page-role-detail__funrole pd-y24" :lg="18">
            <span class='label mg-r8'>功能权限: </span>
            <st-container  class="brand-list mg-r16 pd-x24">
              <p>品牌权限</p>
              <a-tree :treeData="brandTree"></a-tree>
            </st-container>
            <st-container class="shop-list pd-x24">
              <p>门店权限</p>
            </st-container>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script>
import { InfoService } from './info.service'
import { json2AntDesignTreeData } from '@/utils/json-2-tree-data'
export default {
  name: 'RoleInfo',
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      loading: this.infoService.loading$,
      info: this.infoService.info$,
      brandList: this.infoService.brandList$,
      shopList: this.infoService.shopList$
    }
  },
  data() {
    return {
      dataGrantList: ['仅自己', '部门及子部门', '跨部门', '全部门']
    }
  },
  computed: {
    dataGrant() {
      return this.dataGrantList[this.info.data_grant - 1]
    },
    brandTree() {
      return json2AntDesignTreeData(this.brandList)
    },
    shopTree() {
      return json2AntDesignTreeData(this.shopList)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
