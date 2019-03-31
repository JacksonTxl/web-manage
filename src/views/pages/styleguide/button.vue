<template>
  <div>
    <h4>st-button 按钮</h4>
    <div class="mg-t16">

      <st-button pill
        size='small'>默认24px</st-button>
      <st-button pill
        size='medium'>28px size=medium</st-button>
      <st-button pill
        loading>32px</st-button>
      <st-button pill
        size='large'>40px</st-button>
      <st-button pill
        type='primary'
        size='small'>pill 24px</st-button>
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
      <div>
        <st-button block
          type='dashed'>表单添加 type=dashed</st-button>
      </div>
    </div>
  </div>
</template>
