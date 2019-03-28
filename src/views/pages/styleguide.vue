<template>
  <div class="container-basis">
    <h2>styleguide</h2>
    <h4>st-button 按钮</h4>
    <div class="mg-t16">
      <st-button pill
        size='small'>默认24px</st-button>
      <st-button pill
        size='medium'>28px</st-button>
      <st-button pill
        loading>32px</st-button>
      <st-button pill
        size='large'>40px</st-button>
      <st-button pill
        type='primary'
        size='small'>primary 24px</st-button>
      <st-button pill
        type='primary'
        size='medium'
        loading>28px</st-button>
      <st-button pill
        type='primary'>32px</st-button>
      <st-button pill
        type='primary'
        size='large'>40px</st-button>

      <st-button pill
        ghost
        type='primary'
        size='small'>幽灵按钮24px</st-button>
      <st-button pill
        ghost
        type='primary'
        size='medium'>28px</st-button>
      <st-button pill
        ghost
        type='primary'>32px</st-button>
      <st-button pill
        ghost
        type='primary'
        size='large'
        loading>40px</st-button>
    </div>
    <div class="mg-t16">
      <st-button size='small'
        loading>默认24px</st-button>
      <st-button size='medium'>28px</st-button>
      <st-button>32px</st-button>
      <st-button size='large'>40px</st-button>
      <st-button type='primary'
        size='small'>primary 24px</st-button>
      <st-button type='primary'
        size='medium'>28px</st-button>
      <st-button type='primary'
        loading>32px</st-button>
      <st-button type='primary'
        size='large'
        disabled>40px</st-button>

      <st-button ghost
        type='primary'
        size='small'>幽灵按钮24px</st-button>
      <st-button ghost
        type='primary'
        size='medium'>28px</st-button>
      <st-button ghost
        type='primary'
        disabled>32px</st-button>
      <st-button ghost
        type='primary'
        size='large'
        loading>40px</st-button>
    </div>
    <div class="mg-t16">
      <a-row :gutter='8'>
        <a-col :span='4'>
          <!-- start -->
          <st-button pill
            type='primary'>进入门店</st-button>
          <!-- end -->
        </a-col>
        <a-col :span='6'>
          <!-- start -->
          <div style='width:172px;'
            class="mg-t16">
            <st-button block
              pill
              type='primary'
              icon='wechat'
              size='large'>
              添加门店
            </st-button>
          </div>
          <!-- end -->
        </a-col>
        <a-col :span='8'>
          <!-- start -->
          <div style='width:336px;'
            class="mg-t16">
            <st-button disabled
              block
              pill
              type='primary'
              size='large'>
              下一步
            </st-button>
          </div>
          <!-- end -->
        </a-col>
        <a-col :span='4'>
          <st-button style='width:84px'
            size='medium'
            pill
            ghost
            type='primary'>绑定</st-button>
        </a-col>
      </a-row>
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
      步骤条（须变更）
      <st-steps :stepList="[{title:'hello'},{title:'2'},{title:'3'}]"></st-steps>
    </div>
    <div class="mg-t16">
      <st-input-search></st-input-search>
    </div>
    <div class="mg-t16">
      <st-table :columns='columns'
        rowKey='id'
        :dataSource='dataSource'></st-table>
    </div>
    <a-button type="primary"
      pill>进入门店</a-button>
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
