<template>
  <a-row :class="role()" :gutter="12">
    <a-col :lg="4" :class="roleList()">
      <header :class="roleList('search')" class="mg-l16 mg-t24">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main :class="roleList('tree')">
        <st-t4 class="mg-t24">角色 (6/60)</st-t4>
        <ul>
          <li class="item pd-y8 pd-x16" @click="getTreeNodeOnclick(role, $event)" v-for="role in roles" :key="role.id">
            <div><span>{{role.name}}</span><span>（{{role.cnt}}）</span></div>
            <div>
              <st-more-dropdown style="margin-left: 12px;">
                <a-menu-item @click="onClickEditRole(role.id)">编辑</a-menu-item>
                <a-menu-item @click="onClickDelRole(role.id)">删除</a-menu-item>
              </st-more-dropdown>
            </div>
          </li>
        </ul>
      </main>
      <footer :class="roleList('add')" @click="onCLickAddRole">
        <a>添加角色</a>
      </footer>
    </a-col>
    <a-col :lg="20"  >
      <router-view></router-view>
    </a-col>
  </a-row>
</template>
<script>
import { RoleService } from './role.service'
export default {
  name: 'RoleConfig',
  bem: {
    role: 'page-role',
    roleList: 'page-role-list'
  },
  serviceInject() {
    return {
      roleService: RoleService
    }
  },
  rxState() {
    return {
      state: this.roleService.state$,
      roles: this.roleService.roleList$
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onClickEditRole(id) {
      this.$router.push({ name: 'brand-staff-role-edit', query: { roleId: id } })
    },
    onCLickAddRole() {
      this.$router.push({ name: 'brand-staff-role-add' })
    },
    onClickDelRole() {

    },
    getTreeNodeOnclick(role, e) {
      this.$nextTick().then(() => {
        const doms = document.querySelectorAll('.item')
        doms.forEach(dom => {
          dom.setAttribute('class', 'item pd-y8  pd-x16')
        })
        e.currentTarget.setAttribute('class', 'item active pd-y8  pd-x16')
      })
      this.$router.push({ name: 'brand-staff-role-info', query: { roleId: role.id } })
    }
  }
}
</script>
