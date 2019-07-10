<template>
  <a-row :class="role()" type="flex" style="flex-wrap: nowrap">
    <a-col :lg="4" :class="roleList()">
      <header :class="roleList('search')">
        <st-input-search placeholder="请输入部门/员工名称" round="round" style="width: 226px"></st-input-search>
      </header>
      <main :class="roleList('tree')">
        <st-t4>角色 ({{stat.used}}/{{stat.total}})</st-t4>
        <ul>
          <li class="item" @click="getTreeNodeOnclick(role, $event)" v-for="(role, index) in roles" :id="role.id" :class="{'active' : index === 0}" :key="role.id">
            <div><span>{{role.name}}</span><span>（{{role.cnt}}）</span></div>
            <div>
              <st-more-dropdown style="margin-left: 12px;">
                <a-menu-item v-if="auth.edit" @click="onClickEditRole(role.id)">编辑</a-menu-item>
                <a-menu-item v-if="auth.del" @click="onClickDelRole(role.id)">删除</a-menu-item>
              </st-more-dropdown>
            </div>
          </li>
        </ul>
        <!-- <a-tabs tabPosition="left" defaultActiveKey="1">
          <a-tab-pane class="item pd-y8 pd-x16" @click="getTreeNodeOnclick(role, $event)" v-for="role in roles" :id="role.id" :key="role.id" :tab="role.name" style="height: 200px"></a-tab-pane>
          <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
          <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
          <template slot="renderTabBar" slot-scope="props, DefaultTabBar">
            <component :is="DefaultTabBar" {...props} />
          </template>
        </a-tabs> -->
      </main>
      <footer v-if="auth.add" :class="roleList('add')" @click="onCLickAddRole">
        <a>添加角色</a>
      </footer>
    </a-col>
    <a-col :lg="20">
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
    roleList: 'page-role-list',
    roleView: 'page-role-view'
  },
  serviceInject() {
    return {
      roleService: RoleService
    }
  },
  rxState() {
    return {
      roles: this.roleService.roleList$,
      stat: this.roleService.stat$,
      auth: this.roleService.auth$
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
    onClickDelRole(role_id) {
      this.roleService.del({ role_id }).subscribe()
    },
    getTreeNodeOnclick(role, e) {
      this.$nextTick().then(() => {
        const doms = document.querySelectorAll('.page-role-list__tree .item')
        doms.forEach(dom => {
          dom.setAttribute('class', 'item pd-y8  pd-x16')
        })
        e.currentTarget.setAttribute('class', 'item active pd-y8  pd-x16')
      })
      this.$router.push({ name: 'brand-staff-role-info', query: { id: role.id } })
    }
  },
  mounted() {
    console.log('this.roles', this.roles)
    this.$router.push({ name: 'brand-staff-role-info', query: { id: this.roles[0].id } })
  }
}
</script>
