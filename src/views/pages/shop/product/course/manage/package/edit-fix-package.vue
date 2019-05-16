<template>
  <st-panel app :class="basic()" class="page-shop-add-fix-package">
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
          label="上课范围"
          required>
            <div :class="add('course')">
              <table>
                <colgroup>
                  <col style="width:5%;">
                  <col style="width:10%;">
                  <col style="width:24%;">
                  <col style="width:18%;">
                  <col style="width:18%;">
                  <col style="width:25%;">
                </colgroup>
                <tr class="bg-thead table-header">
                  <th></th>
                  <th class="rightline">课程类型</th>
                  <th></th>
                  <th>节数</th>
                  <th>小计</th>
                  <th></th>
                </tr>
                <tbody>
                  <tr class="bg-row-odd checkbox">
                    <td class="tg-c"><a-checkbox :defaultChecked="!!packageInfo.is_team" @change="teamCheckboxChange"/></td>
                    <td class="rightline">团体课程</td>
                    <td></td>
                    <td>{{teamCourseTotalObject.team_times}}节</td>
                    <td>{{teamCourseTotalObject.total}}元</td>
                    <td class="overflow-hidden">
                      <a class="set-course-button"
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
                            <col style="width:20%;">
                            <col style="width:28%;">
                            <col style="width:28%;">
                            <col style="width:10%;">
                            <col style="width:9%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程名称</th>
                            <th>节数</th>
                            <th>课时费</th>
                            <th>总价</th>
                            <th>操作</th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom">
                              <td colspan="6" class="team-course-add-buton">
                                <a-button block type="dashed" @click="addCourse('team')">
                                  <st-icon class="icon-12 mr-8" type="add"></st-icon>
                                  添加团体课程
                                </a-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6">
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
                                        <st-input-number @change="teamInputChange($event,'team_times',i.course_id)" v-model="i.team_times">
                                          <template slot="addonAfter">节</template>
                                        </st-input-number>
                                      </div>
                                      <div>
                                        <st-input-number @change="teamInputChange($event,'team_unit_price',i.course_id)" v-model="i.team_unit_price" :float="true">
                                          <template slot="addonAfter">元</template>
                                        </st-input-number>
                                      </div>
                                      <div>{{ i.team_times | course_item_total(i.team_unit_price)}}</div>
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
                              <td class="pr-24">
                                <st-input-number v-model="teamOperationObject.team_times">
                                  <a :disabled="!+teamOperationObject.team_times" href="javascript:void(0)" slot="addonAfter" @click="times_operation_ok('team')">确定</a>
                                </st-input-number>
                              </td>
                              <td class="pr-24">
                                <st-input-number v-model="teamOperationObject.team_unit_price" :float="true">
                                  <a :disabled="!+teamOperationObject.team_unit_price" href="javascript:void(0)" slot="addonAfter" @click="unit_price_operation_ok('team')">确定</a>
                                </st-input-number>
                              </td>
                              <td>{{ teamOperationObject.team_times | course_item_total(teamOperationObject.team_unit_price)}}</td>
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
                    <td></td>
                    <td>{{personalCourseTotalObject.personal_times}}节</td>
                    <td>{{personalCourseTotalObject.total}}元</td>
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
                            <col style="width:20%;">
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:23%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程名称</th>
                            <th>节数</th>
                            <th>课时费</th>
                            <th class="tg-c">支持预约的教练等级</th>
                            <th>总价</th>
                            <th>操作</th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom">
                              <td colspan="7" class="personal-course-add-buton">
                                <a-button block type="dashed" @click="addCourse('personal')">
                                  <st-icon class="icon-12 mr-8" type="add"></st-icon>
                                  添加私教课程
                                </a-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="7">
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
                                        <st-input-number @change="personalInputChange($event,'personal_times',item.course_id)" v-model="item.personal_times">
                                          <template slot="addonAfter">节</template>
                                        </st-input-number>
                                      </div>
                                      <div>
                                        <st-input-number @change="personalInputChange($event,'personal_unit_price',item.course_id)" v-model="item.personal_unit_price" :float="true">
                                          <template slot="addonAfter">元</template>
                                        </st-input-number>
                                      </div>
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
                                      <div>{{ item.personal_times | course_item_total(item.personal_unit_price)}}</div>
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
                              <td class="pr-24">
                                <st-input-number v-model="personalOperationObject.personal_times">
                                  <a :disabled="!+personalOperationObject.personal_times" href="javascript:void(0)" slot="addonAfter" @click="times_operation_ok('personal')">确定</a>
                                </st-input-number>
                              </td>
                              <td class="pr-24">
                                <st-input-number v-model="personalOperationObject.personal_unit_price" :float="true">
                                  <a :disabled="!+personalOperationObject.personal_unit_price" href="javascript:void(0)" slot="addonAfter" @click="unit_price_operation_ok('personal')">确定</a>
                                </st-input-number>
                              </td>
                              <td class="tg-c">
                                <a-dropdown placement="bottomRight" :trigger="['click']" v-model="coachAllOperationDropdownIsShow">
                                  <a href="javascript:void(0)">批量设置等级&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                                  <a-checkbox-group
                                  :class="basic(`personal-dropdown`)"
                                  v-model="personalAllOperationCoachList"
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
                              <td>{{ personalOperationObject.personal_times | course_item_total(personalOperationObject.personal_unit_price)}}</td>
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
              </table>
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
                v-for="(item,index) in unit_list"
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
              :max="packageData.transfer_unit===1?100:99999.9"
              v-decorator="[
                'transfer_rate',
                 {rules: [{initialValue: null,required: packageData.is_allow_transfer!==0, message: '请输入转让值数值'}]}
              ]" :disabled="packageData.is_allow_transfer===0" :float="packageData.transfer_unit===2" :class="basic('transfer-input')" style="padding-right:0;">
                <a-select :disabled="packageData.is_allow_transfer===0" slot="addonAfter" @change="transferUnitChange" v-model="packageData.transfer_unit" style="width: 60px">
                  <a-select-option v-for="item in Object.entries(package_course.transfer_unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
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
              v-for="item in sell_type_list"
              :key="item.value"
              :disabled="item.value===2"
              :value="item.value">{{item.label}}</a-checkbox>
            </a-checkbox-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
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
                <div :class="basic('st-upload-text')">上传店招</div>
              </st-image-upload>
              <div :class="basic('upload-describe')">
                <p>图片格式必须为:png,bmp,jpeg,jpg,gif,建议使用png格式图片,以保存最佳效果</p>
                <p>建议尺寸为xx像素Xxx像素,不可大于2m</p>
              </div>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包介绍">
             <a-textarea
                v-model="packageData.intro"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入课程包介绍"
                :rows="4"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="备注">
             <a-textarea
                v-model="packageData.remarks"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入备注"
                :rows="4"/>
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
import { UserService } from '@/services/user.service'
import { cloneDeep, remove, every, filter, reduce, forEach } from 'lodash-es'
import { EditFixPackageService } from './edit-fix-package.service'
export default {
  name: 'ShopFixPackageEdit',
  serviceInject() {
    return {
      userService: UserService,
      editPackageService: EditFixPackageService
    }
  },
  rxState() {
    return {
      editLoading: this.editPackageService.loading$,
      coachList: this.editPackageService.coachList$,
      packageInfo: this.editPackageService.packageInfo$,
      package_course: this.userService.packageCourseEnums$
    }
  },
  bem: {
    add: 'page-shop-add-fix-package',
    basic: 'page-shop-add-basic-package'
  },
  data() {
    return {
      packageData: {
        // 售价
        price: null,
        // 是否支持团体课 0为不支持 1为支持
        is_team: 0,
        // 团体课上课范围课程id
        team_range: [],
        // 是否支持私教课 0为不支持 1为支持
        is_personal: 0,
        // 私教课上课范围课程id course_id私教课课程id coach_level私教课支持预约的教练等级
        personal_range: [],
        // 售卖开始时间
        start_time: '',
        // 售卖截止时间
        end_time: '',
        // 有效时间值
        valid_time: null,
        // 有效时间单位 1:天 2:月 3:年
        valid_time_unit: 1,
        // 允许冻结天数
        frozen_days: null,
        // 售卖方式
        sale_mode: [2],
        // 是否可以转让: 0 不可以 1 可以
        is_allow_transfer: 0,
        // 转让费率
        transfer_rate: null,
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
      // 备份课程已做的操作
      teamCourseTotalList: {},
      // 配置课程表格是否显示
      teamCourseListIsShow: false,
      // 配置的课程总计
      teamCourseTotalObject: {
        team_times: 0,
        total: 0
      },
      // 批量操作的值
      teamOperationObject: {
        team_times: null,
        team_unit_price: null
      },
      // 操作栏checkbox是否半选
      teamIndeterminate: false,
      // 操作栏checkbox是全选
      teamCheckAll: false,
      // personal course
      personalCourseList: [],
      // 备份课程已做的操作
      personalCourseTotalList: {},
      // 缓存最后一次选择的教练，用于阻止用户不选择任何一个
      personalCoachListHistory: [],
      // 操作栏教练等级选择的值
      personalAllOperationCoachList: [],
      // 配置的课程总计
      personalCourseTotalObject: {
        personal_times: 0,
        total: 0
      },
      // 批量操作的值
      personalOperationObject: {
        personal_times: null,
        personal_unit_price: null
      },
      // 配置课程表格是否显示
      personalCourseListIsShow: false,
      // 操作栏checkbox是否半选
      personalIndeterminate: false,
      // 操作栏checkbox是全选
      personalCheckAll: false,
      // 操作栏选择教练等级的dorpdown是否显示
      coachAllOperationDropdownIsShow: false,
      // 课程范围是否未配置
      courseIsNone: false,
      courseErrorText: '',
      form: this.$form.createForm(this),
      start_time: null,
      end_time: null,
      endOpen: false,
      // 是否配置了用户端
      appConfig: false,
      // 是否未传了封面
      imageIsNone: false,
      imageErrorText: '',
      fileList: [],
      cropperModal: {},
      unit_list: [
        {
          value: 1,
          label: '天'
        },
        {
          value: 2,
          label: '月'
        },
        {
          value: 3,
          label: '年'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.packageInfo.is_team) {
        this.packageInfo.team_times = null
        this.packageInfo.team_unit_price = null
        this.packageInfo.team_range = []
      }
      if (!this.packageInfo.is_personal) {
        this.packageInfo.personal_times = null
        this.packageInfo.personal_unit_price = null
        this.packageInfo.personal_range = []
      }
      if (!this.packageInfo.is_allow_transfer) {
        this.packageInfo.transfer_rate = null
      }
      this.form.setFieldsValue({
        'price': this.packageInfo.price,
        'start_time': moment(this.packageInfo.start_time * 1000),
        'end_time': moment(this.packageInfo.end_time * 1000),
        'valid_time': this.packageInfo.valid_time,
        'frozen_days': this.packageInfo.frozen_days,
        'transfer_rate': `${this.packageInfo.transfer_rate}`
      })
      // 课程范围
      this.packageData.is_team = this.packageInfo.is_team
      forEach(this.packageInfo.team_range, o => {
        this.teamCourseList.push({
          team_times: o.team_times,
          team_unit_price: o.team_unit_price,
          courseChecked: false,
          course_id: o.course_id,
          course_name: o.course_name,
          course_category: o.course_category,
          course_type: o.course_type
        })
        this.teamCourseTotalList[o.course_id] = this.teamCourseTotalList[o.course_id] || {}
        this.teamCourseTotalList[o.course_id].team_times = o.team_times
        this.teamCourseTotalList[o.course_id].team_unit_price = o.team_unit_price
      })
      this.packageData.is_personal = this.packageInfo.is_personal
      forEach(this.packageInfo.personal_range, o => {
        this.personalCourseList.push({
          personal_times: o.personal_times,
          personal_unit_price: o.personal_unit_price,
          coachGradeList: cloneDeep(o.coach_level),
          courseChecked: false,
          course_id: o.course_id,
          course_name: o.course_name,
          course_category: o.course_category,
          course_type: o.course_type
        })
        this.personalCourseTotalList[o.course_id] = this.personalCourseTotalList[o.course_id] || {}
        this.personalCourseTotalList[o.course_id].personal_times = o.personal_times
        this.personalCourseTotalList[o.course_id].personal_unit_price = o.personal_unit_price
        this.personalCourseTotalList[o.course_id].list = cloneDeep(o.coach_level)
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
          this.packageData.transfer_rate = values.transfer_rate
          this.packageData.start_time = `${this.start_time.format('YYYY-MM-DD')} 00:00:00`
          this.packageData.end_time = `${this.end_time.format('YYYY-MM-DD')} 23:59:59`
          this.packageData.team_range = []
          this.teamCourseList.forEach(i => {
            this.packageData.team_range.push({
              course_id: i.course_id,
              team_times: i.team_times,
              team_unit_price: i.team_unit_price
            })
          })
          this.packageData.personal_range = []
          this.personalCourseList.forEach(i => {
            this.packageData.personal_range.push({
              course_id: i.course_id,
              personal_times: i.personal_times,
              personal_unit_price: i.personal_unit_price,
              coach_level: cloneDeep(i.coachGradeList)
            })
          })
          this.editPackageService.editPackage(this.packageData).subscribe(res => {
            console.log(res)
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
    // 批量操作团课课程包节数
    times_operation_ok(type) {
      if (type === 'team') {
        forEach(this.teamCourseList, o => {
          if (o.courseChecked) {
            o.team_times = +this.teamOperationObject.team_times
            // 备份批量操作的数据
            this.teamCourseTotalList[o.course_id] = this.teamCourseTotalList[o.course_id] ? this.teamCourseTotalList[o.course_id] : {}
            this.teamCourseTotalList[o.course_id].team_times = +this.teamOperationObject.team_times
          }
        })
      } else if (type === 'personal') {
        forEach(this.personalCourseList, o => {
          if (o.courseChecked) {
            o.personal_times = +this.personalOperationObject.personal_times
            // 备份批量操作的数据
            this.personalCourseTotalList[o.course_id] = this.personalCourseTotalList[o.course_id] ? this.personalCourseTotalList[o.course_id] : {}
            this.personalCourseTotalList[o.course_id].personal_times = +this.personalOperationObject.personal_times
          }
        })
      }
    },
    // 批量操作团课课程包价格
    unit_price_operation_ok(type) {
      if (type === 'team') {
        forEach(this.teamCourseList, o => {
          if (o.courseChecked) {
            o.team_unit_price = +this.teamOperationObject.team_unit_price
            // 备份批量操作的数据
            this.teamCourseTotalList[o.course_id] = this.teamCourseTotalList[o.course_id] ? this.teamCourseTotalList[o.course_id] : {}
            this.teamCourseTotalList[o.course_id].team_unit_price = +this.teamOperationObject.team_unit_price
          }
        })
      } else if (type === 'personal') {
        forEach(this.personalCourseList, o => {
          if (o.courseChecked) {
            o.personal_unit_price = +this.personalOperationObject.personal_unit_price
            // 备份批量操作的数据
            this.personalCourseTotalList[o.course_id] = this.personalCourseTotalList[o.course_id] ? this.personalCourseTotalList[o.course_id] : {}
            this.personalCourseTotalList[o.course_id].personal_unit_price = +this.personalOperationObject.personal_unit_price
          }
        })
      }
    },
    // teamItems input change
    teamInputChange(e, type, id) {
      this.teamCourseTotalList[id] = this.teamCourseTotalList[id] ? this.teamCourseTotalList[id] : {}
      this.teamCourseTotalList[id][type] = e
    },
    // personalItems input change
    personalInputChange(e, type, id) {
      this.personalCourseTotalList[id] = this.personalCourseTotalList[id] ? this.personalCourseTotalList[id] : {}
      this.personalCourseTotalList[id][type] = e
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
                i.team_times = null
                i.team_unit_price = null
              })
              forEach(that.teamCourseTotalList, (value, key) => {
                forEach(data.list, innerValue => {
                  if (+innerValue.course_id === +key) {
                    innerValue.team_times = value.team_times
                    innerValue.team_unit_price = value.team_unit_price
                  }
                })
                // 删除teamCourseTotalList里不存在的course_id项
                if (!data.list.some(o => +o.course_id === +key)) {
                  delete that.teamCourseTotalList[key]
                }
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
              data.list.forEach(i => {
                i.courseChecked = false
                i.coachGradeList = coachGradeList
                i.personal_times = null
                i.personal_unit_price = null
              })
              forEach(that.personalCourseTotalList, (value, key) => {
                forEach(data.list, innerValue => {
                  if (+innerValue.course_id === +key) {
                    innerValue.coachGradeList = cloneDeep(value.list ? value.list : coachGradeList)
                    innerValue.personal_times = value.personal_times
                    innerValue.personal_unit_price = value.personal_unit_price
                  }
                })
                // 删除personalCoachTotalList里不存在的course_id项
                if (!data.list.some(o => +o.course_id === +key)) {
                  delete that.personalCourseTotalList[key]
                }
              })
              // 缓存选择的教练等级
              that.personalCoachListHistory = []
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
        // 移除备份
        let list = cloneDeep(this.teamCourseTotalList)
        delete list[id]
        this.teamCourseTotalList = list
      } else if (type === 'personal') {
        let arr = cloneDeep(this.personalCourseList)
        remove(arr, o => o.course_id === id)
        this.personalCourseList = arr
        // 移除备份
        let coachList = cloneDeep(this.personalCourseTotalList)
        delete coachList[id]
        this.personalCourseTotalList = coachList
      }
    },
    // 移除选择的课程
    removeCourseItems(type) {
      if (type === 'team') {
        let arr = cloneDeep(this.teamCourseList)
        let removeList = remove(arr, o => o.courseChecked)
        this.teamCourseList = arr
        // 移除备份
        let list = cloneDeep(this.teamCourseTotalList)
        removeList.forEach(i => {
          delete list[i.course_id]
        })
        this.teamCourseTotalList = list
      } else if (type === 'personal') {
        let arr = cloneDeep(this.personalCourseList)
        let removeList = remove(arr, o => o.courseChecked)
        this.personalCourseList = arr
        // 移除备份
        let coachList = cloneDeep(this.personalCourseTotalList)
        removeList.forEach(i => {
          delete coachList[i.course_id]
        })
        this.personalCourseTotalList = coachList
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
      this.personalCourseTotalList[id] = this.personalCourseTotalList[id] ? this.personalCourseTotalList[id] : {}
      this.personalCourseTotalList[id].list = cloneDeep(e)
    },
    coachAllOperationOk() {
      // 批量设置
      forEach(this.personalCourseList, value => {
        if (value.courseChecked) {
          value.coachGradeList = cloneDeep(this.personalAllOperationCoachList)
          this.personalCourseTotalList[value.course_id] = this.personalCourseTotalList[value.course_id] ? this.personalCourseTotalList[value.course_id] : {}
          this.personalCourseTotalList[value.course_id].list = cloneDeep(this.personalAllOperationCoachList)
        }
      })
      // 缓存选择的教练等级
      this.personalCoachListHistory = []
      forEach(this.personalCourseList, i => {
        this.personalCoachListHistory.push(i.coachGradeList)
      })
      // 清空
      this.personalAllOperationCoachList = []
      // 收起
      this.coachAllOperationDropdownIsShow = false
    },
    // course validatorFn  kael
    course_validator() {
      this.courseIsFirstInput = false
      let teamIsOk = false
      let personalIsOk = false
      // 校验团课
      if (this.packageData.is_team) {
        let isOk = false
        isOk = this.teamCourseList.every(o => {
          let team_times = isNaN(+o.team_times) ? 0 : +o.team_times
          let team_unit_price = isNaN(+o.team_unit_price) ? 0 : +o.team_unit_price
          return team_times * team_unit_price !== 0
        })
        teamIsOk = isOk && this.teamCourseList.length
      } else {
        teamIsOk = true
      }
      // 校验私教
      if (this.packageData.is_personal) {
        let isOk = false
        isOk = this.personalCourseList.every(o => {
          let personal_times = isNaN(+o.personal_times) ? 0 : +o.personal_times
          let personal_unit_price = isNaN(+o.personal_unit_price) ? 0 : +o.personal_unit_price
          return personal_times * personal_unit_price !== 0
        })
        personalIsOk = isOk && this.personalCourseList.length
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
      this.packageData.transfer_rate = null
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
      this.packageData.transfer_rate = null
      this.form.setFieldsValue({
        'transfer_rate': null
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
        return (
          startValue.valueOf() <
          moment()
            .subtract(1, 'd')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
            .subtract(30, 'y')
            .valueOf()
          : moment()
            .subtract(1, 'd')
            .add(1, 'ms')
            .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() >
          moment(endValue)
            .subtract(1, 'd')
            .valueOf()
      )
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
        return (
          endValue.valueOf() >=
            moment()
              .add(30, 'y')
              .valueOf() || endValue.valueOf() <= moment().valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() <
          moment(startValue)
            .add(1, 'd')
            .valueOf()
      )
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
        // 计算团课总计
        this.teamCourseTotalObject.team_times = reduce(newVal, (sum, o) => {
          let team_times = isNaN(+o.team_times) ? 0 : +o.team_times
          return sum + team_times
        }, 0)
        this.teamCourseTotalObject.total = reduce(newVal, (sum, o) => {
          let team_times = isNaN(+o.team_times) ? 0 : +o.team_times
          let team_unit_price = isNaN(+o.team_unit_price) ? 0 : +o.team_unit_price
          return sum + (team_times * (team_unit_price * 10) / 10)
        }, 0)
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
        // 计算私教课总计
        this.personalCourseTotalObject.personal_times = reduce(newVal, (sum, o) => {
          let personal_times = isNaN(+o.personal_times) ? 0 : +o.personal_times
          return sum + personal_times
        }, 0)
        this.personalCourseTotalObject.total = reduce(newVal, (sum, o) => {
          let personal_times = isNaN(+o.personal_times) ? 0 : +o.personal_times
          let personal_unit_price = isNaN(+o.personal_unit_price) ? 0 : +o.personal_unit_price
          return sum + (personal_times * (personal_unit_price * 10) / 10)
        }, 0)
      }
    }
  },
  filters: {
    // 单课价格统计
    course_item_total(times, unit_price) {
      if (+times && +unit_price) {
        return +times * (+unit_price * 10) / 10
      } else {
        return 0
      }
    }
  },
  computed: {
    all_total() {
      let teamTotal = this.packageData.is_team ? this.teamCourseTotalObject.total : 0
      let personalTotal = this.packageData.is_personal ? this.personalCourseTotalObject.total : 0
      return teamTotal + personalTotal
    },
    // 售卖渠道
    sell_type_list() {
      let sell_type = cloneDeep(Object.entries(this.package_course.sale_mode.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      if (!this.appConfig) {
        remove(arr, i => i.value === 1)
      }
      return arr
    }
  }
}
</script>
