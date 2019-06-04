<template>
<div class="page-role-info">
  <st-form class="page-role-info__add">
    <a-row>
      <a-col :span="8">
        <st-form-item label="角色名称">
          <a-input></a-input>
        </st-form-item>
      </a-col>
    </a-row>

    <st-form-item label="角色描述">
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="数据权限">
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="功能权限">
      <a-input></a-input>
    </st-form-item>
    <st-form-item>
      <st-button type="primary">保存</st-button>
      <st-button>取消</st-button>
    </st-form-item>
  </st-form>
</div>

</template>

<script>
export default {
  name: 'AddRole'
}
</script>

<style lang="scss" scoped>

</style>
