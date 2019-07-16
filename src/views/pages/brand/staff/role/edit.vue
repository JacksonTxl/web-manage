<template>
<div class="page-role-info">
  <st-form :form="form" class="page-role-info__edit" labelWidth="80px">
    <st-form-item label="角色名称">
      <a-input
        placeholder="请输入角色名称"
        v-decorator="['name', {initialValue: info.name}]"></a-input>
    </st-form-item>
    <st-form-item label="角色描述">
      <a-input
        placeholder="请输入角色内容"
        v-decorator="['role_description', {initialValue: info.role_description}]"></a-input>
    </st-form-item>
    <st-form-item label="数据权限">
      <a-radio-group name="radioGroup" @change="onChangeDataRegion" v-decorator="[
        'data_grant', {initialValue: info.data_grant}
        ]">
        <a-radio :value="1">仅本人</a-radio>
        <a-radio :value="2">所在部门及子部门</a-radio>
        <a-radio :value="4">全部门</a-radio>
        <a-radio :value="3">跨部门</a-radio>{{departmentName}}
      </a-radio-group>
    </st-form-item>
    <st-form-item label="功能权限">
      <div class="jurisdiction">
        <st-container  class="brand-list">
          <p>品牌权限</p>
          <st-input-search placeholder="请输入" @change="fileterBrandList" round="round"></st-input-search>
          <a-tree
            checkable
            :defaultSelectedKeys="['menu:1', 'menu:2', 'menu:3']"
            @expand="onExpand"
            v-model="brandIds"
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
        <st-container class="shop-list">
          <p>门店权限</p>
          <st-input-search placeholder="请输入" round="round"></st-input-search>
          <a-tree
            checkable
            :defaultSelectedKeys="['menu:1', 'menu:2', 'menu:3']"
            @expand="onExpand"
            v-model="shopIds"
            :expandedKeys.sync="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="shops">
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
      </div>
    </st-form-item>
    <st-form-item label="    ">
      <st-button type="primary" @click="onClickSubmit" class="mg-r16">保存</st-button>
      <st-button @click="onCancel">取消</st-button>
    </st-form-item>
  </st-form>
</div>

</template>

<script>
import { EditService } from './edit.service'
import { listToTree } from '@/utils/list-to-tree.js'
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
      shopList: this.editService.shopList$
    }
  },
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      expandedKeysShop: [],
      departmentName: '',
      searchShopValue: '',
      autoExpandParentShop: true,
      form: this.$form.createForm(this),
      brandIds: [],
      department_ids: [],
      shopIds: [],
      brands: [],
      shops: []
    }
  },
  computed: {
    id() {
      return this.info.id
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onExpandShop(expandedKeys) {
      this.expandedKeysShop = expandedKeys
      this.autoExpandParentShop = false
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
    fileterShopList(e) {
      const value = e.target.value
      const expandedKeysShop = this.shopList.map((item) => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.name, cloneDeep(this.shops))
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeysShop,
        searchShopValue: value,
        autoExpandParentShop: true
      })
    },
    onChangeDataRegion(val) {
      const that = this
      if (val.target.value === 3) {
        this.$modalRouter.push({
          name: 'role-department',
          on: {
            success(result) {
              that.departmentName = result.lable.join(',')
              that.department_ids = result.value
            }
          }
        })
      }
    },
    getSelectIds(selectIds, count) {
      const roleList = cloneDeep([...this.brandList, ...this.shopList])
      const tempList = []
      selectIds.map(id => {
        roleList.forEach(ele => {
          if (id === ele.id) {
            tempList.push(ele.parent_id)
          }
        })
      })
      const reslutArr = Array.from(new Set([...selectIds, ...tempList]))
      const length = reslutArr.length
      return length === count ? reslutArr : this.getSelectIds(reslutArr, length)
    },
    onClickSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const select_ids = this.getSelectIds(cloneDeep([...this.brandIds, ...this.shopIds])).filter(item => item !== 'menu:0')
          const form = {
            id: this.id,
            ...values,
            select_ids,
            department_ids: this.department_ids
          }
          this.editService.update(form).subscribe(res => {
            this.$router.push({ name: 'brand-staff-role-info', query: { id: this.id } })
          })
        }
      })
    },
    isParent(item, arr, dep) {
      // 两种情况
      // 第一种情况 当前节点有子节点且该节点没有匹配成功
      // 第二种情况 当前节点没有子节点且该节点没有匹配成功
      if (!Array.isArray(arr)) return
      for (let i = 0; i < arr.length; i++) {
        let current = arr[i]
        if (item === current.key && !current.children) {
          dep.push(item)
        } else {
          this.isParent(item, current.children, dep)
        }
      }
    }
  },
  mounted() {
    this.brands = listToTree(cloneDeep(this.brandList))
    this.brandList.filter(item => {
      return this.info.select_ids.includes(item.id)
    }).map(item => {
      return item.id
    }).map(item => {
      return this.isParent(item, this.brands, this.brandIds)
    })
    this.shops = listToTree(cloneDeep(this.shopList))
    this.shopList.filter(item => {
      return this.info.select_ids.includes(item.id) && item.id.includes('permission')
    }).map(item => {
      return item.id
    }).map(item => {
      return this.isParent(item, this.shops, this.shopIds)
    })
  }
}
</script>
