<template>
  <section class="sg-section">
    <h3>st-container 纯容器组件</h3>
    <p>默认type为1</p>
    <st-container type="1">
      padding: 12px; border-radius: 4px; border: 1px solid @border-color;
    </st-container>
    <st-container type="2">padding: 24px;</st-container>
    <st-container type="2" class="bg-gray">
      padding: 24px; 配合 bg-gray 使用
    </st-container>
  </section>
</template>
