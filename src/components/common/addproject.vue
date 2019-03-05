<template>
    <div>
        <Button v-for="(item,key) in deparr" :key="key" style="margin: 1rem 0 0 1rem;width: 14vw"
        @click.native="changedep(item)" v-show="depshow"
        >
                    {{item}}
        </Button>
        <div v-show="!depshow" >
          <header style="margin-bottom: 1vw">
            <div class="addblock">新增检查项目</div>
            <Input prefix="ios-search" placeholder="项目名称查询" class="searchinput" v-model="searchwords"/>
        </header>
        <section v-show="!depshow">
            <i-table :columns="columns1" class="tablestyle"  :data="yourdep[pagesnum-1]"  @on-select="selectoption" @on-select-cancel="selectoption" border>
            </i-table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="yourdep.length*8" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
            <div>
            </div>
        </section>
        </div>
        <footer>
        </footer>
    </div>
</template>
<script>
import { mixin1 } from './mixin';
import { getAddItemList, getPEItemConflict } from '../../service/service';

export default {
  name: 'addproject',
  mixins: [mixin1],
  props: ['ids', 'modal6'],
  data() {
    return {
      conflictproject: [],
      addproject: [],
      deparr: [], // 科室列表
      depshow: true,
      pagesnum: 1,
      yourdep: [], // 所在科室项目
      yourdep1: [], // 初始科室项目
      searchprj: [],
      searchwords: '',
      recentoption: [],
      lastnewprj: [],
    };
  },
  created() {
  },
  watch: {
    modal6() {
      if (this.modal6 === false) {
        this.depshow = false;
      } else {
        this.depshow = true;
      }
      getAddItemList(`yyid00=222667&xzfl00=1&xb0000=0&pageSize=800&pageNumber=1&sqxmid=${this.$props.ids}&search=`).then(response => response.json()).then((res) => {
        this.addproject = [];
        this.addproject = res.responseEntity.entity;
        // let j = 0;
        for (let i = 0; i < this.addproject.length; i++) {
          // this.addproject[i]._checked = true;
          this.$set(this.addproject[i], '_checked', false);
          this.$set(this.addproject[i], '_disabled', false);
          // this.addproject[i]._disabled = false;
          if (this.deparr.length === 0) {
            this.deparr.push(this.addproject[i].BMMC00);
          } else {
            for (let j = 0; j < this.deparr.length; j++) {
              if (this.addproject[i].BMMC00 === this.deparr[j]) {
                break;
              } else if (j === this.deparr.length - 1) {
                this.deparr.push(this.addproject[i].BMMC00);
              }
            }
          }
        }
      });
      getPEItemConflict('yyid00=222667').then(response => response.json()).then((res) => {
        this.conflictproject = res.responseEntity.entity;
      });
    },
    // modal6() {
    //   this.depshow = true;
    // },
    searchwords() {
      this.searchprj = [];
      this.yourdep = [];
      this.pagesnum = 1;
      for (let i = 0; i < this.yourdep1.length; i++) {
        for (let j = 0; j < this.yourdep1[i].length; j++) {
          if (this.yourdep1[i][j].SFXMMC.indexOf(this.searchwords) !== -1) {
            this.searchprj.push(this.yourdep1[i][j]);
          }
        }
      }
      for (let i = 0; i < this.searchprj.length; i++) {
        if (this.yourdep.length === 0) {
          this.yourdep.push([this.searchprj[i]]);
        } else {
          for (let j = 0; j < this.yourdep.length; j++) {
            if (this.yourdep[j].length < 8) {
              this.yourdep[j].push(this.searchprj[i]);
              break;
            } else if (j === this.yourdep.length - 1) {
              this.yourdep.push([this.searchprj[i]]);
              break;
            }
          }
        }
      }
    },
  },
  mounted() {
  },
  updated() {
    this.$nextTick(() => {

    });
  },
  methods: {
    changePage(currentpage) {
      this.pagesnum = currentpage;
    },
    changedep(item) {
      this.depshow = false;
      this.yourdep = [];
      this.pagesnum = 1;
      for (let i = 0; i < this.addproject.length; i++) {
        if (this.addproject[i].BMMC00 === item && this.yourdep.length === 0) {
          this.yourdep.push([this.addproject[i]]);
        } else if (this.addproject[i].BMMC00 === item) {
          for (let j = 0; j < this.yourdep.length; j++) {
            if (this.yourdep[j].length < 8) {
              this.yourdep[j].push(this.addproject[i]);
              break;
            } else if (j === this.yourdep.length - 1) {
              this.yourdep.push([this.addproject[i]]);
              break;
            }
          }
        }
      }
      this.yourdep1 = this.yourdep;
    },
    selectoption(selection, row) {
      // 所选项目
      // const temdate = new Date();
      const yourdeppage = this.pagesnum - 1;
      this.recentoption = selection;
      if (selection.length === 0) {
        for (let i = 0; i < this.addproject.length; i++) {
          for (let k = 0; k < this.yourdep[this.pagesnum - 1].length; k++) {
            if (this.yourdep[this.pagesnum - 1][k].SQXMID === this.addproject[i].SQXMID) {
              this.addproject[i]._checked = false;
            }
          }
        }
        return;
      }
      const temp = [];
      for (let i = 0; i < selection.length; i++) {
        temp.push(selection[i].SQXMID);
      }
      for (let i = 0; i < selection.length; i++) {
        for (let j = 0; j < this.yourdep[yourdeppage].length; j++) {
          if (selection[i].SQXMID === this.yourdep[yourdeppage][j].SQXMID) {
            for (let k = 0; k < this.addproject.length; k++) {
              if (selection[i].SQXMID === this.addproject[k].SQXMID) {
                this.addproject[k]._checked = true;
              }
            }
          } else if (temp.indexOf(this.yourdep[yourdeppage][j].SQXMID) === -1) {
            for (let k = 0; k < this.addproject.length; k++) {
              if (this.yourdep[yourdeppage][j].SQXMID === this.addproject[k].SQXMID) {
                this.addproject[k]._checked = false;
              }
            }
          }
        }
      }
      for (let i = 0; i < this.conflictproject.length; i++) {
        const conflictsqxmid = this.conflictproject[i].SQXMID;
        const conflictctxmid = this.conflictproject[i].CTXMID;
        for (let j = 0; j < this.addproject.length; j++) {
          if ((row.SQXMID === conflictsqxmid ? conflictctxmid === this.addproject[j].SQXMID : false) && this.addproject[j]._checked === true) {
            for (let k = 0; k < this.addproject.length; k++) {
              if (this.addproject[k].SQXMID === row.SQXMID) {
                this.addproject[k]._checked = false;
              }
            }
          }
        }
      }
      this.lastnewprj = [];
      for (let i = 0; i < this.addproject.length; i++) {
        if (this.addproject[i]._checked === true) {
          this.lastnewprj.push(this.addproject[i]);
        }
      }
      // alert(new Date() - temdate);
      this.$emit('toaddprj', this.lastnewprj);
    },
  },
};
</script>

<style scoped lang="scss">

.searchinput{
    width: 35%;
    text-align: right;
}
.addblock{
    width: 65%;
    display: inline-block;
    font-size: 1rem;
    color: $color1;
}
</style>
