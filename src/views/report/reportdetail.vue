<template>
  <div style="padding: 24px;">
    <Tabs type="card">
      <TabPane label="体检总结">
        <div class="reportcell">
          <Cell title="基本信息" style="background:rgb(248,142,105);color:white;"/>
          <div style="width:100%;padding:0.5rem;">
            <div
              style="width:50%;text-align:center;display:inline-block;font-size:1.25rem;"
            >姓名: {{basicInfo.XM0000}}</div>
            <div
              style="width:50%;text-align:center;display:inline-block;font-size:1.25rem;"
            >性别: {{basicInfo.XB0000 === '1' ? '男' : '女'}}</div>
          </div>
        </div>
        <div class="reportcell">
          <Cell title="检验特殊项目" style="background:rgb(255,190,40);color:white;"/>
          <div style="width:100%;padding:0.5rem;">{{basicInfo.ZS0000}}</div>
        </div>
        <div class="reportcell" style="position:relative;height:450px;">
          <Cell title="体检结论" style="background:rgb(59,194,180);color:white;"/>
          <div style="position:absolute;height:450px;overflow:scroll;">
            <div
              v-html="'&nbsp;&nbsp;'+ basicInfo.JY0000.replace(/\。\s/g,'。<br>&nbsp&nbsp')"
              style="line-height:3;"
            ></div>
          </div>
        </div>
      </TabPane>
      <TabPane label="报告详情" style="overflow: scroll;position:relative;">
        <div style="position:absolute;width:100%;">
          <div v-for="item in reportInfo" :key="item.BMBH00">
            <div class="depcell">
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
                />
              </div>
              <!-- 所检项目数为多个 -->
              <div
                v-for="item2 in item1.CONTENT !== undefined ? item1.CONTENT.EXAMDETAIL : []"
                :key="item2.JCXMID"
                
              >
                <Cell :title="item2.JCXMMC" :extra="item2.JYJG00" v-if="item2.JCXMMC" />
              </div>
            </div>
            <div class="depsub">
                科室小结:
                <div>
                    {{item.KSXJ00}}
                </div>
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

export default {
  data() {
    return {
      basicInfo: [],
      reportInfo: [],
    };
  },

  components: {},

  computed: {},

  mounted() {
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
    singleinfo() {

    },
  },
};
</script>
<style lang='scss' scoped>
.reportcell {
  padding: 0rem 0rem 0rem 0rem;
}
.depcell{
    background: rgb(248,248,249);
}
.depcell1{
    width: 200px;
    display: inline-block;
    background: red;
    padding: 0.5rem;
    color: white;
}
</style>
