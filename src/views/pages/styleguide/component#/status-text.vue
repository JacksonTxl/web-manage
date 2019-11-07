<template>
  <div>
    <p>[status] 传入status对象变化文本状态</p>
    <st-text :status="{ success: 1 }">成功</st-text>
    <st-text :status="{ error: 1 }">错误</st-text>
    <st-text :status="{ warning: 1 }">警告</st-text>
    <st-text :status="{ info: 1 }">信息</st-text>
    <st-text :status="{ normal: 1 }">一般</st-text>
  </div>
</template>
