<template>
  <div style='background:#fff;padding:24px'>
    <h2>styleguide</h2>
    <div class="mg-t16">
      按钮(需变更)
      <st-button type='primary'>你好</st-button>
      <st-button type='primary'
        round='round'>圆按钮</st-button>
      <st-button type='primary' round='small' ghost>小号</st-button>
      <st-button type='primary' ghost>中号</st-button>
      <st-button type='ghost'>块级</st-button>
    </div>
    <div class="mg-t16">
      头像上传(未完成)
      <st-avatar-upload></st-avatar-upload>
    </div>
    <div class="mg-t16">
      图片上传(未完成)
      <st-picture-upload></st-picture-upload>
    </div>
    <div>
      按钮复选checkbox
      <st-checkbox-button-group v-model='checkBoxModel'>
        <st-checkbox-button-item value='1'>你好</st-checkbox-button-item>
        <st-checkbox-button-item value='2'>你好2</st-checkbox-button-item>
      </st-checkbox-button-group>
    </div>
    <h3>
      使用st iconfont
      <st-icon type='wechat'
        color='red'></st-icon>
      变更大小
      <st-icon type='wechat'
        size='28px'
        color='red'></st-icon>
      使用ant iconfont
      <st-icon type='anticon:setting'></st-icon>
    </h3>
    <div class="mg-t16">
      <st-steps :stepList="[{title:'hello'},{title:'2'},{title:'3'}]"></st-steps>
    </div>
    <div class="mg-t16">
      <st-input-search></st-input-search>
    </div>
    <div class="mg-t16">
      <st-table :columns='columns' rowKey='id'
        :dataSource='dataSource'></st-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBoxModel: [],
      columns: [
        {
          title: '字段1',
          dataIndex: 'id'
        },
        {
          title: '字段2',
          dataIndex: 'name'
        }
      ],
      dataSource: [{ id: 'id', name: 'lee' }, { id: 'id2', name: 'lee2' }]
    }
  }
}
</script>
