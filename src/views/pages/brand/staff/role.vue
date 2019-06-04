<template>
  <a-row :class="role()" :gutter="12">
    <a-col :lg="4" :class="roleList()">
      <header :class="roleList('search')" class="mg-l16 mg-t24">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main :class="roleList('tree')" class="mg-l16">
        <st-t5>角色 (6/60)</st-t5>
        <ul>
          <li class="item">
            <div><span>超级管理员</span><span>（1）</span></div>
            <div>
              <st-more-dropdown style="margin-left: 12px;">
                <a-menu-item>编辑</a-menu-item>
                <a-menu-item>删除</a-menu-item>
              </st-more-dropdown>
            </div>
          </li>
        </ul>
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
