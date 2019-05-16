<template>
  <section :class="basic()" class="page-shop-info-unlimit-package">
    <st-panel>
      <div  :class="basic('package-info')">
        <div>
          <h2 class="title">{{packageInfo.course_name}}</h2>
          <p :class="basic('price-date')">
            <span :class="basic('price')">
              <span class="label"><st-icon class="mgr-8" type="wechat" />售价：</span>{{packageInfo.price}}元
            </span>
            <span :class="basic('date')">
              <span class="label"><st-icon class="mgr-8" type="wechat" />售卖时间：</span>{{packageInfo.start_time}}~{{packageInfo.end_time}}
            </span>
          </p>
          <p>{{packageInfo.intro || '无'}}</p>
        </div>
        <div :class="basic('image')">
          <img :src="packageInfo.image_url | imgFilter({ w: 280, h: 158 })" width="280" height="158" alt="封面">
        </div>
      </div>
    </st-panel>
    <st-panel class="mg-t16">
      <st-info>
        <st-info-item label="上课范围" class="mgb-8"></st-info-item>
        <div :class="info('course')" class="mgb-24">
          <table>
            <colgroup>
              <col style="width:8%;">
              <col style="width:16%;">
              <col style="width:27%;">
              <col style="width:28%;">
              <col style="width:21%;">
            </colgroup>
            <tr class="bg-thead br-b">
              <th></th>
              <th>课程类型</th>
              <th>节数（节）</th>
              <th>课时费（元）</th>
              <th>合计（元）</th>
            </tr>
            <tbody>
              <tr class="bg-row-team br-b" v-if="packageInfo.is_team">
                <td class="tg-c"></td>
                <td>团体课程</td>
                <td class="pr-32">{{packageInfo.team_times}}</td>
                <td class="pr-32">{{packageInfo.team_unit_price}}</td>
                <td>{{packageInfo.team_times*packageInfo.team_unit_price}}</td>
              </tr>
              <tr class="bg-row-personal br-b" v-if="packageInfo.is_personal">
                <td class="tg-c"></td>
                <td>私教课程</td>
                <td class="pr-32">{{packageInfo.personal_times}}</td>
                <td class="pr-32">{{packageInfo.personal_unit_price}}</td>
                <td>{{packageInfo.personal_times*packageInfo.personal_unit_price}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <st-info-item label="有效时间" class="mgb-24">购买后{{packageInfo.valid_time}}{{packageInfo.valid_time_unit | enumFilter('package_course.valid_time_unit')}}有效</st-info-item>
        <st-info-item label="允许冻结天数" class="mgb-24">{{packageInfo.frozen_days}}天</st-info-item>
        <st-info-item label="转让设置" class="mgb-24">{{transferText}}</st-info-item>
        <st-info-item label="售卖渠道" class="mgb-24">{{packageInfo.sale_mode[0] | enumFilter('package_course.sale_mode')}}</st-info-item>
        <st-info-item label="备注" class="mgb-8"></st-info-item>
        <p :class="basic('remarks')">{{packageInfo.remarks || '无'}}</p>
      </st-info>
    </st-panel>
  </section>
</template>
<script>
import { InfoUnlimitPackageService } from './info-unlimit-package.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'ShopUnlimitPackageInfo',
  serviceInject() {
    return {
      userService: UserService,
      infoUnlimitPackageService: InfoUnlimitPackageService
    }
  },
  rxState() {
    return {
      packageInfo: this.infoUnlimitPackageService.packageInfo$,
      package_course: this.userService.packageCourseEnums$
    }
  },
  bem: {
    basic: 'page-shop-info-basic-package',
    info: 'page-shop-info-unlimit-package'
  },
  computed: {
    transferText() {
      return this.packageInfo.is_allow_transfer ? '支持转让' : '不支持转让'
    }
  }
}
</script>
