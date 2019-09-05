<template>
  <st-panel app>
    <div class="page-header">
      <st-t2>
        开始使用系统后，以前的数据怎么办？请参照以下说明完成批量导入
      </st-t2>
    </div>
    <a-row :class="b('row')">
      <p>
        1、门店是所有数据的基础，完成门店设置后进行数据导入。
        <router-link
          :to="{
            path: `/brand/setting/shop/list`
          }"
          target="_blank"
        >
          尚未完成，去设置？
        </router-link>
      </p>
      <p>
        2、导入文件格式仅支持xlxs，每份文件最多支持100000条数据。
      </p>
      <p>
        3、为了保证系统顺畅，将在系统非繁忙时间内，按照您上传文件的顺序依次进行数据导入，请您在次日检查导入结果。
      </p>
    </a-row>
    <st-container type="2" class="bg-gray">
      <div :class="b('item')">
        <st-t3 class="title">导入员工</st-t3>
        <label class="desc">员工基础信息</label>
        <st-button
          type="primary"
          @click="goRouter('/brand/setting/import/staff')"
        >
          导入员工
        </st-button>
      </div>
      <div :class="b('item')">
        <st-t3 class="title">导入商品</st-t3>
        <label class="desc">卡、课都属于商品</label>
        <st-button
          type="primary"
          @click="goRouter('/brand/setting/import/commodity')"
        >
          导入商品
        </st-button>
      </div>
      <div :class="b('item')">
        <st-t3 class="title">导入用户</st-t3>
        <label class="desc">
          门店会员（潜在会员、正式会员、流失会员）
        </label>
        <st-button
          type="primary"
          @click="goRouter('/brand/setting/import/member')"
        >
          导入用户
        </st-button>
      </div>
      <div :class="b('item-content')">
        <div class="item">
          <st-t3 class="title">导入售出</st-t3>
          <label class="desc">售出的卡、课记录</label>
          <st-button
            type="primary"
            @click="goRouter('/brand/setting/import/sold')"
          >
            导入售出
          </st-button>
        </div>
        <p>
          售出会影响门店财务等相关统计，目前仅支持门店状态为“创建中”时进行数据导入。
          <br />
          请在确认售出导入数据无误的情况下，更改店铺状态，一旦更改无法恢复，其他状态下，均不支持售出导入。
        </p>
      </div>
    </st-container>
  </st-panel>
</template>
<script>
export default {
  bem: {
    b: 'page-setting-explain',
    bContentItem: 'page-setting-explain__item-content'
  },
  serviceInject() {
    return {}
  },
  rxState() {
    return {}
  },
  data() {
    return {}
  },
  methods: {
    goRouter(path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>
