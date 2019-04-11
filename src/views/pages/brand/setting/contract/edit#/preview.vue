<template>
  <div :class="b()">
    <header :class="b('header')">
      <img :class="b('brand-logo')" src="a.png" alt="brand-logo">
      <h1 :class="b('title')">private lessons</h1>
      <h4 :class="b('subtitle')">STYD健身学院</h4>
      <div :class="b('contract-no')">
        <label class="info-label">合同编号：</label>
        <span class="info-text">294389802</span>
      </div>
    </header>
    <section :class="b('basic')">
      <div :class="b('basic-list')">
        <a-row>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
        </a-row>
      </div>

      <div :class="b('avatar')">
        <img src="a.png" alt>
      </div>
    </section>
    <section :class="b('product')"></section>
    <section :class="b('advanced')"></section>
  </div>
</template>
<script>
export default {
  bem: {
    b: 'preview'
  }
}
</script>
