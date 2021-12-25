# el-table-plus

element-ui table 组件 增强版

## 使用

引入 `el-table-plus` 替换 `el-table`

```html
<el-table-plus :data="data">
  <el-table-column prop="id" label="id"></el-table-column>
  <el-table-column prop="name" label="名称"></el-table-column>
  <el-table-column prop="code" label="编码"></el-table-column>
  <el-table-column prop="key" label="键"></el-table-column>
</el-table-plus>
```

## 功能

### 自定义表头

可以控制展示哪些表头、通过拖拽控制表头顺序

![demo.gif](./screenshots/demo.gif)
