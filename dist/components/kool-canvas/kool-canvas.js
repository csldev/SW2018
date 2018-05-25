import Painter from './painter/painter';
// src/components/kool-canvas/kool-canvas.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource: {
      type: Object,
    },
    customStyle: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    const style = this.properties.customStyle;
    const width = style.substring(style.indexOf('width:') + 6, style.indexOf(';', style.indexOf('width:')));
    const height = style.substring(style.indexOf('height:') + 7, style.indexOf(';', style.indexOf('height:')));
    const ctx = wx.createCanvasContext('k-canvas', this);
    const painter = new Painter(ctx, this.properties.dataSource, { width: width, height: height });
    painter.paint();
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
});
