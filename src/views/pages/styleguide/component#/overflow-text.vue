<template>
  <div>
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
    <p>[content]数组类型，代表分行</p>
    <div>
      <st-overflow-text
        :value="[
          '指定门店',
          'hdjsadhkadsjahgdjhasgjhgdasjhgdjsagdsjhdksjh',
          '打卡机大概好久啊是的感觉撒给大家啊是空间的撒谎就快点回家啊是个好的事'
        ]"
        max-width="200px"
      ></st-overflow-text>
    </div>
  </div>
</template>
