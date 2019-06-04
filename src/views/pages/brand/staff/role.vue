<template>
  <a-row :class="role()" :gutter="12">
    <a-col :lg="4" :class="roleList()">
      <header :class="roleList('search')" class="mg-l16 mg-t24">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main :class="roleList('tree')" class="mg-l16">
      </main>
      <footer :class="roleList('add')">
        <a>添加角色</a>
      </footer>
    </a-col>
    <a-col :lg="20"  >
      <router-view></router-view>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: 'RoleConfig',
  bem: {
    role: 'page-role',
    roleList: 'page-role-list'
  }
}
</script>
