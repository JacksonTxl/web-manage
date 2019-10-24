<template>
  <div>
    <p>[status] 传入status对象变化文本状态</p>
    <st-status-text :status="{ success: 1 }">成功</st-status-text>
    <st-status-text :status="{ error: 1 }">错误</st-status-text>
    <st-status-text :status="{ warning: 1 }">警告</st-status-text>
    <st-status-text :status="{ info: 1 }">信息</st-status-text>
    <st-status-text :status="{ normal: 1 }">一般</st-status-text>
  </div>
</template>
