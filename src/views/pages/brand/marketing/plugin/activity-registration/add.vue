<template>
  <st-panel app :class="basic()" initial>
    <div :class="basic('left')">
      <h5-container>
        <template v-slot:title>
          我的优惠券
        </template>
      </h5-container>
    </div>
    <div :class="basic('body')">
      <a-steps :current="1" size="small">
        <a-step title="活动信息" />
        <a-step title="票种信息" />
        <a-step title="报名信息" />
      </a-steps>
    </div>
  </st-panel>
</template>
