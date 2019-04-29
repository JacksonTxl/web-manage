<template>
  <div>
    <st-t4>跟进信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="来源类别">孙乐乐</st-info-item>
          <st-info-item label="更进教练">中国</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="来源方式">小程序</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="更进销售">啦啦啦</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>跟进记录</st-t4>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-button block type="dashed" class="mg-t16 mg-b24">添加跟进记录</st-button>
      </a-col>
    </a-row>
  </div>
</template>
