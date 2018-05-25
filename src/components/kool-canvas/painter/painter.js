/**
 * 用于将json数据画入canvas
 */
export default class Painter {
  current = {
    x: 0,
    y: 0,
  }

  constructor(ctx, data, style) {
    this.ctx = ctx;
    this.data = data;
    this.style = style;
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 画在canvas上的尺寸，如果传入是n rpx,则应该画n*k px;而且，应该尽量使用rpx，以保证屏幕适配性
        that.k = res.windowWidth / 750;
      },
    });
  }

  paint() {
    this._background();
    this._handleViewGroup(this.data.viewContainer);
    this.ctx.draw();
  }

  _background() {
    const bg = this.data.background;
    if (bg.startsWith('#')) {
      // 背景填充颜色
      this.ctx.setFillStyle(bg);
      this.ctx.fillRect(0, 0, this._getPx(this.style.width), this._getPx(this.style.height));
    } else {
      // 背景填充图片
      this.ctx.drawImage(bg, 0, 0, this._getPx(this.style.width), this._getPx(this.style.height));
    }
  }

  // 参数为当前要操作的view对象（或viewgroup），以及上层viewgroup的css文件
  _handleViewGroup(views, parentCss) {
    for (const ii in views) {
      const view = views[ii];
      const {
        type,
      } = view;
      if (type === 'viewGroup') {
        this._handleViewGroup(view.views, view.css);
      } else {
        this._handleView(view, parentCss);
      }
    }
  }

  _handleView(view, parentCss) {
    let viewSize = {
      width: 0,
      height: 0,
    };
    switch (view.type) {
      case 'text':
        viewSize = this._fillText(view);
        break;
      case 'image':
        viewSize = this._drawImage(view);
        break;
      default:
        break;
    }
    if (parentCss && parentCss.orientation) {
      if (parentCss.orientation === 'horizontal') {
        this.current.x += viewSize.width;
      } else {
        this.current.y += viewSize.height;
      }
    }
  }

  _fillText(text) {
    const size = {
      width: 0,
      height: 0,
    };
    const fontSize = this._getPx(text.css.fontSize);
    this.ctx.setFillStyle(text.css.color);
    this.ctx.setFontSize(fontSize);

    const marginLeft = this._getPx(text.css.marginLeft);
    const marginRight = this._getPx(text.css.marginRight);
    const marginTop = this._getPx(text.css.marginTop);
    const marginBottom = this._getPx(text.css.marginBottom);

    const x = this.current.x + marginLeft;
    const y = this.current.y + marginTop + fontSize;

    this.ctx.fillText(text.text, x, y);
    // this.ctx.font = `normal normal ${fontSize}px`;
    size.width = this.ctx.measureText(text.text).width + marginLeft + marginRight;
    size.height = fontSize + marginTop + marginBottom;
    return size;
  }

  _drawImage(image) {
    let size = {
      width: this._getPx(image.css.width),
      height: this._getPx(image.css.height),
    };

    const marginLeft = this._getPx(image.css.marginLeft);
    const marginRight = this._getPx(image.css.marginRight);
    const marginTop = this._getPx(image.css.marginTop);
    const marginBottom = this._getPx(image.css.marginBottom);
    this.ctx.drawImage(image.url, this.current.x + marginLeft, this.current.y + marginTop, size.width, size.height);

    size = {
      width: size.width + marginLeft + marginRight,
      height: size.height + marginTop + marginBottom,
    };

    return size;
  }

  _getPx(str) {
    if (!str) {
      return 0;
    }
    const value = parseInt(str, 10);
    const unit = str.replace(/[^a-zA-Z]/g, '');
    let res = 0;
    if (unit === 'rpx') {
      res = value * this.k;
    } else if (unit === 'px') {
      res = value;
    } else if (unit === '%') {
      res = this._getPx(this.style.width);
    }
    return res;
  }
}
