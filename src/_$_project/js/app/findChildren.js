function find(data,departId) {
    var maxLevel = 0,
      coll = [];
    for (let i = 0; i < data.length; i++) {
      let ret = [];
      maxLevel = 0;
      walk(data[i], ret, 1);
      coll.push(ret.filter(node => node.level >= maxLevel));
  
      
      // console.log(coll)
    }
    /**
     *
     * @param {Object} node 当前节点
     * @param {Array} ret 保存目标节点
     * @param {number} level 当前节点 level
     */
    function walk(node, ret, level) {
      console.log(node)
      
      console.log(departId)
      if (departId === node.id) {
        node.checked = true;
        console.log("15155151515151515")
      }
      if ((!node.children || node.children.length === 0) && level >= maxLevel) {
        node.level = level;
        
        ret.push(node);
        maxLevel = level;
        console.log(ret);
        return;
      }
      for (let w of node.children) {
        walk(w, ret, level + 1);
      }
    }
  }
  export default find