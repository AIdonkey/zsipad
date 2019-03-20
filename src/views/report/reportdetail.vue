<template>
  <div>
    <header style="background: white;">
      <div class="backhome" @click="backhome">
        <Icon type="md-arrow-back" size="26" color="white"/>
      </div>
      <div class="orderright">
        <span style="color:;">报告信息</span>
        <div style="display: inline-block;">科室分类：
          <Select v-model="model1" style="width:200px" @on-change="singleinfo">
            <Option
              v-for="item0 in reportInfo"
              :value="item0.BMBH00"
              :key="item0.BMMC00"
            >{{ item0.BMMC00 }}</Option>
          </Select>
        </div>
      </div>
    </header>
    <Tabs type="card">
      <TabPane
        label="体检总结"
        style="overflow: scroll;position:relative;height:calc(100vh - 48px - 4rem);"
      >
        <div class="reportcell">
          <Cell title="基本信息" style="background:rgb(248,142,105);color:white;"/>
          <div style="width:100%;padding:0.5rem;">
            <div
              style="width:50%;text-align:center;display:inline-block;font-size:1.15rem;"
            >姓名: {{basicInfo.XM0000}}</div>
            <div
              style="width:50%;text-align:center;display:inline-block;font-size:1.15rem;"
            >性别: {{basicInfo.XB0000 === '1' ? '男' : '女'}}</div>
          </div>
        </div>
        <div class="reportcell">
          <Cell title="检验特殊项目" style="background:rgb(255,190,40);color:white;"/>
          <div style="width:100%;padding:0.5rem;">{{basicInfo.ZS0000}}</div>
        </div>
        <div class="reportcell">
          <Cell title="体检结论" style="background:rgb(59,194,180);color:white;"/>
          <div style>
            <div
              v-html="'&nbsp;&nbsp;'+ basicInfo.JY0000.replace(/\。\s/g,'。<br>&nbsp&nbsp')"
              style="line-height:3;text-align:justify;padding:0.5rem;"
            ></div>
          </div>
        </div>
      </TabPane>
      <TabPane
        label="报告详情"
        style="overflow: scroll;position:relative;"
        class="reportpane"
        id="detailpane"
      >
        <div style="position:absolute;width:100%;">
          <div v-for="item in reportInfo" :key="item.BMBH00">
            <div class="depcell" :id="item.BMBH00">
              <span class="depcell1">{{item.BMMC00}}</span>
            </div>
            <div v-if="item.CONTENTS === ''">
              <Cell :title="item.BMMC00" :extra="item.KSXJ00"/>
            </div>
            <div v-if="item.CONTENTS.DETAIL !== undefined">
              <Cell
                :title="item.CONTENTS.DETAIL.JCXMMC"
                :extra="item.CONTENTS.DETAIL.TZCMS0"
                v-if="item.CONTENTS.DETAIL.JCXMMC"
              />
            </div>
            <div
              v-for="item1 in item.CONTENTS.DETAIL !== undefined ? item.CONTENTS.DETAIL : item.CONTENTS.EXAMITEM"
              :key="item1.JCXMID"
            >
              <Cell :title="item1.JCXMMC" :extra="item1.TZCMS0" v-if="item1.JCXMMC"/>
              <!-- 检验科项目 -->
              <span>{{item1.SQXMMC}}</span>
              <!-- 所检项目数为单个 -->
              <div
                v-if="item1.CONTENT !== undefined && item1.CONTENT.EXAMDETAIL.length === undefined"
              >
                <Cell
                  :title="item1.CONTENT.EXAMDETAIL.JCXMMC"
                  :extra="item1.CONTENT.EXAMDETAIL.JYJG00"
                  v-if="item1.CONTENT.EXAMDETAIL.JCXMMC"
                  @on-click="singleinfo"
                  class="cellstyle"
                />
              </div>
              <!-- 所检项目数为多个 -->
              <div
                v-for="item2 in item1.CONTENT !== undefined ? item1.CONTENT.EXAMDETAIL : []"
                :key="item2.JCXMID"
              >
                <Cell v-if="item2.JCXMMC" @on-click="singleinfo(item2)">
                  <div slot>{{item2.JCXMMC}}</div>
                  <div slot="extra">
                    <div style="text-align:right;">{{item2.JYJG00}}</div>
                    <span
                      style="color:green;"
                    >{{item2.CKFW00 !== undefined ? '正常值：('+item2.CKFW00 +')' : ''}}</span>
                  </div>
                </Cell>
              </div>
            </div>
            <div class="depsub">科室小结:
              <div>{{item.KSXJ00}}</div>
              <!-- <Cell :title="item.BMMC00" :extra="item.KSXJ00"/> -->
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getBasicInfo, getReport } from '../../service/service';
import { mixin2 } from '../../components/common/mixin';

export default {
  mixins: [mixin2],
  data() {
    return {
      basicInfo: [],
      reportInfo: [],
      model1: '',
    };
  },
  beforeCreate() {
    this.$Loading.start();
  },
  components: {},

  computed: {},

  mounted() {
    this.$Loading.finish();
    getBasicInfo(JSON.stringify({ yyid00: '222667', tjh000: '2009002' }))
      .then(resp => resp.json())
      .then((data) => {
        this.basicInfo = data.responseEntity.entity.basicInfoList[0];
      });
    getReport(JSON.stringify({ yyid00: '222667', tjh000: '2009002' }))
      .then(resp => resp.json())
      .then((data) => {
        this.reportInfo = data.responseEntity.entity.mapYysj.YYXX00.PATIENTREPORT.SUMMARY;
      });
  },
  methods: {
    singleinfo(value) {
      console.log(value);
      document.getElementById('detailpane').scrollTop = document.getElementById(
        value,
      ).offsetTop;
    },
  },
};
</script>
<style lang='scss' scoped>
.reportcell {
  padding: 0rem 0rem 0rem 0rem;
}
.depcell {
  background: rgb(248, 248, 249);
}
.depcell1 {
  width: 200px;
  display: inline-block;
  background: red;
  padding: 0.5rem;
  color: white;
}
.depsub {
  color: red;
  padding: 7px 16px;
  text-align: justify;
}
.reportpane .ivu-cell::after {
  content: "";
  width: 980px;
  height: 0px;
  border-bottom: 1px solid rgb(235, 236, 238);
  display: inline-block;
  position: absolute;
  bottom: 0px;
}
.backhome {
  width: 4rem;
  height: 4rem;
  display: inline-block;
  float: left;
  background: rgb(63, 81, 181);
  padding: 1rem;
  text-align: center;
}
.orderright {
  display: inline-flex;
  padding: 1rem;
  align-items: center;
  flex-direction: row;
  width: calc(100vw - 5rem);
  justify-content: space-between;
}
</style>
