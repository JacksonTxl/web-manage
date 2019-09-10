<template>
  <section :class="basic()" class="page-shop-info-fix-package">
    <st-panel>
      <div :class="basic('package-info')">
        <div>
          <h2 class="title">{{ packageInfo.course_name }}</h2>
          <p :class="basic('price-date')">
            <span :class="basic('price')">
              <st-icon type="money" class="mg-r8" color="#FFA900"></st-icon>
              <span class="label">售价：</span>
              {{ packageInfo.price }}元
            </span>
            <span :class="basic('date')">
              <st-icon type="time" class="mg-r8" color="#1EC7DD"></st-icon>
              <span class="label">售卖时间：</span>
              {{ packageInfo.start_time }}~{{ packageInfo.end_time }}
            </span>
          </p>
          <p>{{ packageInfo.intro || '无' }}</p>
        </div>
        <div :class="basic('image')">
          <img
            :src="packageInfo.image_url | imgFilter({ w: 280, h: 158 })"
            width="280"
            height="158"
            alt="封面"
          />
        </div>
      </div>
    </st-panel>
    <st-panel class="mg-t16">
      <st-info>
        <st-info-item label="上课范围" class="mg-b8"></st-info-item>
        <div :class="info('course')" class="mg-b24">
          <st-form-table>
            <colgroup>
              <col style="width:12%;" />
              <col style="width:7%;" />
              <col style="width:53%;" />
              <col style="width:10%;" />
              <col style="width:18%;" />
            </colgroup>
            <tr class="bg-thead table-header">
              <th class="rightline tg-c">课程类型</th>
              <th></th>
              <th>节数（节）</th>
              <th>总价（元）</th>
              <th></th>
            </tr>
            <tbody>
              <tr class="bg-row-odd checkbox" v-if="packageInfo.is_team">
                <td class="rightline tg-c">团体课程</td>
                <td></td>
                <td>{{ packageInfo.team_times_total }}</td>
                <td>{{ packageInfo.team_unit_price_total }}</td>
                <td class="overflow-hidden set-course-button">
                  可预约{{ packageInfo.team_range.length }}种课程
                </td>
              </tr>
              <tr
                class="bg-row-odd team-course-list-content"
                v-if="packageInfo.is_team"
              >
                <td class="rightline tg-c"></td>
                <td class="team-course-table" colspan="4">
                  <div :class="info('team-course-table')">
                    <table>
                      <colgroup>
                        <col style="width:6.1%;" />
                        <col style="width:21.1%;" />
                        <col style="width:22.5%;" />
                        <col style="width:19.3%;" />
                        <col style="width:31%;" />
                      </colgroup>
                      <tr class="bg-thead th border-bottom">
                        <th></th>
                        <th>课程名称</th>
                        <th>节数（节）</th>
                        <th>课时费（元）</th>
                        <th>总价（元）</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td colspan="6">
                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                            <ul
                              class="team-course-content-table"
                              v-scrollBar
                              v-decorator="['teamCourseList2']"
                            >
                              <li
                                class="checkbox"
                                :class="{
                                  'border-bottom':
                                    index + 1 !== packageInfo.team_range.length,
                                  'bg-row-odd': index % 2 === 0,
                                  'bg-row-even': index % 2 !== 0
                                }"
                                v-for="(i, index) in packageInfo.team_range"
                                :key="i.course_id"
                              >
                                <div class="tg-c"></div>
                                <div>{{ i.course_name }}</div>
                                <div>{{ i.team_times }}</div>
                                <div>{{ i.team_unit_price }}</div>
                                <div>
                                  {{ i.team_times * i.team_unit_price }}
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr
                class="bg-row-even checkbox topline"
                v-if="packageInfo.is_personal"
              >
                <td class="rightline tg-c">私教课程</td>
                <td></td>
                <td>{{ packageInfo.personal_times_total }}</td>
                <td>{{ packageInfo.personal_unit_price_total }}</td>
                <td class="overflow-hidden set-course-button">
                  可预约{{ packageInfo.personal_range.length }}种课程
                </td>
              </tr>
              <tr
                class="bg-row-even personal-course-list-content"
                v-if="packageInfo.is_personal"
              >
                <td class="rightline tg-c"></td>
                <td class="personal-course-table" colspan="4">
                  <div :class="info('personal-course-table')">
                    <table>
                      <colgroup>
                        <col style="width:6.1%;" />
                        <col style="width:16.2%;" />
                        <col style="width:13.7%;" />
                        <col style="width:13.7%;" />
                        <col style="width:18.8%;" />
                        <col style="width:31.5%;" />
                      </colgroup>
                      <tr class="bg-thead th border-bottom">
                        <th></th>
                        <th>课程名称</th>
                        <th>节数（节）</th>
                        <th>课时费（元）</th>
                        <th>支持预约的教练等级</th>
                        <th>总价（元）</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td colspan="7">
                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                            <ul
                              class="personal-course-content-table"
                              v-scrollBar
                              v-decorator="['personalCourseList1']"
                            >
                              <li
                                class="checkbox"
                                :class="{
                                  'border-bottom':
                                    index + 1 !==
                                    packageInfo.personal_range.length,
                                  'bg-row-odd': index % 2 === 0,
                                  'bg-row-even': index % 2 !== 0
                                }"
                                v-for="(item,
                                index) in packageInfo.personal_range"
                                :key="item.course_id"
                              >
                                <div></div>
                                <div>{{ item.course_name }}</div>
                                <div>{{ item.personal_times }}</div>
                                <div>{{ item.personal_unit_price }}</div>
                                <div>
                                  <a-dropdown placement="bottomRight">
                                    <a href="javascript:void(0)">
                                      教练等级范围&nbsp;&nbsp;
                                      <st-icon
                                        class="icon-12"
                                        type="down-small"
                                      />
                                    </a>
                                    <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                    <ul
                                      :class="basic(`personal-dropdown`)"
                                      slot="overlay"
                                      class="personal-course-coach-grade-dropdown"
                                      v-scrollBar="{ stopPropagation: true }"
                                      v-decorator="[
                                        `personalCourseListCoachGrade${index}`
                                      ]"
                                    >
                                      <li
                                        v-for="(coachItem,
                                        coachIndex) in item.coach_level"
                                        :key="coachIndex"
                                      >
                                        {{ coachItem.setting_name }}
                                      </li>
                                    </ul>
                                  </a-dropdown>
                                </div>
                                <div>
                                  {{
                                    item.personal_times *
                                      item.personal_unit_price
                                  }}
                                </div>
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
        <st-info-item label="有效时间" class="mg-b24">
          购买后{{ packageInfo.valid_time
          }}{{
            packageInfo.valid_time_unit
              | enumFilter('package_course.valid_time_unit')
          }}有效
        </st-info-item>
        <st-info-item label="允许冻结天数" class="mg-b24">
          {{ packageInfo.frozen_days }}天
        </st-info-item>
        <st-info-item label="转让设置" class="mg-b24">
          {{ transferText }}
        </st-info-item>
        <st-info-item label="售卖方式" class="mg-b24">
          <span v-for="(item, index) in packageInfo.sale_mode" :key="index">
            <i v-if="index > 0">/</i>
            {{ item | enumFilter('package_course.sale_mode') }}
          </span>
        </st-info-item>
        <st-info-item label="备注" class="mg-b8"></st-info-item>
        <p :class="basic('remarks')">{{ packageInfo.remarks || '无' }}</p>
      </st-info>
    </st-panel>
  </section>
</template>
<script>
import { InfoFixPackageService } from './info-fix-package.service'
import { reduce } from 'lodash-es'
export default {
  name: 'ShopRangePackageInfo',
  serviceInject() {
    return {
      infoFixPackageService: InfoFixPackageService
    }
  },
  rxState() {
    return {
      packageInfo: this.infoFixPackageService.packageInfo$
    }
  },
  bem: {
    basic: 'page-shop-info-basic-package',
    info: 'page-shop-info-fix-package'
  },
  computed: {
    transferText() {
      return this.packageInfo.is_allow_transfer ? '支持转让' : '不支持转让'
    }
  }
}
</script>
