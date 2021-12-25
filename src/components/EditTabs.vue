<template>
  <div>
    <Vuedraggable element="span" v-model="tabList">
      <el-tag v-for="data in tabList" :key="data.id" closable @close="onRemove(data)" @click="onSelect(data.id)" :class="data.id === value ? ['select-tab', 'tab'] : ['tab']">
        {{ data.name }}
      </el-tag>
    </Vuedraggable>
    <div class="input-container">
      <el-input class="save-input" v-if="inputVisible" v-model="inputValue" size="small" ref="saveInput" @keyup.enter.native="onAdd" @blur="
        inputVisible = false;
        inputValue = '';
      ">
      </el-input>
      <el-button v-else size="small" class="save-button" @click="showSaveInput">+ 新建标签</el-button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Vuedraggable from "vuedraggable";
import { MessageBox } from "element-ui";
export default {
  components: {
    Vuedraggable,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selectId: null,
      inputVisible: false,
      inputValue: "",
      tabList: [],
    };
  },
  methods: {
    getTabList() {
      return this.tabList.map(({ id, name }) => ({ id, name }));
    },
    setTabList(tabList) {
      this.tabList = tabList.map(({ id, name }) => ({
        id,
        name,
      }));
    },
    onSelect(id) {
      if (id != this.value) {
        this.$emit("input", id);
        this.$emit("change", id);
      }
      this.$emit("clickTab", id);
    },
    showSaveInput() {
      this.inputVisible = true;
      this.inputValue = "";
      this.$nextTick(() => {
        this.$refs.saveInput.$refs.input.focus();
      });
    },
    onAdd() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let id = uuidv4();
        this.$emit("add", {
          name: inputValue,
          id: id,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onRemove({ id, name }) {
      MessageBox.confirm(`确定要删除 "${name}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$emit("remove", id);
        })
        .catch(console.warn);
    },
  },
};
</script>

<style scoped>
.tab {
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;
}
.select-tab {
  border: 1px dashed #303133;
}

.input-container {
  display: inline-block;
  width: 95px;
  margin-right: 5px;
}

.save-input {
  width: 100%;
}

.save-button {
  width: 100%;
}

.tab-container {
  max-width: calc(100% - 200px);
  overflow-x: scroll;
}
</style>
