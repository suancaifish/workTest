import Vue from 'vue';
/**
 * @description 数据增加层级标示
 * @param {Array} data  表格数据
 * @param {Boolean} expandAll 是否展开
 * @param {Object} parent 递归填入的父级对象
 * @param {Number} level 层级
 */
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = [];
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    // 如果有父元素
    if (parent) {
      let childrenParent = JSON.parse(JSON.stringify(parent));
      delete childrenParent['children']; //避免循环引用
      Vue.set(record, 'parent', childrenParent);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  })
  return tmp
}