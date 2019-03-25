<template>
  <svg v-if='!isAntIcon'
    class="oa-icon"
    aria-hidden="true">
    <use :xlink:href="linkHref">
    </use>
  </svg>
  <a-icon v-else
    :type='antType' />
</template>

<script>
export default {
  name: 'StIcon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    linkHref() {
      return `#icon-${this.type}`
    },
    isAntIcon() {
      return this.type.indexOf('anticon:') > -1
    },
    antType() {
      return this.type.split(':')[1]
    }
  }
}
</script>

<style lang="less">
.oa-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.ant-menu-item,
.ant-menu-submenu-title {
  .oa-icon {
    .mg-r(10px);
  }
}
.ant-menu-inline-collapsed {
  .ant-menu-item,
  .ant-menu-submenu-title {
    .oa-icon {
      font-size: 16px;
      .mg(0);
      & + span {
        max-width: 0;
        display: inline-block;
        opacity: 0;
      }
    }
  }
}
</style>
