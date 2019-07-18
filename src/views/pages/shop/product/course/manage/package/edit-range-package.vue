<template>
  <st-panel app :class="basic()" class="page-shop-add-range-package">
    <st-form :form='form' labelWidth="96px">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包名称" required>
            {{packageInfo.course_name}}
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="23" :xs="22" :offset="1">
          <st-form-item
          :class="{'st-has-error': !courseIsFirstInput&&courseIsNone}"
          :help="courseErrorText"
          required>
            <template slot="label">
              上课范围<st-help-tooltip id="TSCPCF002" />
            </template>
            <div :class="add('course')">
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
                  <th class="pl-56">节数</th>
                  <th class="pd-x16">课时费</th>
                  <th class="pd-x16" colspan="2">小计</th>
                </tr>
                <tbody>
                  <tr class="bg-row-odd checkbox">
                    <td class="tg-c"><a-checkbox :defaultChecked="!!packageInfo.is_team" @change="teamCheckboxChange"/></td>
                    <td class="rightline white-nowrap">团体课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number :min="1" :max="99999" style="min-width:100px" v-model="packageData.team_times" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-32">
                      <st-input-number :min="0" :max="999999.9" style="min-width:100px" v-model="packageData.team_unit_price" :float="true" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{team_total}}</td>
                    <td class="overflow-hidden">
                      <a class="set-course-button white-nowrap"
                      @click="teamCourseListShow"
                      :disabled="!packageData.is_team"
                      :class="{'hide':!(teamCourseListIsShow&&packageData.is_team)}"
                      href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-odd team-course-list-content" v-if="teamCourseListIsShow&&packageData.is_team">
                    <td class="rightline" colspan="2"></td>
                    <td class="team-course-table" colspan="4">
                      <div :class="add('team-course-table')">
                        <table>
                          <colgroup>
                            <col style="width:5%;">
                            <col style="width:81%;">
                            <col style="width:14%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程名称</th>
                            <th>操作</th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom">
                              <td colspan="3" class="team-course-add-buton">
                                <st-button block type="dashed" icon="add" @click="addCourse('team')">
                                  添加团体课程
                                </st-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="3">
                                <p v-if="!teamCourseList.length" class="bg-row-even"  style="margin: 0;text-align:center;padding: 8px 0;">无数据</p>
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="team-course-content-table"
                                v-if="teamCourseList.length"
                                v-scrollBar='{stopPropagation:true}'
                                v-decorator="['teamCourseList2']">
                                    <li class="checkbox border-bottom"
                                    :class="{'bg-row-odd':index%2!==0,'bg-row-even':index%2===0}"
                                    v-for="(i,index) in teamCourseList"
                                    :key="i.course_id">
                                      <div class="tg-c">
                                        <a-checkbox :checked="i.courseChecked" @change="courseItemCheckedChange($event,'team',index)" />
                                      </div>
                                      <div>{{i.course_name}}</div>
                                      <div>
                                        <a @click="removeCourseItem('team',i.course_id)" href="javascript:void(0)">删除</a>
                                      </div>
                                    </li>
                                </ul>
                              </td>
                            </tr>
                            <tr class="bg-thead checkbox topline">
                              <td class="tg-c">
                                <a-checkbox
                                :indeterminate="teamIndeterminate"
                                @change="checkAllChange('team')"
                                :checked="teamCheckAll" />
                              </td>
                              <td>批量操作</td>
                              <td>
                                <a @click="removeCourseItems('team')" href="javascript:void(0)">删除</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-row-even checkbox topline">
                    <td class="tg-c"><a-checkbox :defaultChecked="!!packageInfo.is_personal" @change="personalCheckboxChange" /></td>
                    <td class="rightline">私教课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number :min="1" :max="99999" v-model="packageData.personal_times" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-32">
                      <st-input-number :min="0" :max="999999.9"  v-model="packageData.personal_unit_price" :float="true" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{personal_total}}</td>
                    <td class="overflow-hidden">
                      <a class="set-course-button"
                      @click="personalCourseListShow"
                      :disabled="!packageData.is_personal"
                      :class="{'hide':!(personalCourseListIsShow&&packageData.is_personal)}"
                      href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-even personal-course-list-content" v-if="personalCourseListIsShow&&packageData.is_personal">
                    <td class="rightline" colspan="2"></td>
                    <td class="personal-course-table" colspan="4">
                      <div :class="add('personal-course-table')">
                        <table>
                          <colgroup>
                            <col style="width:5%;">
                            <col style="width:29%;">
                            <col style="width:34%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程名称</th>
                            <th>支持预约的教练等级</th>
                            <th>授课教练数</th>
                            <th>操作</th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom">
                              <td colspan="5" class="personal-course-add-buton">
                                <st-button block type="dashed" icon="add" @click="addCourse('personal')">
                                  添加私教课程
                                </st-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5">
                                <p v-if="!personalCourseList.length" class="bg-row-even"  style="margin: 0;text-align:center;padding: 8px 0;">无数据</p>
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="personal-course-content-table"
                                v-if="personalCourseList.length"
                                v-scrollBar='{stopPropagation:true}'
                                v-decorator="['personalCourseList1']">
                                    <li class="checkbox border-bottom"
                                    :class="{'bg-row-odd':index%2!==0,'bg-row-even':index%2===0}"
                                    v-for="(item,index) in personalCourseList"
                                    :key="item.course_id">
                                      <div class="tg-c">
                                        <a-checkbox :checked="item.courseChecked" @change="courseItemCheckedChange($event,'personal',index)" />
                                      </div>
                                      <div>{{item.course_name}}</div>
                                      <div>
                                        <a-dropdown placement="bottomRight" :trigger="['click']">
                                          <a href="javascript:void(0)">{{item.coachGradeList.length===coachList.length?'全部':`${item.coachGradeList.length}个`}}等级&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                                          <a-checkbox-group
                                          :class="basic(`personal-dropdown`)"
                                          v-model="item.coachGradeList"
                                          @change="coachItemChange($event,item.course_id,index)"
                                          slot="overlay">
                                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                            <ul class="personal-course-coach-grade-dropdown" v-scrollBar='{stopPropagation:true}' v-decorator="[`personalCourseListCoachGrade${index}`]">
                                              <li
                                              v-for="(coachItem,coachIndex) in coachList"
                                              :key="coachIndex">
                                                <a-checkbox :value="coachItem.id">{{coachItem.setting_name}}</a-checkbox>
                                              </li>
                                            </ul>
                                          </a-checkbox-group>
                                        </a-dropdown>
                                      </div>
                                      <div>{{item.coach}}</div>
                                      <div>
                                        <a @click="removeCourseItem('personal',item.course_id)" href="javascript:void(0)">删除</a>
                                      </div>
                                    </li>
                                </ul>
                              </td>
                            </tr>
                            <tr class="bg-thead checkbox topline">
                              <td class="tg-c"><a-checkbox
                                :indeterminate="personalIndeterminate"
                                @change="checkAllChange('personal')"
                                :checked="personalCheckAll" />
                              </td>
                              <td>批量操作</td>
                              <td>
                                <a-dropdown placement="bottomRight" :trigger="['click']" v-model="coachAllOperationDropdownIsShow">
                                  <a href="javascript:void(0)">批量设置等级&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                                  <a-checkbox-group
                                  :class="basic(`personal-dropdown`)"
                                  v-model="personalAllOperationCoachList"
                                  @change="coachAllChange"
                                  class="all"
                                  slot="overlay">
                                    <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                    <ul class="personal-course-coach-grade-dropdown" v-scrollBar='{stopPropagation:true}' v-decorator="['personalCourseListCoachGradeAll']">
                                      <li
                                        v-for="(coachItem,coachIndex) in coachList"
                                        :key="coachIndex">
                                          <a-checkbox :value="coachItem.id">{{coachItem.setting_name}}</a-checkbox>
                                      </li>
                                    </ul>
                                    <div class="personal-course-coach-grade-dropdown-button">
                                      <a href="javascript:void(0)" :disabled="!personalAllOperationCoachList.length" @click="coachAllOperationOk">确定</a>
                                    </div>
                                  </a-checkbox-group>
                                </a-dropdown>
                              </td>
                              <td>{{personalAllOperationCoachTotal}}</td>
                              <td>
                                <a @click="removeCourseItems('personal')" href="javascript:void(0)">删除</a>
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
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="总价">{{all_total}}元</st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖价格" required>
            <st-input-number
              placeholder="请输入售卖价格"
              :min="0"
              :max="99999.9"
              v-decorator="[
                'price',
                 {rules: [{ required: true, message: '请输入售卖价格' }]}
              ]"
              :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item class="mg-b0" label="支持售卖时间" required>
            <div :class="basic('saletime')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  :disabledDate="disabledStartDate"
                  v-decorator="['start_time',{rules:[{validator:start_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                  @openChange="handleStartOpenChange"
                  @change="start_time_change"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  v-decorator="['end_time',{rules:[{validator:end_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  @change="end_time_change"
                />
              </a-form-item>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="有效时间" required>
            <st-input-number
              placeholder="请输入有效时间"
              :min="1"
              :max="99999"
              v-decorator="[
                'valid_time',
                 {initialValue: null,rules: [{ required: true, message: '请输入有效时间' }]}
              ]">
              <a-select v-model="packageData.valid_time_unit" slot="addonAfter" style="width: 60px">
                <a-select-option
                v-for="(item,index) in unitList"
                :value="item.value"
                :key="index" >{{item.label}}</a-select-option>
              </a-select>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="允许冻结天数" required>
            <st-input-number
              placeholder="请输入允许冻结天数"
              :min="1"
              :max="99999"
              v-decorator="[
                'frozen_days',
                 {initialValue: null,rules: [{ required: true, message: '请输入允许冻结天数' }]}
              ]">
              <template slot="addonAfter">天</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="转让设置">
            <div :class="basic('transfer')">
              <a-checkbox :class="basic('transfer-checkbox')" :defaultChecked="!!packageInfo.is_allow_transfer" @change="transfer">支持转让</a-checkbox>
              <st-input-number
              :min="0"
              :max="packageData.transfer_unit===1?100:99999.9"
              v-decorator="[
                'transfer_rate',
                 {rules: [{required: packageData.is_allow_transfer!==0, message: '请输入转让值数值'}]}
              ]" :disabled="packageData.is_allow_transfer===0" :float="packageData.transfer_unit===2" :class="basic('transfer-input')" style="padding-right:0;">
                <a-select :disabled="packageData.is_allow_transfer===0" slot="addonAfter" @change="transferUnitChange" v-model="packageData.transfer_unit" style="width: 60px">
                  <a-select-option v-for="item in transferUnitList" :key="item.value" :value="+item.value">{{item.label}}</a-select-option>
                </a-select>
              </st-input-number>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖方式" required>
            <a-checkbox-group v-model="packageData.sale_mode">
              <a-checkbox
              v-for="item in sellTypeList"
              :key="item.value"
              :disabled="item.value===2"
              :value="item.value">{{item.label}}</a-checkbox>
            </a-checkbox-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="22" :xs="22" :offset="1">
          <st-form-item
          validate-status="error"
          :help="imageErrorText"
          label="封面" required>
            <div :class="basic('upload')">
              <st-image-upload
              :class="basic('st-upload')"
              :cropperModal="cropperModal"
              :sizeLimit="5"
              :list="fileList"
              @change="fileChange">
                <i :class="basic('st-upload-icon')"></i>
                <div :class="basic('st-upload-text')">上传封面</div>
              </st-image-upload>
              <div :class="basic('upload-describe')">
                <p>图片格式必须为:png,bmp,jpeg,jpg,gif,建议使用png格式图片,以保存最佳效果</p>
                <p>建议尺寸为750像素X422像素,不可大于2m</p>
              </div>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包介绍">
             <st-textarea
                v-model="packageData.intro"
                :maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入课程包介绍"
                />
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="备注">
             <st-textarea
                v-model="packageData.remarks"
                :maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入备注"
                />
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label=" ">
          <st-button type="primary" class="mr-8" @click="save" :loading="editLoading.editPackage">保存</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { cloneDeep, remove, every, filter, reduce, forEach } from 'lodash-es'
import { EditRangePackageService } from './edit-range-package.service'
export default {
  name: 'ShopRangePackageEdit',
  serviceInject() {
    return {
      editPackageService: EditRangePackageService
    }
  },
  rxState() {
    return {
      transferUnitList: this.editPackageService.transferUnitList$,
      sellTypeList: this.editPackageService.sellTypeList$,
      unitList: this.editPackageService.unitList$,
      editLoading: this.editPackageService.loading$,
      coachList: this.editPackageService.coachList$,
      packageInfo: this.editPackageService.packageInfo$
    }
  },
  bem: {
    add: 'page-shop-add-range-package',
    basic: 'page-shop-add-basic-package'
  },
  data() {
    return {
      packageData: {
        // 售价
        price: undefined,
        // 是否支持团体课 0为不支持 1为支持
        is_team: 0,
        // 团体课总节数
        team_times: undefined,
        // 团体课单价
        team_unit_price: undefined,
        // 团体课上课范围课程id
        team_range: [],
        // 是否支持私教课 0为不支持 1为支持
        is_personal: 0,
        // 私教课总节数
        personal_times: undefined,
        // 私教课单价
        personal_unit_price: undefined,
        // 私教课上课范围课程id course_id私教课课程id coach_level私教课支持预约的教练等级
        personal_range: [],
        // 售卖开始时间
        start_time: '',
        // 售卖截止时间
        end_time: '',
        // 有效时间值
        valid_time: undefined,
        // 有效时间单位 1:天 2:月 3:年
        valid_time_unit: 1,
        // 允许冻结天数
        frozen_days: undefined,
        // 售卖方式
        sale_mode: [2],
        // 是否可以转让: 0 不可以 1 可以
        is_allow_transfer: 0,
        // 转让费率
        transfer_rate: undefined,
        // 转让单位 1:百分比 2:元
        transfer_unit: 1,
        // 封面对象
        image: {
          image_id: null,
          image_key: ''
        },
        // 课程包介绍
        intro: '',
        // 备注
        remarks: ''
      },
      // 课程范围是否未输入过
      courseIsFirstInput: true,
      // team course
      teamCourseList: [],
      teamCourseListIsShow: false,
      teamIndeterminate: false,
      teamCheckAll: false,
      // personal course
      personalCourseList: [],
      personalCoachTotalList: {},
      personalCoachListHistory: [],
      personalAllOperationCoachList: [],
      personalAllOperationCoachTotal: 0,
      personalCourseListIsShow: false,
      personalIndeterminate: false,
      personalCheckAll: false,
      coachAllOperationDropdownIsShow: false,
      // 课程范围是否未配置
      courseIsNone: false,
      courseErrorText: '',
      form: this.$form.createForm(this),
      start_time: null,
      end_time: null,
      endOpen: false,
      // 是否配置了用户端
      appConfig: true,
      // 是否未传了封面
      imageIsNone: false,
      imageErrorText: '',
      fileList: [],
      cropperModal: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.packageInfo.is_team) {
        this.packageInfo.team_times = undefined
        this.packageInfo.team_unit_price = undefined
        this.packageInfo.team_range = []
      }
      if (!this.packageInfo.is_personal) {
        this.packageInfo.personal_times = undefined
        this.packageInfo.personal_unit_price = undefined
        this.packageInfo.personal_range = []
      }
      if (!this.packageInfo.is_allow_transfer) {
        this.packageInfo.transfer_rate = undefined
      }
      this.form.setFieldsValue({
        'price': this.packageInfo.price,
        'start_time': moment(this.packageInfo.start_time * 1000),
        'end_time': moment(this.packageInfo.end_time * 1000),
        'valid_time': this.packageInfo.valid_time,
        'frozen_days': this.packageInfo.frozen_days,
        'transfer_rate': this.packageInfo.transfer_rate
      })
      // 课程范围
      this.packageData.is_team = this.packageInfo.is_team
      this.packageData.team_times = this.packageInfo.team_times
      this.packageData.team_unit_price = this.packageInfo.team_unit_price
      forEach(this.packageInfo.team_range, o => {
        this.teamCourseList.push({
          courseChecked: false,
          course_category: o.course_category,
          course_id: o.course_id,
          course_name: o.course_name,
          course_type: o.course_type
        })
      })
      this.packageData.is_personal = this.packageInfo.is_personal
      this.packageData.personal_times = this.packageInfo.personal_times
      this.packageData.personal_unit_price = this.packageInfo.personal_unit_price
      forEach(this.packageInfo.personal_range, o => {
        let coachGradeList = []
        o.coach_level.forEach(i => {
          coachGradeList.push(i.id)
        })
        let selectCoach = filter(this.coachList, i => coachGradeList.includes(i.id))
        let total = reduce(selectCoach, (sum, i) => sum + i.coach_number, 0)
        this.personalCourseList.push({
          courseChecked: false,
          course_category: o.course_category,
          course_id: o.course_id,
          course_name: o.course_name,
          course_type: o.course_type,
          coachGradeList,
          coach: total
        })
        this.personalCoachTotalList[o.course_id] = this.personalCoachTotalList[o.course_id] || {}
        this.personalCoachTotalList[o.course_id].list = cloneDeep(o.coach_level)
        this.personalCoachTotalList[o.course_id].total = total
        this.personalCoachListHistory.push(cloneDeep(o.coach_level))
      })
      // 售卖时间
      this.start_time = moment(this.packageInfo.start_time * 1000)
      this.end_time = moment(this.packageInfo.end_time * 1000)
      // 有效时间单位
      this.packageData.valid_time_unit = this.packageInfo.valid_time_unit
      // 转让设置
      this.packageData.is_allow_transfer = this.packageInfo.is_allow_transfer
      this.packageData.transfer_unit = this.packageInfo.transfer_unit
      // 售卖方式
      this.packageData.sale_mode = this.packageInfo.sale_mode
      // 封面
      this.fileList = [this.packageInfo.image]
      this.packageData.image.image_id = this.fileList[0].image_id
      this.packageData.image.image_key = this.fileList[0].image_key
      this.imageIsNone = false
      this.imageErrorText = ''
      // 介绍
      this.packageData.intro = this.packageInfo.intro
      // 备注
      this.packageData.remarks = this.packageInfo.remarks
    },
    // 保存
    save() {
      this.course_validator()
      this.image_validator()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && !this.courseIsNone && !this.imageIsNone) {
          this.packageData.price = values.price
          this.packageData.valid_time = values.valid_time
          this.packageData.frozen_days = values.frozen_days
          this.packageData.transfer_rate = this.packageData.is_allow_transfer ? +values.transfer_rate : undefined
          this.packageData.start_time = `${this.start_time.format('YYYY-MM-DD')}`
          this.packageData.end_time = `${this.end_time.format('YYYY-MM-DD')}`
          this.packageData.team_range = []
          this.teamCourseList.forEach(i => {
            this.packageData.team_range.push(i.course_id)
          })
          this.packageData.personal_range = []
          this.personalCourseList.forEach(i => {
            this.packageData.personal_range.push({
              course_id: i.course_id,
              coach_level: cloneDeep(i.coachGradeList)
            })
          })
          if (this.packageData.is_team) {
            this.packageData.team_unit_price = +this.packageData.team_unit_price
          }
          if (this.packageData.is_personal) {
            this.packageData.personal_unit_price = +this.packageData.personal_unit_price
          }
          console.log(this.packageData)
          this.editPackageService.editPackage(this.packageData).subscribe(res => {
            this.$router.push({ path: '/shop/product/course/manage/package/list' })
          })
        }
      })
    },
    // checkboxChange
    teamCheckboxChange(e) {
      this.packageData.is_team = +e.target.checked
      this.courseIsFirstInput = false
      this.teamCourseListIsShow = +e.target.checked
    },
    personalCheckboxChange(e) {
      this.packageData.is_personal = +e.target.checked
      this.courseIsFirstInput = false
      this.personalCourseListIsShow = +e.target.checked
    },
    // team
    teamCourseListShow() {
      this.teamCourseListIsShow = !this.teamCourseListIsShow
    },
    // personal
    personalCourseListShow() {
      this.personalCourseListIsShow = !this.personalCourseListIsShow
    },
    // 添加课程
    addCourse(type) {
      let that = this
      if (type === 'team') {
        this.$modalRouter.push({
          name: 'course-select-course',
          props: {
            type,
            courses: this.teamCourseList
          },
          on: {
            ok(data) {
              data.list.forEach(i => {
                i.courseChecked = false
              })
              that.teamCourseList = cloneDeep(data.list)
            }
          }
        })
      } else if (type === 'personal') {
        this.$modalRouter.push({
          name: 'course-select-course',
          props: {
            type,
            courses: this.personalCourseList
          },
          on: {
            ok(data) {
              let coachGradeList = []
              forEach(that.coachList, i => {
                coachGradeList.push(i.id)
              })
              let total = reduce(that.coachList, (sum, o) => sum + o.coach_number, 0)
              data.list.forEach(i => {
                i.courseChecked = false
                i.coachGradeList = coachGradeList
                i.coach = total
              })
              forEach(that.personalCoachTotalList, (value, key) => {
                forEach(data.list, innerValue => {
                  if (+innerValue.course_id === +key) {
                    innerValue.coachGradeList = cloneDeep(value.list)
                    innerValue.coach = cloneDeep(value.total)
                  }
                })
                // 删除personalCoachTotalList里不存在的course_id项
                if (!data.list.some(o => +o.course_id === +key)) {
                  delete that.personalCoachTotalList[key]
                }
              })
              that.personalCoachListHistory = []
              // 缓存选择的教练等级
              data.list.forEach(i => {
                that.personalCoachListHistory.push(i.coachGradeList)
              })
              that.personalCourseList = cloneDeep(data.list)
            }
          }
        })
      }
    },
    // 移除课程
    removeCourseItem(type, id) {
      if (type === 'team') {
        let arr = cloneDeep(this.teamCourseList)
        remove(arr, o => o.course_id === id)
        this.teamCourseList = arr
      } else if (type === 'personal') {
        let arr = cloneDeep(this.personalCourseList)
        remove(arr, o => o.course_id === id)
        this.personalCourseList = arr
        // 移除备份选择的教练list
        let coachList = cloneDeep(this.personalCoachTotalList)
        delete coachList[id]
        this.personalCoachTotalList = coachList
      }
    },
    // 移除选择的课程
    removeCourseItems(type) {
      if (type === 'team') {
        let arr = cloneDeep(this.teamCourseList)
        remove(arr, o => o.courseChecked)
        this.teamCourseList = arr
      } else if (type === 'personal') {
        let arr = cloneDeep(this.personalCourseList)
        let removeList = remove(arr, o => o.courseChecked)
        this.personalCourseList = arr
        // 移除备份选择的教练list
        let coachList = cloneDeep(this.personalCoachTotalList)
        removeList.forEach(i => {
          delete coachList[i.course_id]
        })
        this.personalCoachTotalList = coachList
      }
    },
    // 选择课程
    courseItemCheckedChange(e, type, index) {
      if (type === 'team') {
        this.teamCourseList[index].courseChecked = e.target.checked
      } else if (type === 'personal') {
        this.personalCourseList[index].courseChecked = e.target.checked
      }
    },
    // 全选
    checkAllChange(type) {
      if (type === 'team') {
        this.teamCourseList.forEach(i => {
          i.courseChecked = !this.teamCheckAll
        })
      } else if (type === 'personal') {
        this.personalCourseList.forEach(i => {
          i.courseChecked = !this.personalCheckAll
        })
      }
    },
    // item coach checkboxGroup changeEvent
    coachItemChange(e, id, index) {
      if (!e.length) {
        this.personalCourseList[index].coachGradeList = this.personalCoachListHistory[index]
        return
      } else {
        this.personalCoachListHistory[index] = cloneDeep(e)
      }
      this.personalCoachTotalList[id] = {}
      this.personalCoachTotalList[id].list = cloneDeep(e)
      let selectCoach = filter(this.coachList, o => e.includes(o.id))
      let total = reduce(selectCoach, (sum, o) => sum + o.coach_number, 0)
      this.personalCoachTotalList[id].total = total
      // 设置教练总数
      this.personalCourseList.forEach(i => {
        if (i.course_id === id) {
          i.coach = total
        }
      })
    },
    coachAllChange(e) {
      let selectCoach = filter(this.coachList, o => e.includes(o.id))
      this.personalAllOperationCoachTotal = reduce(selectCoach, (sum, o) => sum + o.coach_number, 0)
    },
    coachAllOperationOk() {
      // 批量设置
      forEach(this.personalCourseList, value => {
        if (value.courseChecked) {
          value.coachGradeList = cloneDeep(this.personalAllOperationCoachList)
          value.coach = this.personalAllOperationCoachTotal
          this.personalCoachTotalList[value.course_id] = {}
          this.personalCoachTotalList[value.course_id].list = cloneDeep(this.personalAllOperationCoachList)
          this.personalCoachTotalList[value.course_id].total = this.personalAllOperationCoachTotal
        }
      })
      // 缓存选择的教练等级
      this.personalCoachListHistory = []
      forEach(this.personalCourseList, i => {
        this.personalCoachListHistory.push(i.coachGradeList)
      })
      // 清空
      this.personalAllOperationCoachList = []
      this.personalAllOperationCoachTotal = 0
      // 收起
      this.coachAllOperationDropdownIsShow = false
    },
    // course validatorFn
    course_validator() {
      this.courseIsFirstInput = false
      let teamIsOk = false
      let personalIsOk = false
      if (this.packageData.is_team) {
        teamIsOk = this.team_total && this.teamCourseList.length
      } else {
        teamIsOk = true
      }
      if (this.packageData.is_personal) {
        personalIsOk = this.personal_total && this.personalCourseList.length
      } else {
        personalIsOk = true
      }
      if (teamIsOk && personalIsOk && !(!this.packageData.is_team && !this.packageData.is_personal)) {
        // 校验通过
        this.courseIsNone = false
        this.courseErrorText = ''
      } else {
        // 校验未通过
        this.courseIsNone = true
        this.courseErrorText = '请输入上课范围'
      }
    },
    // image validatorFn
    image_validator() {
      if (this.packageData.image.image_key !== '') {
        // 校验通过
        this.imageIsNone = false
        this.imageErrorText = ''
      } else {
        // 校验未通过
        this.imageIsNone = true
        this.imageErrorText = '请上传封面'
      }
    },
    // 转让
    transfer(e) {
      this.packageData.is_allow_transfer = +e.target.checked
      // 重置转让费用的校验
      this.packageData.transfer_rate = undefined
      this.form.resetFields(['transfer_rate'])
    },
    fileChange(data) {
      if (data.length) {
        // 上传
        this.packageData.image.image_id = data[0].image_id
        this.packageData.image.image_key = data[0].image_key
        this.imageIsNone = false
        this.imageErrorText = ''
      } else {
        // 删除
        this.packageData.image.image_id = null
        this.packageData.image.image_key = ''
        this.imageIsNone = true
        this.imageErrorText = '请上传封面'
      }
    },
    transferUnitChange() {
      this.packageData.transfer_rate = undefined
      this.form.setFieldsValue({
        'transfer_rate': undefined
      })
    },
    // start_time validatorFn
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择结束售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return startValue.valueOf() < moment().startOf('day').valueOf()
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().startOf('day').valueOf()
      return startValue.valueOf() < start || startValue.valueOf() > moment(endValue).valueOf()
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return endValue.valueOf() < moment().startOf('day').valueOf()
      }
      return endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).valueOf() || endValue.valueOf() < moment().startOf('day').valueOf()
    },
    // moment
    moment
  },
  watch: {
    teamCourseList: {
      deep: true,
      handler(newVal) {
        let allSelect = false
        let allNotSelect = false
        allSelect = every(newVal, o => o.courseChecked)
        allNotSelect = every(newVal, o => !o.courseChecked)
        this.teamIndeterminate = !allSelect && !allNotSelect
        this.teamCheckAll = newVal.length ? allSelect : false
      }
    },
    personalCourseList: {
      deep: true,
      handler(newVal) {
        let allSelect = false
        let allNotSelect = false
        allSelect = every(newVal, o => o.courseChecked)
        allNotSelect = every(newVal, o => !o.courseChecked)
        this.personalIndeterminate = !allSelect && !allNotSelect
        this.personalCheckAll = newVal.length ? allSelect : false
      }
    }
  },
  computed: {
    // 团课小计
    team_total() {
      if (+this.packageData.team_times && +this.packageData.team_unit_price) {
        return this.packageData.team_times * (this.packageData.team_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    // 私教小计
    personal_total() {
      if (+this.packageData.personal_times && +this.packageData.personal_unit_price) {
        return this.packageData.personal_times * (this.packageData.personal_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    all_total() {
      let teamTotal = this.packageData.is_team ? this.team_total : 0
      let personalTotal = this.packageData.is_personal ? this.personal_total : 0
      return teamTotal + personalTotal
    }
  }
}
</script>
