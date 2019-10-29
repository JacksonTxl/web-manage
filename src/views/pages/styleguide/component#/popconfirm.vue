<template>
  <div>
    <p>默认文案 是否确认删除 属性与a-popconfirm一致</p>
    <div>
      <st-popconfirm>
        <a>删除</a>
      </st-popconfirm>
      <st-popconfirm
        class="mg-l8"
        title="这是一段非常长的文案 这是一段非常长的文案这是一段非常长的文案这是一段非常长的文案这是一段非常长的文案这是一段非常长的文案"
      >
        <a>长文案的删除</a>
      </st-popconfirm>
      <st-popconfirm class="mg-l8">
        <div slot="title">
          我相信这是一段非常长的文案我相信这是一段非常长的文案
          <span class="color-danger">这是一段文字</span>
        </div>
        <a>使用slot</a>
      </st-popconfirm>
    </div>
  </div>
</template>
