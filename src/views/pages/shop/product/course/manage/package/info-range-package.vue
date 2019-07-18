<template>
  <section :class="basic()" class="page-shop-info-range-package">
    <st-panel>
      <div  :class="basic('package-info')">
        <div>
          <h2 class="title">{{packageInfo.course_name}}</h2>
          <p :class="basic('price-date')">
            <span :class="basic('price')">
              <st-icon type="money" class="mg-r8" color="#FFA900"></st-icon>
              <span class="label">售价：</span>{{packageInfo.price}}元
            </span>
            <span :class="basic('date')">
              <st-icon type="time" class="mg-r8" color="#1EC7DD"></st-icon>
              <span class="label">售卖时间：</span>{{packageInfo.start_time}}~{{packageInfo.end_time}}
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
          <st-form-table>
            <colgroup>
              <col style="width:5%;">
              <col style="width:10%;">
              <col style="width:21%;">
              <col style="width:27%;">
              <col style="width:20%;">
              <col style="width:17%;">
            </colgroup>
            <tr class="bg-thead table-header">
              <th></th>
              <th class="rightline">课程类型</th>
              <th class="pl-56">节数（节）</th>
              <th>课时费（元）</th>
              <th colspan="2">总价（元）</th>
            </tr>
            <tbody>
              <tr class="bg-row-odd checkbox" v-if="packageInfo.is_team">
                <td class="tg-c"></td>
                <td class="rightline">团体课程</td>
                <td class="pr-32 pl-56">{{packageInfo.team_times}}</td>
                <td class="pr-148">{{packageInfo.team_unit_price}}</td>
                <td>{{packageInfo.team_times*packageInfo.team_unit_price}}</td>
                <td class="overflow-hidden set-course-button">可预约{{packageInfo.team_range.length}}种课程</td>
              </tr>
              <tr class="bg-row-odd team-course-list-content" v-if="packageInfo.is_team">
                <td class="rightline" colspan="2"></td>
                <td class="team-course-table" colspan="4">
                  <div :class="info('team-course-table')">
                    <table>
                      <colgroup>
                        <col style="width:5%;">
                        <col style="width:81%;">
                        <col style="width:14%;">
                      </colgroup>
                      <tr class="bg-thead th border-bottom">
                        <th></th>
                        <th>课程名称</th>
                        <th></th>
                      </tr>
                      <tbody>
                        <tr>
                          <td colspan="3">
                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                            <ul class="team-course-content-table"
                            v-scrollBar
                            v-decorator="['teamCourseList2']">
                                <li class="checkbox"
                                :class="{
                                  'border-bottom':index+1!==packageInfo.team_range.length,
                                  'bg-row-odd':index%2===0,
                                  'bg-row-even':index%2!==0}"
                                v-for="(i,index) in packageInfo.team_range"
                                :key="i.course_id">
                                  <div class="tg-c"></div>
                                  <div>{{i.course_name}}</div>
                                  <div></div>
                                </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr class="bg-row-even checkbox topline"  v-if="packageInfo.is_personal">
                <td class="tg-c"></td>
                <td class="rightline">私教课程</td>
                <td class="pr-32 pl-56">{{packageInfo.personal_times}}</td>
                <td class="pr-148">{{packageInfo.personal_unit_price}}</td>
                <td>{{packageInfo.personal_times*packageInfo.personal_unit_price}}</td>
                <td class="overflow-hidden set-course-button">可预约{{packageInfo.personal_range.length}}种课程</td>
              </tr>
              <tr class="bg-row-even personal-course-list-content"  v-if="packageInfo.is_personal">
                <td class="rightline" colspan="2"></td>
                <td class="personal-course-table" colspan="4">
                  <div :class="info('personal-course-table')">
                    <table>
                      <colgroup>
                        <col style="width:5%;">
                        <col style="width:19%;">
                        <col style="width:76%;">
                      </colgroup>
                      <tr class="bg-thead th border-bottom">
                        <th></th>
                        <th>课程名称</th>
                        <th>支持预约的教练等级</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td colspan="5">
                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                            <ul class="personal-course-content-table"
                            v-scrollBar
                            v-decorator="['personalCourseList1']">
                                <li class="checkbox"
                                :class="{
                                  'border-bottom':index+1!==packageInfo.personal_range.length,
                                  'bg-row-odd':index%2===0,
                                  'bg-row-even':index%2!==0}"
                                v-for="(item,index) in packageInfo.personal_range"
                                :key="item.course_id">
                                  <div class="tg-c"></div>
                                  <div>{{item.course_name}}</div>
                                  <div>{{item.coach_level_text}}</div>
                                </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </st-form-table>
        </div>
        <st-info-item label="有效时间" class="mgb-24">购买后{{packageInfo.valid_time}}{{packageInfo.valid_time_unit | enumFilter('package_course.valid_time_unit')}}有效</st-info-item>
        <st-info-item label="允许冻结天数" class="mgb-24">{{packageInfo.frozen_days}}天</st-info-item>
        <st-info-item label="转让设置" class="mgb-24">{{transferText}}</st-info-item>
        <st-info-item label="售卖方式" class="mgb-24"><span v-for="(item,index) in packageInfo.sale_mode" :key="index"><i v-if="index>0">/</i>{{item | enumFilter('package_course.sale_mode')}}</span></st-info-item>
        <st-info-item label="备注" class="mgb-8"></st-info-item>
        <p :class="basic('remarks')">{{packageInfo.remarks || '无'}}</p>
      </st-info>
    </st-panel>
  </section>
</template>
<script>
import { InfoRangePackageService } from './info-range-package.service'
export default {
  name: 'ShopRangePackageInfo',
  serviceInject() {
    return {
      infoRangePackageService: InfoRangePackageService
    }
  },
  rxState() {
    return {
      packageInfo: this.infoRangePackageService.packageInfo$
    }
  },
  bem: {
    basic: 'page-shop-info-basic-package',
    info: 'page-shop-info-range-package'
  },
  computed: {
    transferText() {
      return this.packageInfo.is_allow_transfer ? '支持转让' : '不支持转让'
    }
  }
}
</script>
