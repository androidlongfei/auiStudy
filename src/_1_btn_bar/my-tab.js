(function(win) {
  "use strict"
  console.log("", win);
  var myTab = function(params, callback) {
    this.extend(this.params, params);
    this._init(callback);
  }
  myTab.prototype = {
    params: {
      element: false, // 元素(包含多个子元素)
      repeatClick: false, //是否重复点击
      index: 1 // 默认选中
    },
    _init: function(callback) {
      var self = this;
      if (!self.params.element && self.params.element.nodeType != 1) {
        return;
      }
      var itemElements = self.params.element.children;
      if (itemElements) {
        self.setActive();
        _.each(itemElements, function(itemElement, index) {
          console.log('itemElement', itemElement);
          itemElement.onclick = function(e) {
            var lastChoiseNode = this.parentNode.querySelector(".aui-active");
            if (lastChoiseNode) {
              lastChoiseNode.classList.remove("aui-active");
            }
            this.classList.add("aui-active");
            if (callback) {
              callback({
                index: index + 1,
                dom: this
              });
            }
          };
        });
      }
    },
    setActive: function(index) {
      //选中index对应的item
      var self = this;
      var myIndex = index ? index : self.params.index;
      var element = self.params.element;
      var lastChoiseNode = element.querySelector(".aui-active");
      // console.log("lastChoiseNode", lastChoiseNode);
      if (lastChoiseNode) {
        lastChoiseNode.classList.remove("aui-active");
      }
      var needChoiseNode = element.querySelectorAll(".aui-bar-btn-item")[myIndex - 1];
      // console.log("needChoiseNode", needChoiseNode);
      if (needChoiseNode) {
        needChoiseNode.classList.add("aui-active");
      }
    },
    extend: function(origin, target) {
      //将目标属性复制到原熟悉上
      for (var attr in target) {
        if (origin.hasOwnProperty(attr)) {
          origin[attr] = target[attr];
        }
      }
    }
  }
  win.MyTab = myTab;
})(window)
