<template>
<div class="page-role-info">
  <st-form :form="form" class="page-role-info__edit">
    <a-row class="content">
        <a-col class="brand-list" :span="17">
          <st-form-item label="角色名称">
            <a-input placeholder="请输入角色名称" v-decorator="['name', {initialValue: info.name}]"></a-input>
          </st-form-item>
        </a-col>
    </a-row>
    <a-row class="content">
      <a-col class="brand-list" :span="17">
        <st-form-item label="角色描述">
          <a-input placeholder="请输入角色内容" v-decorator="[
              'role_description', {initialValue: info.role_description}
            ]"></a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row class="content" :gutter="12">
        <a-col class="brand-list" :span="17">
          <st-form-item label="数据权限">
            <a-radio-group name="radioGroup" v-decorator="[
              'data_grant', {initialValue: info.data_grant}
              ]">
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
              <st-input-search placeholder="请输入" style="width:340px" @change="fileterBrandList" round="round"></st-input-search>
              <a-tree
                checkable
                :defaultCheckedKeys="info.select_ids"
                @expand="onExpand"
                :expandedKeys.sync="expandedKeys"
                :autoExpandParent="autoExpandParent"
                :treeData="brands">
                <template slot="title" slot-scope="{title}">
                  <span v-if="title.indexOf(searchValue) > -1">
                    {{title.substr(0, title.indexOf(searchValue))}}
                    <span style="color: #f50">{{searchValue}}</span>
                    {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
                  </span>
                  <span v-else>{{title}}</span>
                </template>
              </a-tree>

            </st-container>
            <st-container class="shop-list pd-x24">
              <p>门店权限</p>
              <st-input-search placeholder="请输入" style="width:340px" round="round"></st-input-search>
              <a-tree checkable :treeData="shops">

              </a-tree>

            </st-container>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <st-form-item>
      <st-button type="primary" @click="onClickSubmit">保存</st-button>
      <st-button>取消</st-button>
    </st-form-item>
  </st-form>
</div>

</template>

<script>
import { EditService } from './edit.service'
import { listToTree } from '@/utils/list-to-tree.js'
import { json2AntDesignTreeData } from '@/utils/json-2-tree-data'
import { cloneDeep } from 'lodash-es'
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.name === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
export default {
  name: 'EditRole',
  serviceInject() {
    return {
      editService: EditService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$,
      info: this.editService.info$,
      brandList: this.editService.brandList$,
      shopList: this.editService.brandList$
    }
  },
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      form: this.$form.createForm(this),
      brandIds: [],
      shopIds: [],
      brands: [],
      shops: []
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    fileterBrandList(e) {
      const value = e.target.value
      const expandedKeys = this.brandList.map((item) => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.name, cloneDeep(this.brands))
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    onClickSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = {
            name: 'CMMMMMMMMO',
            role_description: '市场运用首席执行官',
            data_grant: 1,
            select_ids: ['menu:1', 'menu:2', 'menu:3'],
            department_ids: [22, 34]
          }
          this.roleService.update(form).subscribe()
        }
      })
    }
  },
  mounted() {
    this.brands = listToTree(this.brandList)
    this.shops = listToTree(this.shopList)
  }
}
</script>

<style lang="scss" scoped>

</style>
