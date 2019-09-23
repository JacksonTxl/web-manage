<template>
  <a-spin :spinning="loading.getInfo">
    <div class="page-role-info">
      <a-row class="page-role-detail">
        <a-col class="page-role-info-item">
          <span class="label">角色名称:</span>
          <span class="value">{{ info.name }}</span>
        </a-col>
        <a-col class="page-role-info-item">
          <span class="label">角色描述:</span>
          <span class="value">{{ info.role_description }}</span>
        </a-col>
        <a-col class="page-role-info-item">
          <span class="label">数据权限:</span>
          <span class="value">{{ dataGrant }}</span>
        </a-col>
        <a-col class="page-role-detail__funrole">
          <div class="label">
            <span>功能权限:</span>
          </div>
          <div class="jurisdiction">
            <st-container class="brand-list">
              <p>品牌权限</p>
              <a-tree showLine class="role-tree" :treeData="brands"></a-tree>
            </st-container>
            <st-container class="shop-list">
              <p>门店权限</p>
              <a-tree class="role-tree" showLine :treeData="shops"></a-tree>
            </st-container>
          </div>
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
      shopList: this.infoService.shopList$,
      dataGrantList: this.infoService.dataGrant$
    }
  },
  computed: {
    dataGrant() {
      const dataGrant = this.dataGrantList[this.info.data_grant - 1].label
      const departmentInfo = this.info.departments
        .map(element => {
          return element.department_name
        })
        .join(',')
      return this.info.data_grant === 3
        ? `${dataGrant}  (${departmentInfo})`
        : dataGrant
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
