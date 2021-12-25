<template>
  <div>
    <el-popover placement="left" width="650" trigger="manual" v-model="visible">
      <div>
        <i class="el-icon-close close-button" @click="visible = false" />
        <EditTabs ref="editTabs" :showCount="false" v-model="selectId" @add="addConfig" @change="changeConfig" @remove="removeConfig" class="edit-table" />
        <div>
          <el-checkbox :indeterminate="
            allSelectStatus.hasSelect && !allSelectStatus.allSelect
          " v-model="allSelectStatus.allSelect" @change="allSelectChange">
            全选
          </el-checkbox>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content">
              可通过拖拽改变表头顺序<br />表格默认展示第一个标签的表头信息<br />可通过拖拽改变标签顺序<br />按
              Esc 或点击右上角 <i class="el-icon-close" /> 关闭页面
            </div>

            <span class="text-tip"><i class="el-icon-info" /> 拖拽排序</span>
          </el-tooltip>
        </div>
        <el-row :gutter="10" style="width: 630px;">
          <el-col :span="8"><span>左</span><span class="fixed-tip">固定列</span></el-col>
          <el-col :span="8"><span>中</span></el-col>
          <el-col :span="8"><span>右</span><span class="fixed-tip">固定列</span></el-col>
        </el-row>
        <div>
          <el-row :gutter="10" style="width: 630px;">
            <el-col :span="8">
              <Vuedraggable element="div" v-model="leftList" class="list-container el-card is-always-shadow" :group="`${dataSource}Head`">
                <div v-for="item in leftList" :key="item.prop">
                  <el-checkbox v-model="item.show" @change="calcAllSelectStatus">
                    {{ item.label }}
                  </el-checkbox>
                </div>
              </Vuedraggable>
            </el-col>
            <el-col :span="8">
              <Vuedraggable element="div" v-model="centerList" class="list-container el-card is-always-shadow" :group="`${dataSource}Head`">
                <div v-for="item in centerList" :key="item.prop">
                  <el-checkbox v-model="item.show" @change="calcAllSelectStatus">
                    {{ item.label }}
                  </el-checkbox>
                </div>
              </Vuedraggable>
            </el-col>
            <el-col :span="8">
              <Vuedraggable element="div" v-model="rightList" class="list-container el-card is-always-shadow" :group="`${dataSource}Head`">
                <div v-for="item in rightList" :key="item.prop">
                  <el-checkbox v-model="item.show" @change="calcAllSelectStatus">
                    {{ item.label }}
                  </el-checkbox>
                </div>
              </Vuedraggable>
            </el-col>
          </el-row>
        </div>

        <el-button style="width: 100%; margin-top:10px;" size="mini" type="primary" @click="save">保存</el-button>
      </div>

      <el-button slot="reference" type="text" icon="el-icon-s-tools" circle @click="visible = !visible"></el-button>
    </el-popover>
  </div>
</template>

<script>
import { Message } from "element-ui";
import userConfig from "../services/userConfig.js";
import EditTabs from "./EditTabs.vue";
import Vuedraggable from "vuedraggable";

function cloneHead({ fixed, name, prop, show }) {
  return {
    fixed,
    name,
    prop,
    show,
  };
}
export default {
  components: {
    Vuedraggable,
    EditTabs,
  },
  props: {
    dataSource: {
      type: String,
      default: "",
    },
    wholeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      allSelectStatus: {
        hasSelect: false,
        allSelect: false,
      },
      selectId: null,
      visible: false,
      dataList: [],

      leftList: [],
      centerList: [],
      rightList: [],
      keydownListener: null,
      propMap: {},
    };
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownListener);
  },
  mounted() {
    this.keydownListener = (e) => {
      if (e.key === "Escape") {
        this.visible = false;
      }
    };
    this.$nextTick(() => {
      document.addEventListener("keydown", this.keydownListener);
    });

    this.dataInit();
  },
  watch: {
    selectId() {
      this.emitToParent();
    },
  },
  methods: {
    removeConfig(id) {
      if (this.dataList.length <= 1) {
        Message({
          showClose: true,
          message: "至少保留一个配置",
          type: "error",
        });
        return;
      }
      this.saveCurrentSelect();
      this.sortDataList();
      this.dataList = this.dataList.filter((item) => item.id != id);
      if (this.selectId === id) {
        this.selectId = this.dataList[0].id;
      }
      for (let data of this.dataList) {
        if (data.id === this.selectId) {
          this.setData(data.data);
          return;
        }
      }
    },
    changeConfig(id) {
      this.sortDataList();
      for (let data of this.dataList) {
        if (data.id === id) {
          this.setData(data.data);
          return;
        }
      }
    },
    addConfig({ id, name }) {
      this.saveCurrentSelect();
      this.sortDataList();
      let data = this.wholeList.map(cloneHead);
      this.dataList.push({ id, name, data });
      this.selectId = id;
      this.setData(data);
    },
    async dataInit() {
      let result = await userConfig.get("table-head", this.dataSource);
      this.dataList = result == null ? null : result.dataList;
      this.propMap = {};
      for (let item of this.wholeList) {
        this.propMap[item.prop] = item;
      }
      if (this.dataList == null || this.dataList.length === 0) {
        this.dataList = [
          {
            id: "default",
            name: "默认配置",
            data: this.wholeList.map(({ prop, fixed, show }) => ({
              prop,
              fixed,
              show,
            })),
          },
        ];
      }
      this.setData(this.dataList[0].data);
      this.selectId = this.dataList[0].id;
    },
    sortDataList() {
      let tabList = this.$refs.editTabs.getTabList();
      let dataList = [];
      for (let tab of tabList) {
        for (let data of this.dataList) {
          if (data.id === tab.id) {
            dataList.push(data);
            continue;
          }
        }
      }
      this.dataList = dataList;
    },
    setData(list) {
      let newList = [];
      for (let data of list) {
        let item = this.propMap[data.prop];
        if (item == null) {
          console.log("data", data, item);
          continue;
        }
        data.label = item.label;
        newList.push(data);
      }

      let propList = newList.map((item) => item.prop);
      for (let data of this.wholeList) {
        if (!propList.includes(data.prop)) {
          newList.push(data);
        }
      }

      list.slice(0, 0);

      this.leftList = [];
      this.centerList = [];
      this.rightList = [];
      for (let head of newList) {
        let { fixed } = head;
        if (fixed === "left") {
          this.leftList.push(head);
        } else if (fixed === "right") {
          this.rightList.push(head);
        } else {
          this.centerList.push(head);
        }
      }
      this.$refs.editTabs.setTabList(this.dataList);
      this.calcAllSelectStatus();
    },
    allSelectChange() {
      this.leftList.forEach(
        (item) => (item.show = this.allSelectStatus.allSelect)
      );
      this.centerList.forEach(
        (item) => (item.show = this.allSelectStatus.allSelect)
      );
      this.rightList.forEach(
        (item) => (item.show = this.allSelectStatus.allSelect)
      );
      this.allSelectStatus.hasSelect = this.allSelectStatus.allSelect;
    },
    calcAllSelectStatus() {
      this.allSelectStatus.allSelect = true;
      this.allSelectStatus.hasSelect = false;
      for (let head of [
        ...this.leftList,
        ...this.centerList,
        ...this.rightList,
      ]) {
        if (head.show) {
          this.allSelectStatus.hasSelect = true;
        } else {
          this.allSelectStatus.allSelect = false;
        }
        if (this.allSelectStatus.hasSelect && !this.allSelectStatus.allSelect) {
          return;
        }
      }
    },
    saveCurrentSelect() {
      this.leftList.forEach((item) => (item.fixed = "left"));
      this.centerList.forEach((item) => (item.fixed = false));
      this.rightList.forEach((item) => (item.fixed = "right"));
      for (let data of this.dataList) {
        if (data.id === this.selectId) {
          data.data = [
            ...this.leftList,
            ...this.centerList,
            ...this.rightList,
          ].map(cloneHead);
          break;
        }
      }
    },
    async save() {
      this.saveCurrentSelect();
      this.sortDataList();
      await userConfig.save("table-head", this.dataSource, {
        dataList: this.dataList,
      });
      Message({
        showClose: true,
        message: "保存成功",
        type: "success",
      });
      this.emitToParent();
    },
    emitToParent() {
      let data = [
        ...this.leftList,
        ...this.centerList,
        ...this.rightList,
      ].filter((item) => item.show);
      this.$emit("change", data.map(cloneHead));
    },
  },
};
</script>

<style scoped>
.fixed-tip {
  color: #c0c4cc;
  padding-left: 3px;
}
.text-tip {
  position: absolute;
  right: 20px;
  color: #c0c4cc;
}
.edit-table {
  max-height: 70px;
  overflow-y: auto;
}
.close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: #409eff;
  border-radius: 50%;
  text-align: center;
  height: 14px;
}

.close-button:hover {
  color: #fff;
  background-color: #409eff;
}

.list-container {
  padding: 5px;
  height: 450px;
  overflow-y: auto;
}
</style>
