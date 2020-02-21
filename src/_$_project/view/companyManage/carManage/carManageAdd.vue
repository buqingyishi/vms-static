<!--  -->
<template>
  <div class="container carManageAddOrUpdate">
    <topTitle :titleName="'添加车辆'"></topTitle>
    <div class="content">
      <Tabs value="name1" @on-click="switchTabs" :animated="false">
        <TabPane label="车辆信息" name="name1" style="padding-left:0px">
          <Form
            ref="carBaseInfo"
            :model="carBaseInfo"
            :rules="ruleValidate"
            :label-width="140"
            style="margin-top:20px;"
          >
            <Row>
              <Col span="12">
                <FormItem label="车牌号码:" prop="plateNo">
                  <Input v-model="carBaseInfo.plateNo" style="width:500px" placeholder="请输入车牌号码"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车辆名称:" prop="carName">
                  <Input v-model="carBaseInfo.carName" style="width:500px" placeholder="请输入车辆名称"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆别名:" prop="aliasName">
                  <Input
                    v-model="carBaseInfo.aliasName"
                    style="width:500px"
                    placeholder="请输入车辆别名,如1号车"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车辆标签:" prop="carTag">
                  <Input v-model="carBaseInfo.carTag" style="width:500px" placeholder="请输入车辆标签"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆描述:" prop="carSampleDesp">
                  <Input
                    v-model="carBaseInfo.carSampleDesp"
                    style="width:500px"
                    placeholder="请输入车辆描述"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车辆颜色:" prop="color">
                  <Input v-model="carBaseInfo.color" style="width:500px" placeholder="请输入车辆颜色"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆所属:" prop="ownType">
                  <Select v-model="carBaseInfo.ownType" style="width:500px">
                    <Option value="1">自有车辆</Option>
                    <Option value="2">外包车辆</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车辆座次:" prop="seats">
                  <Select v-model="carBaseInfo.seats" style="width:500px">
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆状态:" prop="status">
                  <Select v-model="carBaseInfo.status" style="width:500px">
                    <Option value="1">空闲</Option>
                    <Option value="2">使用中</Option>
                    <Option value="3">维修</Option>
                    <Option value="4">证件不全</Option>
                    <Option value="5">停用</Option>
                    <Option value="6">报废</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="行驶公里数:" prop="kilometer">
                  <Input
                    v-model="carBaseInfo.kilometer"
                    style="width:500px"
                    placeholder="请输入车辆行驶公里数"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆类型:" prop="carTypeId">
                  <Select v-model="carBaseInfo.carTypeId" style="width:500px">
                    <Option value="1">轿车</Option>
                    <Option value="2">货车</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="所属车队" prop="carTeamName">
                  <Select v-model="carBaseInfo.carTeamName"  @on-change="selectCarTeam" :label-in-value="true">
                    <Option :value="item.id" :label="item.carTeamName" v-for="item in carTeamList">{{item.carTeamName}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆主图" prop="mainPic">
                  <Upload
                    :before-upload="upload_carPic"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="carBaseInfo.mainPic"
                      v-show="carBaseInfo.mainPic != ''"
                    />
                    <div style="padding: 30px 0;width:280px" v-show="carBaseInfo.mainPic == ''">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注信息:" prop="remark">
                  <Input
                    v-model="carBaseInfo.remark"
                    type="textarea"
                    class="textarea"
                    :autosize="{minRows: 5,maxRows: 6}"
                    placeholder="请输入备注信息"
                  ></Input>
                </FormItem>
              </Col>
            </Row>

            <FormItem>
              <Button type="primary" @click="saveData('carBaseInfo')">保存</Button>
              <Button
                @click="clearData('carBaseInfo')"
                style="margin-left: 8px"
                v-show="carBaseInfo.carId == ''"
              >清空</Button>
              <Button @click="goback" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="附加信息" name="name2">
          <Form
            :model="subjoinParam"
            :label-width="140"
            style="margin-top:20px;"
            ref="subjoinParam"
          >
            <Row>
              <Col span="12">
                <FormItem label="品牌型号:" prop="carModel">
                  <Input
                    v-model="subjoinParam.carModel"
                    style="width:500px"
                    placeholder="请输入车辆品牌型号"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发动机号:" prop="engineNo">
                  <Input
                    v-model="subjoinParam.engineNo"
                    style="width:500px"
                    placeholder="请输入车辆发动机号"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="档案号:" prop="archiveNo">
                  <Input v-model="subjoinParam.archiveNo" style="width:500px" placeholder="请输入档案号"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车架号:" prop="frameNumber">
                  <Input
                    v-model="subjoinParam.frameNumber"
                    style="width:500px"
                    placeholder="请输入车辆车架号"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="装备质量:" prop="equipQuality">
                  <Input
                    v-model="subjoinParam.equipQuality"
                    style="width:500px"
                    placeholder="请输入装备质量"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="核定载质量:" prop="limitQuality">
                  <Input
                    v-model="subjoinParam.limitQuality"
                    style="width:500px"
                    placeholder="请输入车辆核定载质量"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="行驶证芯编号:" prop="vehicleLicenseNo">
                  <Input
                    v-model="subjoinParam.vehicleLicenseNo"
                    style="width:500px"
                    placeholder="请输入行驶证芯编号"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="行驶证到期日期:" prop="licenseValidityDate">
                  <DatePicker
                    @on-change="subjoinParam.licenseValidityDate=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="subjoinParam.licenseValidityDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="从业资格证到期日期:" prop="certificateTime">
                  <DatePicker
                    @on-change="subjoinParam.certificateTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="subjoinParam.certificateTime"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="从业资格证:" prop="certificatePic">
                  <Upload
                    :before-upload="upload_certificatePic"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="subjoinParam.certificatePic"
                      v-show="subjoinParam.certificatePic != ''"
                    />
                    <div
                      style="padding: 30px 0;width:280px"
                      v-show="subjoinParam.certificatePic == ''"
                    >
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="行驶证照:" prop="vehicleLicensePic">
                  <Upload
                    :before-upload="upload_vehicleLicensePic"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="subjoinParam.vehicleLicensePic"
                      v-show="subjoinParam.vehicleLicensePic != ''"
                    />
                    <div
                      style="padding: 30px 0;width:280px"
                      v-show="subjoinParam.vehicleLicensePic == ''"
                    >
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="行驶证副页照:" prop="vehicleLicensePic2">
                  <Upload
                    :before-upload="upload_vehicleLicensePic2"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="subjoinParam.vehicleLicensePic2"
                      v-show="subjoinParam.vehicleLicensePic2 != ''"
                    />
                    <div
                      style="padding: 30px 0;width:280px"
                      v-show="subjoinParam.vehicleLicensePic2 == ''"
                    >
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="发证机关:" prop="organization">
                  <Input
                    v-model="subjoinParam.organization"
                    style="width:500px"
                    placeholder="请输入发证机关"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发证日期:" prop="organizationTime">
                  <DatePicker
                    @on-change="subjoinParam.organizationTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="subjoinParam.organizationTime"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="燃油类型:" prop="fuelType">
                  <Select v-model="subjoinParam.fuelType" style="width:500px">
                    <Option value="1">92</Option>
                    <Option value="2">95</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="钥匙数量:" prop="keyCount">
                  <Input
                    v-model="subjoinParam.keyCount"
                    style="width:500px"
                    placeholder="请输入车辆钥匙数量"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="车辆注册城市:" prop="regCity">
                  <Input v-model="subjoinParam.regCity" style="width:500px" placeholder="请输入车辆注册城市"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="车辆注册日期:" prop="regDate">
                  <DatePicker
                    @on-change="subjoinParam.regDate=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="subjoinParam.regDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="saveSubjoinData('subjoinParam')">保存</Button>
              <Button
                @click="clearSubjoinData('subjoinParam')"
                v-show="subjoinParam.carId == ''"
                style="margin-left: 8px"
              >清空</Button>
              <Button @click="goback" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="强制保险" name="name3">
          <!-- <Form
            ref="insurance"
            :model="carInsuranceParam"
            :rules="insurancerule"
            :label-width="140"
            style="margin-top:20px;"
          >
            <Row>
              <Col span="12">
                <FormItem label="保险公司:" prop="insuranceCompany">
                  <Input
                    v-model="carInsuranceParam.insuranceCompany"
                    style="width:500px"
                    placeholder="请输入保险公司"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险单号:" prop="insuranceNo">
                  <Input
                    v-model="carInsuranceParam.insuranceNo"
                    style="width:500px"
                    placeholder="请输入保险单号"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险公司电话:" prop="insuranceTel">
                  <Input
                    v-model="carInsuranceParam.insuranceTel"
                    style="width:500px"
                    placeholder="请输入保险公司电话"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险金额:" prop="insuranceAmount">
                  <Input
                    v-model="carInsuranceParam.insuranceAmount"
                    style="width:500px"
                    placeholder="请输入保险金额"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险类型:" prop="type">
                  <Select v-model="carInsuranceParam.type" style="width:500px" disabled>
                    <Option value="1">强险</Option>
                    <Option value="2">商业险</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险状态:" prop="status">
                  <Select v-model="carInsuranceParam.status" style="width:500px">
                    <Option value="1">在保</Option>
                    <Option value="2">过期</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险单开始日:" prop="startTime">
                  <DatePicker
                    @on-change="carInsuranceParam.startTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="carInsuranceParam.startTime"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险单到期日:" prop="endTime">
                  <DatePicker
                    @on-change="carInsuranceParam.endTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="carInsuranceParam.endTime"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险单图片:" prop="pic">
                  <Upload
                    :before-upload="upload_insurancePic"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="carInsuranceParam.pic"
                      v-show="carInsuranceParam.pic != ''"
                    />
                    <div style="padding: 30px 0;width:280px" v-show="carInsuranceParam.pic == ''">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注:" prop="remark">
                  <Input
                    v-model="carInsuranceParam.remark"
                    type="textarea"
                    style="width:500px"
                    placeholder="请填写备注"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="saveCompulsoryInsurance('insurance')">保存</Button>
              <Button @click="clearData('insurance')" v-show="carInsuranceParam.carId == ''" style="margin-left: 8px">清空</Button>
              <Button @click="goback" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>-->
          <Button
            type="primary"
            size="default"
            style="margin-bottom:15px"
            @click="addInsurance(1)"
          >添加</Button>
          <Table border ref="selection" :columns="insuranceTitle" :data="insuranceData">
            <template slot-scope="{ row, index }" slot="action">
              <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="updateInsurance(row)"
              >
                <Icon type="md-color-filter" color="#409EFF" />
                <span style="color:#409EFF">编辑</span>
              </div>
            </template>
          </Table>
          <carInsuranceModal
            :lookAttribute="modalAttribute"
            :list="rowList"
            @updateData="queryInsuranceRecordPage(carInsuranceParam)"
          ></carInsuranceModal>
        </TabPane>
        <TabPane label="商业保险" name="name4">
          <!-- <Form
            ref="insurance"
            :model="carInsuranceParam"
            :rules="insurancerule"
            :label-width="140"
            style="margin-top:20px;"
          >
            <Row>
              <Col span="12">
                <FormItem label="保险公司:" prop="insuranceCompany">
                  <Input
                    v-model="carInsuranceParam.insuranceCompany"
                    style="width:500px"
                    placeholder="请输入保险公司"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险单号:" prop="insuranceNo">
                  <Input
                    v-model="carInsuranceParam.insuranceNo"
                    style="width:500px"
                    placeholder="请输入保险单号"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险公司电话:" prop="insuranceTel">
                  <Input
                    v-model="carInsuranceParam.insuranceTel"
                    style="width:500px"
                    placeholder="请输入保险公司电话"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险金额:" prop="insuranceAmount">
                  <Input
                    v-model="carInsuranceParam.insuranceAmount"
                    style="width:500px"
                    placeholder="请输入保险金额"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险类型:" prop="type">
                  <Select v-model="carInsuranceParam.type" style="width:500px" disabled>
                    <Option value="1">强险</Option>
                    <Option value="2">商业险</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险状态:" prop="status">
                  <Select v-model="carInsuranceParam.status" style="width:500px">
                    <Option value="1">在保</Option>
                    <Option value="2">过期</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险单开始日:" prop="startTime">
                  <DatePicker
                    @on-change="carInsuranceParam.startTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="carInsuranceParam.startTime"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="保险单到期日:" prop="endTime">
                  <DatePicker
                    @on-change="carInsuranceParam.endTime=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="carInsuranceParam.endTime"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="保险单图片:" prop="pic">
                  <Upload
                    :before-upload="upload_insurancePic"
                    :show-upload-list="false"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;"
                    multiple
                    type="drag"
                  >
                    <img
                      class="idCard"
                      :src="carInsuranceParam.pic"
                      v-show="carInsuranceParam.pic != ''"
                    />
                    <div style="padding: 30px 0;width:280px" v-show="carInsuranceParam.pic == ''">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传</p>
                    </div>
                  </Upload>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注:" prop="remark">
                  <Input
                    v-model="carInsuranceParam.remark"
                    type="textarea"
                    style="width:500px"
                    placeholder="请填写备注"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="saveBusinessInsurance('insurance')">保存</Button>
              <Button
                @click="clearData('insurance')"
                v-show="carInsuranceParam.carId == ''"
                style="margin-left: 8px"
              >清空</Button>
              <Button @click="goback" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>-->
          <Button
            type="primary"
            size="default"
            style="margin-bottom:15px"
            @click="addInsurance(2)"
          >添加</Button>
          <Table border ref="selection" :columns="insuranceTitle" :data="insuranceData">
            <template slot-scope="{ row, index }" slot="action">
              <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="updateInsurance(row)"
              >
                <Icon type="md-color-filter" color="#409EFF" />
                <span style="color:#409EFF">编辑</span>
              </div>
            </template>
          </Table>
        </TabPane>
        <TabPane label="车辆年审" name="name5">
          <Form
            ref="yearAudit"
            :model="yearAuditParam"
            :rules="yearAuditRule"
            :label-width="140"
            style="margin-top:20px;"
          >
            <Row>
              <Col span="12">
                <FormItem label="年审开始时间:" prop="startDate">
                  <DatePicker
                    @on-change="yearAuditParam.startDate=$event"
                    type="date"
                    placeholder="请选择日期"
                    clearable
                    :value="yearAuditParam.startDate"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="年审到期日:" prop="endDate">
                  <DatePicker
                    @on-change="yearAuditParam.endDate=$event"
                    type="date"
                    placeholder="请选择日期"
                    :value="yearAuditParam.endDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="saveYearAuditData('yearAudit')">保存</Button>
              <Button
                @click="clearData('yearAudit')"
                v-show="yearAuditParam.carId == ''"
                style="margin-left: 8px"
              >清空</Button>
              <Button @click="goback" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import carInsuranceModal from "@$@/components/Management/car/carInsuranceModal"; //分页
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    carInsuranceModal
  },
  data() {
    //这里存放数据
    return {
      // 车辆信息参数
      carBaseInfo: {
        aliasName: "",
        carName: "",
        carSampleDesp: "",
        carTag: "",
        color: "",
        carId: "",
        carTypeId: "",
        kilometer: "",
        mainPic: "",
        ownType: "",
        plateNo: "",
        remark: "",
        seats: "",
        status: "",
        id: null,
        carTeamId: ""
      },
      // 选择车队
      carTeamList:[],
      ruleValidate: {
        carName: [
          {
            required: true,
            message: "请输入车辆名称",
            trigger: "blur"
          }
        ],
        carTeamName: [
          {
            required: true,
            message: "车队名称不能为空",
            trigger: "change",
            type: 'number',
          }
        ],
        mainPic: [
          {
            required: true,
            message: "请上传车辆主图",
            trigger: "blur"
          }
        ],
        plateNo: [
          {
            required: true,
            message: "请输入车牌号码",
            trigger: "blur"
          }
        ],
        seats: [
          {
            required: true,
            message: "请选择车辆座次",
            trigger: "change"
          }
        ],
        carTypeId: [
          {
            required: true,
            message: "请选择车辆类型",
            trigger: "change"
          }
        ],
        ownType: [
          {
            required: true,
            message: "请选择车辆所属类型",
            trigger: "change"
          }
        ]
      },
      carId: null,
      // 附加信息
      subjoinParam: {
        allQuality: "",
        carId: null,
        annualReviewPic: "",
        appearancePic1: "",
        appearancePic2: "",
        appearancePic3: "",
        appearancePic4: "",
        appearanceSize: "",
        archiveNo: "",
        breakRuleGrade: null,
        breakRuleNotDeal: null,
        carModel: "",
        carNumberCount: "",
        certificatePic: "",
        certificateTime: "",
        elecEnvPic: "",
        engineNo: "",
        envLabelNumber: "",
        equipQuality: null,
        frameNumber: "",
        keyCount: null,
        licenseValidityDate: "",
        limitQuality: null,
        organization: "",
        organizationTime: "",
        owner: "",
        ownerAddress: "",
        pullQuality: null,
        regCity: "",
        regDate: "",
        scrapDate: "",
        useNature: "",
        vehicleLicenseNo: "",
        vehicleLicensePic: "",
        vehicleLicensePic2: "",
        vehicleType: "",
        vin: ""
      },
      // 保险
      insuranceTitle: [
        {
          title: "保单号",
          key: "insuranceNo"
        },
        {
          title: "保险金额",
          key: "insuranceAmount",
          width: 120
        },
        {
          title: "保险公司",
          key: "insuranceCompany"
        },
        {
          title: "保险公司电话",
          key: "insuranceTel"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "到期时间",
          key: "endTime"
        },

        {
          title: "保险单据",
          key: "pic",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width:100px;height:60px;"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  attrs: {
                    src: params.row.pic,
                    style: "width:100px;height:50px;padding-top:5px"
                  }
                })
              ]
            );
          }
        },
        {
          title: "保单状态",
          key: "status",
          width: 100,
          render: (h, params) => {
            let text = params.row.status == 1 ? "在保" : "过期";
            return h("span", text);
          }
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          slot: "action",
          width: 100
        }
      ],
      insuranceData: [],
      insuranceTotal: null,
      // 车辆保险
      carInsuranceParam: {
        carId: null,
        insuranceType: null,
        pageIndex: 1,
        pageSize: 10
      },
      // 模态框属性
      modalAttribute: {
        showModal: false,
        disabled: false,
        title: ""
      },
      rowList: {},

      // 年审参数
      yearAuditParam: {
        carId: null,
        id: null,
        endDate: "",
        startDate: ""
      },
      yearAuditRule: {
        startDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            type: "string"
          }
        ],
        endDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            type: "string"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 切换tap栏
    switchTabs(name) {
      console.log(name);
      if (name == "name2" && this.subjoinParam.carId) {
        this.querySubjoinInfo(this.carId);
      } else if (name == "name3") {
        // 车辆强险(编辑)
        this.carInsuranceParam.insuranceType = "1";
        this.queryInsuranceRecordPage(this.carInsuranceParam);
      } else if (name == "name4") {
        // 车辆商业险(编辑)
        this.carInsuranceParam.insuranceType = "2";
        this.queryInsuranceRecordPage(this.carInsuranceParam);
      } else if (name == "name5" && this.yearAuditParam.id) {
        console.log(this.carId);
        this.yearAuditParam.id = this.carId;
        // 车辆年审
        this.queryCaryearAudit(this.carId);
      }
    },
    // 车辆主图
    upload_carPic(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        console.log(res);
        this.carBaseInfo.mainPic = res.data;
      });
    },
    // 保存数据(基础信息)
    saveData(name) {
      console.log(name);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.carBaseInfo.id) {
            console.log("编辑");

            this.carBaseInfo.carId = this.carId;
            console.log(this.carBaseInfo);
            let obj = {};
            obj.carBaseInfo = this.carBaseInfo;
            $ajax.updateCarInfo(obj, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.queryCarInfo(this.carId);
              });
            });
          } else {
            console.log("添加");
            $ajax.addCarBaseInfo(this.carBaseInfo, res => {
              console.log(res);
              this.carId = res.data;
              console.log(this.subjoinParam.carId);
              this.$refs[name].resetFields();
              console.log(this.subjoinParam.carId);
              $app.toast(res.msg, true);
            });
          }
        }
      });
    },
    // 清空数据(基础信息)
    clearData(name) {
      this.$refs[name].resetFields();
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },

    // 获取车队列表
    getCarTeam(){
      $ajax.queryAllCarTeamList("",res=>{
        console.log(res)
        this.carTeamList = res.data
      })
    },
    // 选择车队名称
    selectCarTeam(data){
      console.log(data)
      this.carBaseInfo.carTeamId = data.value
    },
    // 从业资格证
    upload_certificatePic(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        console.log(res);
        this.subjoinParam.certificatePic = res.data;
      });
    },
    // 行驶证照
    upload_vehicleLicensePic(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        console.log(res);
        this.subjoinParam.vehicleLicensePic = res.data;
      });
    },
    // 行驶证副页照
    upload_vehicleLicensePic2(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        console.log(res);
        this.subjoinParam.vehicleLicensePic2 = res.data;
      });
    },
    // 选择发证日期
    selectOrganizationDate(date) {
      this.subjoinParam.organizationTime = date;
    },
    // 从业资格证到期日期
    selectCertificateDate(date) {
      this.subjoinParam.certificateTime = date;
    },
    // 行驶证到期日期
    selectLicenseValidityDate(date) {
      this.subjoinParam.licenseValidity = date;
    },
    // 车辆注册日期
    selectRegDateDate(date) {
      this.subjoinParam.regDate = date;
    },
    // 保存附加信息
    saveSubjoinData(name) {
      if (this.subjoinParam.carId) {
        //编辑
        console.log("编辑");
        console.log(this.subjoinParam.carId);
        let obj = {};
        obj.carExtInfo = this.subjoinParam;
        $ajax.updateCarInfo(obj, res => {
          console.log(res);
          $app.toast(res.msg, true, () => {
            this.querySubjoinInfo(this.carId);
          });
        });
      } else {
        //新增
        this.subjoinParam.carId = this.carId;
        $ajax.addCarExtInfo(this.subjoinParam, res => {
          console.log(res);
          this.$refs[name].resetFields();
          $app.toast(res.msg, true);
        });
      }
    },

    // 添加强制保险
    addInsurance(type) {
      let obj = {};
      obj.carId = this.carId;
      obj.type = type;
      this.rowList = obj;
      console.log(this.rowList);
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "添加";
    },
    // 编辑强制保险
    updateInsurance(row) {
      let list = JSON.parse(JSON.stringify(row));
      list.insuranceAmount = list.insuranceAmount.toString();
      this.rowList = list;
      console.log(this.rowList);
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "编辑";
    },

    // 保险单开始日期
    selectInsuranceStartDate(date) {
      console.log("保险单开始日");
      console.log(date);
      this.carInsuranceParam.startTime = date;
    },
    // 保险单结束日期
    selectInsuranceEndDate(date) {
      console.log("保险单结束日");

      console.log(date);
      this.carInsuranceParam.endTime = date;
      console.log(this.carInsuranceParam.startTime);
      console.log(this.carInsuranceParam.endTime);
    },
    // 保存车辆强制保险
    saveCompulsoryInsurance(name) {
      if (this.carInsuranceParam.carId) {
        // 编辑
        let obj = {};
        obj.carInsurance = this.carInsuranceParam;
        $ajax.updateCarInfo(obj, res => {
          console.log(res);
          $app.toast(res.msg, true, () => {
            this.queryCarInsurance(this.carId, 1);
          });
        });
      } else {
        // 新增
        this.carInsuranceParam.carId = this.carId;
        $ajax.addCarInsuranceRecord(this.carInsuranceParam, res => {
          console.log(res);
          this.$refs[name].resetFields();
          $app.toast(res.msg, true);
        });
      }
    },
    // 保存车辆商业保险
    saveBusinessInsurance(name) {
      if (this.carInsuranceParam.carId) {
        // 编辑
        let obj = {};
        obj.carInsurance = this.carInsuranceParam;
        console.log(obj);
        $ajax.updateCarInfo(obj, res => {
          console.log(res);
          $app.toast(res.msg, true, () => {
            this.queryCarInsurance(this.carId, 2);
          });
        });
      } else {
        // 新增
        this.carInsuranceParam.carId = this.carId;
        $ajax.addCarInsuranceRecord(this.carInsuranceParam, res => {
          console.log(res);
          this.$refs[name].resetFields();
          $app.toast(res.msg, true);
        });
      }
    },
    // 年审开始时间
    selectYearAuditStartDate(date) {
      this.yearAuditParam.startDate = date;
    },
    // 车辆年审到期日
    selectYearAuditEndDate(date) {
      this.yearAuditParam.endDate = date;
    },
    // 保存年审数据
    saveYearAuditData(name) {
      if (this.yearAuditParam.carId) {
        console.log("哦哦哦哦哦哦");
        // 编辑
        let obj = {};
        obj.carExamined = this.yearAuditParam;
        $ajax.updateCarInfo(obj, res => {
          $app.toast(res.msg, true, () => {
            this.queryCaryearAudit(this.yearAuditParam.carId);
          });
        });
      } else {
        this.yearAuditParam.carId = this.carId;
        $ajax.addExaminedRecord(this.yearAuditParam, res => {
          this.$refs[name].resetFields();
          $app.toast(res.msg, true);
        });
      }
    },

    // -------------------------  编辑 ------------------------
    // 查询车辆基本信息
    queryCarInfo(id) {
      $ajax.getBaseInfo(id, res => {
        console.log(res);
        Object.keys(this.carBaseInfo).forEach(key => {
          this.carBaseInfo[key] = res.data[key];
        });
        console.log(this.carBaseInfo.seats);
        this.carBaseInfo.ownType = this.carBaseInfo.ownType.toString();
        this.carBaseInfo.carTypeId = this.carBaseInfo.carTypeId.toString();
        this.carBaseInfo.seats = this.carBaseInfo.seats.toString();
      });
    },

    // 查询车辆附加信息
    querySubjoinInfo(id) {
      $ajax.getExtInfo(id, res => {
        console.log(res);
        Object.keys(this.subjoinParam).forEach(key => {
          this.subjoinParam[key] = res.data[key];
        });
        console.log(this.subjoinParam);
        // this.subjoinParam.fuelType = this.subjoinParam.fuelType.toString()
      });
    },

    // 查询车辆保险列表
    queryInsuranceRecordPage(param) {
      $ajax.getInsuranceRecordPage(param, res => {
        console.log(res);
        this.insuranceData = res.data;
        this.insuranceTotal = res.total;
      });
    },

    // 查看车辆保险详情
    queryCarInsurance(id, type) {
      let obj = {};
      obj.carId = parseInt(id);
      obj.insuranceType = type;
      console.log(type);
      $ajax.getInsuranceRecordPage(obj, res => {
        console.log(res);
        Object.keys(this.carInsuranceParam).forEach(key => {
          this.carInsuranceParam[key] = res.data[0][key];
        });
        console.log(this.carInsuranceParam.startTime);
        this.carInsuranceParam.type = this.carInsuranceParam.type.toString();
        this.carInsuranceParam.status = this.carInsuranceParam.status.toString();
      });
    },

    // 查询车辆年审记录
    queryCaryearAudit(id) {
      let obj = {};
      obj.carId = id;
      $ajax.getExaminedRecordPage(obj, res => {
        console.log(res);
        if (res.data.length != 0) {
          Object.keys(this.yearAuditParam).forEach(key => {
            this.yearAuditParam[key] = res.data[0][key];
          });
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let carId = this.$route.query.carId;
    this.carId = carId;
    this.carBaseInfo.carId = this.$route.query.carId;
    console.log(this.carBaseInfo.carId);
    this.subjoinParam.carId = this.$route.query.carId;
    this.carInsuranceParam.carId = this.$route.query.carId;
    this.yearAuditParam.id = this.$route.query.carId;
    console.log(this.subjoinParam.carId);
    if (carId) {
      this.queryCarInfo(carId);
    }
    this.getCarTeam()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.container {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}

.content {
  background-color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  // height: 100%;
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
.idCard {
  width: 280px;
  height: 180px;
  display: inline-block;
  border-radius: 10px;
}
.textarea {
  width: 500px;
  height: 180px;
}
.carManageAddOrUpdate .ivu-date-picker {
  width: 500px;
}
.carManageAddOrUpdate .ivu-tabs {
  overflow: visible;
}
.carManageAddOrUpdate .ivu-select{
  width: 500px;
}
</style>