// 处理树形控件的数据
export default {
    disposeTreeData(tree = []) {
        let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
            if(item.companyName){
              item.disableCheckbox = true //禁用父节点
            }
            let obj = {};
            // 合并
            Object.assign(obj,item)
            obj.expand = true;
            obj.selected = false;
            obj.children = this.disposeTreeData(item.children); //递归调用
            arr.push(obj);
          });
        }
        return arr;
      },
}
