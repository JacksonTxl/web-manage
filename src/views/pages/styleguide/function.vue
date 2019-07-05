<template>
  <div>
    <h2>Function 函数</h2>
    <img-filter-demo id="img-filter"></img-filter-demo>
    <bem-demo id="bem"></bem-demo>
    <reg-exp-demo id="reg-exp"></reg-exp-demo>
  </div>
</template>

<script>
import ImgFilterDemo from './function#/img-filter'
import BemDemo from './function#/bem'
import RegExpDemo from './function#/reg-exp'
export default {
  components: {
    ImgFilterDemo,
    BemDemo,
    RegExpDemo
  }
}
</script>
