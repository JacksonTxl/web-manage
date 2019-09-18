<template>
  <section class="sg-section">
    <h3>st-overflow-text</h3>
    <p>可能超限的内容容器</p>
    <div>
      <!-- 指定最大宽度 -->
      <st-overflow-text max-width="200px">
        这是一大段文本 这是一大段文本 这是一大段文本 这是一大段文本
        这是一大段文本 这是一大段文本 这是一大段文本 这是一大段文本
        这是一大段文本 这是一大段文本 这是一大段文本
      </st-overflow-text>
    </div>
    <p>[title]标题</p>
    <div>
      <st-overflow-text title="指定门店" max-width="200px">
        这是一大段文本 这是一大段文本 这是一大段文本 这是一大段文本
        这是一大段文本 这是一大段文本 这是一大段文本 这是一大段文本
        这是一大段文本 这是一大段文本 这是一大段文本
      </st-overflow-text>
    </div>
  </section>
</template>
