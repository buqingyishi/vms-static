<template>
  <div class="container carManageDetail">
    <topTitle :titleName="'车辆详情'"></topTitle>
    <div class="content">
      <div class="userInfo">
        <img
          :src="carInfo.mainPic?carInfo.mainPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392375011,2037776807&fm=26&gp=0.jpg'"
          class="car_png"
          alt
        />
        <div class="information">
          <div class="name">
            {{carInfo.plateNo}}
            <Tag class="small_name" color="#1ccdc5">{{carInfo.carTag}}</Tag>
            <!-- <span class="small_name"> &nbsp;&nbsp;老板专用</span> -->
          </div>
          <div class="phone">{{carInfo.carName}}</div>
          <div class="driver_type">{{carInfo.ownType == 1?'自有车辆':'外部车辆'}}</div>
          <div class="task" v-show="carInfo.status == 1">空闲</div>
          <div class="task" v-show="carInfo.status == 2">使用中</div>
          <div class="task" v-show="carInfo.status == 3">维修</div>
          <div class="task" v-show="carInfo.status == 4">证件不全</div>
          <div class="task" v-show="carInfo.status == 5">停用</div>
          <div class="task" v-show="carInfo.status == 6">报废</div>
        </div>
        <!-- <Button type="primary" class="redact">编辑</Button> -->
        <Button type="default" class="return">返回</Button>
      </div>
      <Tabs size="small" @on-click="switchoverInfo" class="tab" :animated="false">
        <TabPane label="基本资料" class="driverInfo basic_information">
          <div class="driver_name">
            车辆ID
            <span>{{carInfo.carTypeId}}</span>
          </div>
          <div class="driver_number">
            车牌号码
            <span>{{carInfo.plateNo}}</span>
          </div>
          <div class="driver_phone">
            别名
            <span>{{carInfo.aliasName}}</span>
          </div>
          <div class="driver_team">
            车辆座次
            <span>{{carInfo.seats}}</span>
          </div>
          <div class="driver_license">
            型号
            <span>{{carInfo.carName}}</span>
          </div>
          <div class="driver_license">
            行驶公里数
            <span>{{carInfo.kilometer}}</span>
          </div>
          <div class="driver_license">
            车辆描述
            <span>{{carInfo.carSampleDesp}}</span>
          </div>
          <div class="driver_license">
            年审到期日
            <span>{{carInfo.examinedEnd}}</span>
          </div>
          <div class="driver_license">
            商业险到期日
            <span>{{carInfo.bInsuranceEnd}}</span>
          </div>
          <div class="driver_license">
            强险到期日
            <span>{{carInfo.cInsuranceEnd}}</span>
          </div>
          <div class="driver_license">
            备注
            <span>{{carInfo.remark}}</span>
          </div>
          <!-- <div class="license_img">
            <div class="img">车辆图片</div>
            <div class="item">
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <div class="describe">身份证正面</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <div class="describe">身份证反面</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <div class="describe">驾驶证</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <div class="describe">上岗证</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <div class="describe">司机入职培训表</div>
              </div>
            </div>
          </div> -->
        </TabPane>
        <TabPane label="车型参数" class="carInfo car_param">
          <!-- <div class="carInfo_top">
            <div class="car_detail">
              <img src="./img/car.png" alt />
            </div>
            <div class="information">
              <div class="name">
                粤A2B452
                <span class="small_name">&nbsp;老板专用</span>
              </div>
              <div class="phone">高级小桥车</div>
              <div class="driver_type">自由车辆</div>
              <div class="task">任务中</div>
            </div>
          </div>-->
          <div class="driver_name">
            总质量(Kg)
            <span>{{extendInfo.allQuality}}</span>
          </div>
          <div class="driver_number">
            整备质量(Kg)
            <span>{{extendInfo.equipQuality}}</span>
          </div>
          <div class="driver_phone">
            核定载质量(Kg)
            <span>{{extendInfo.limitQuality}}</span>
          </div>
          <div class="driver_team">
            外观尺寸
            <span>{{extendInfo.appearanceSize}}</span>
          </div>
          <div class="driver_license">
            燃料种类
            <span>{{extendInfo.fuelType}}</span>
          </div>
          <div class="driver_license">
            品牌型号
            <span>{{extendInfo.carModel}}</span>
          </div>
          <div class="driver_license">
            发动机号
            <span>{{extendInfo.engineNo}}</span>
          </div>
          <div class="driver_license">
            车架号
            <span>{{extendInfo.frameNumber}}</span>
          </div>
        </TabPane>
        <TabPane label="GPS设备信息" class="epsInfo">
          <div class="driver_name">
            GPS设备IMEI码
            <span>--</span>
          </div>
          <div class="driver_number">
            超速报警(km/h)
            <span>--</span>
          </div>
          <div class="driver_phone">
            疲劳驾驶报警(分钟)
            <span>--</span>
          </div>
          <div class="driver_team">
            疲劳驾驶报警(分钟)
            <span>--</span>
          </div>
        </TabPane>
        <TabPane label="交强险" class="stronger">
          <Table
            border
            highlight-row
            ref="currentRowTable"
            style="margin-top:20px"
            :columns="insuranceTitle"
            :data="insuranceData"
          ></Table>
          <page
            :total="oldAuditTotal"
            :switchPageIndex="switchInsurancePageIndex"
            :switchPageSize="switchInsurancePageSize"
          ></page>
        </TabPane>
        <TabPane label="商业险" class="history shangye">
          <Table
            border
            highlight-row
            ref="currentRowTable"
            style="margin-top:20px"
            :columns="insuranceTitle"
            :data="insuranceData"
          ></Table>
          <page
            :total="oldAuditTotal"
            :switchPageIndex="switchInsurancePageIndex"
            :switchPageSize="switchInsurancePageSize"
          ></page>
        </TabPane>
        <TabPane label="年审" class="history old">
          <Table
            border
            highlight-row
            ref="currentRowTable"
            style="margin-top:20px"
            :columns="oldAuditTitle"
            :data="oldAuditData"
          ></Table>
          <page
            :total="oldAuditTotal"
            :switchPageIndex="switchOldAuditPageIndex"
            :switchPageSize="switchOldAuditPageSize"
          ></page>
        </TabPane>
        <TabPane label="历任司机" class="history history_driver">
          <Table
            border
            highlight-row
            ref="currentRowTable"
            style="margin-top:20px"
            :columns="columns3"
            :data="data1"
          ></Table>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
export default {
  components: {
    topTitle,
    page
  },
  name: "carB",
  data() {
    let data = {
      carInfo: {}, //基础信息
      extendInfo: {}, //扩展信息
      //保险
      insuranceParam: {
        carId: null,
        insuranceType: null,
        pageIndex: 1,
        pageSize: 10
      },
      // 年审
      oldAuditParam: {
        carId: null,
        pageIndex: 1,
        pageSize: 10
      },
      // 年审
      oldAuditTitle: [
        {
          title: "年审开始时间",
          key: "startDate"
        },
        {
          title: "年审到期时间",
          key: "endDate"
        },
        {
          title: "备注",
          key: "remark"
        }
      ],
      oldAuditData: [],
      oldAuditTotal: null,
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
        }
        // {
        //   title: "操作",
        //   slot: "action",
        //   width: 100
        // }
      ],
      insuranceData: [],
      insuranceTotal: null,
      columns3: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "绑车时间",
          key: "bindCar"
        },
        {
          title: "解绑时间",
          key: "unbindCar"
        }
      ],
      data1: [
        {
          name: "刘伟",
          phone: "13266101017",
          bindCar: "2019-08-20 15:03:57",
          unbindCar: "2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          phone: "13266101017",
          bindCar: "2019-08-20 15:03:57",
          unbindCar: "2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          phone: "13266101017",
          bindCar: "2019-08-20 15:03:57",
          unbindCar: "2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          phone: "13266101017",
          bindCar: "2019-08-20 15:03:57",
          unbindCar: "2019-08-20 15:03:57"
        }
      ]
    };
    return data;
  },

  methods: {
    // 查询车辆信息
    queryCarInfo(id) {
      $ajax.getBaseInfo(id, res => {
        console.log(res);
        this.carInfo = res.data;
      });
    },
    // 查询车辆扩展信息
    queryExtInfo(id) {
      $ajax.getExtInfo(id, res => {
        console.log(res);
        this.extendInfo = res.data;
      });
    },
    // 车辆保险
    switchoverInfo(name) {
      console.log(name);
      if (name == "3") {
        //交强险
        console.log("55555");
        this.insuranceParam.insuranceType = 1;
        $ajax.getInsuranceRecordPage(this.insuranceParam, res => {
          console.log(res);
          this.insuranceData = res.data;
        });
      } else if (name == "4") {
        //商业险
        this.insuranceParam.insuranceType = 2;
        $ajax.getInsuranceRecordPage(this.insuranceParam, res => {
          console.log(res);
          this.insuranceData = res.data;
        });
      } else if (name == "5") {
        //年审
        $ajax.getExaminedRecordPage(this.oldAuditParam, res => {
          console.log(res);
          this.oldAuditData = res.data;
          this.oldAuditTotal = res.total;
        });
      }
    },
    // 编辑
    update() {},
    // 保险分页页码
    switchInsurancePageIndex(index) {
      console.log(index);
      this.insuranceParam.pageIndex = index;
      $ajax.getInsuranceRecordPage(this.insuranceParam, res => {
        this.oldAuditData = res.data;
        this.oldAuditTotal = res.total;
      });
    },
    // 保险分页条数
    switchInsurancePageSize(pageSize) {
      this.insuranceParam.pageSize = pageSize;
      $ajax.getInsuranceRecordPage(this.insuranceParam, res => {
        this.oldAuditData = res.data;
        this.oldAuditTotal = res.total;
      });
    },
    // 年审分页页码
    switchOldAuditPageIndex(index) {
      console.log(index);
      this.oldAuditParam.pageIndex = index;
      $ajax.getExaminedRecordPage(this.oldAuditParam, res => {
        this.oldAuditData = res.data;
        this.oldAuditTotal = res.total;
      });
    },
    // 年审分页条数
    switchOldAuditPageSize(pageSize) {
      this.oldAuditParam.pageSize = pageSize;
      $ajax.getExaminedRecordPage(this.oldAuditParam, res => {
        this.oldAuditData = res.data;
        this.oldAuditTotal = res.total;
      });
    }
  },

  created() {
    console.log(this.$route.query);
    let carId = parseInt(this.$route.query.id);
    this.insuranceParam.carId = carId;
    this.oldAuditParam.carId = carId;
    this.queryCarInfo(carId);
    this.queryExtInfo(carId);
  },
  mounted() {
    //
  }
};
</script>
<style lang="less">
@import url("../../../css/carDetail.less");
.carManageDetail .ivu-tabs{
  overflow: visible;
}
</style>

