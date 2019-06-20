<template>
  <a-spin :spinning="loading.getInfo">
    <div class="page-role-info">
      <a-row class="page-role-detail">
        <a-col :lg="17" class="item first"><span class='label'>角色fff名称: </span><span class='value'>{{info.name}}</span></a-col>
        <a-col :lg="17"  class="item pd-y24"><span class='label'>角色描述: </span><span class='value'>{{info.role_description}}</span></a-col>
        <a-col :lg="17"  class="item pd-y24"><span class='label'>数据权限: </span><span class='value'>{{dataGrant}}</span></a-col>
        <a-col class="page-role-detail__funrole pd-y24" :lg="18">
          <a-row style="width: 100%">
            <a-col :span="2">
              <span class='label mg-r8'>功能权限: </span>
            </a-col>
            <a-col :span="11">
              <st-container  class="brand-list mg-r16 pd-x24">
                <p>品牌权限</p>
                <a-tree showLine :treeData="brands"></a-tree>
              </st-container>
            </a-col>
            <a-col :span="11">
              <st-container class="shop-list pd-x24">
                <p>门店权限</p>
                <a-tree showLine :treeData="shops"></a-tree>
              </st-container>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script>
import { InfoService } from './info.service'
import { listToTree } from '@/utils/list-to-tree.js'
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
    brands() {
      return listToTree(this.brandList)
    },
    shops() {
      return listToTree(this.shopList)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
