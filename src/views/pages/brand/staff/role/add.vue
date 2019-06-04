<template>
<div class="page-role-info">
  <st-form class="page-role-info__add">
    <a-row class="content">
        <a-col class="brand-list" :span="17">
          <st-form-item label="角色名称">
            <a-input placeholder="请输入角色名称"></a-input>
          </st-form-item>
        </a-col>
    </a-row>
    <a-row class="content">
      <a-col class="brand-list" :span="17">
        <st-form-item label="角色描述">
          <a-input placeholder=" 请输入角色内容"></a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row class="content" :gutter="12">
        <a-col class="brand-list" :span="17">
          <st-form-item label="数据权限">
            <a-radio-group name="radioGroup" :defaultValue="1">
              <a-radio :value="1">仅本人</a-radio>
              <a-radio :value="2">所在部门及子部门</a-radio>
              <a-radio :value="3">跨部门</a-radio>
              <a-radio :value="4">全部门</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
    </a-row>

    <a-row class="content" :gutter="12">
      <a-col class="brand-list" :span="17">
        <st-form-item label="功能权限">
          <div class="role-list">
            <st-container  class="brand-list mg-r16 pd-x24">
              <p>品牌权限</p>
              <st-input-search placeholder="请输入" style="width:340px" round="round"></st-input-search>
            </st-container>
            <st-container class="shop-list pd-x24">
              <p>门店权限</p>
              <st-input-search placeholder="请输入" style="width:340px" round="round"></st-input-search>
            </st-container>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <st-form-item>
      <st-button type="primary" @click="onClickSubmit">保存</st-button>
      <st-button>取消</st-button>
      <st-button @click="onClickDeleteRole">删除角色</st-button>
      <st-button @click="onClickEdit">编辑角色</st-button>
    </st-form-item>
  </st-form>
</div>

</template>

<script>
import { RoleService } from '../role.service'
export default {
  name: 'AddRole',
  serviceInject() {
    return {
      roleService: RoleService
    }
  },
  methods: {
    onClickSubmit() {
      const form = {
        name: 'CMO',
        role_description: '市场运用首席执行官',
        data_grant: 1,
        select_ids: ['menu:1', 'menu:2', 'menu:3'],
        department_ids: [22, 34]
      }
      this.roleService.add(form).subscribe()
    },
    onClickDeleteRole() {
      this.roleService.del({ role_id: 1 }).subscribe()
    },
    onClickEdit() {
      const form = {
        id: 12,
        name: 'CMO',
        role_description: '市场运用首席执行官',
        data_grant: 1,
        select_ids: ['1', '2', '3'],
        department_ids: [22, 34]
      }
      this.roleService.update(form).subscribe()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
