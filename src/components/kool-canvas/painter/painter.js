/**
 * 用于将json数据画入canvas
 */
export default class Painter {
  current = {
    x: 0,
    y: 0,
    baseline: 0,
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
    let size = {
      width: 0,
      height: 0,
    };
    if (views.type === 'viewGroup' && parentCss) {
      size = this._measureViews(views);
    }
    this.current.baseline = size.height + this.current.y;
    for (const ii in views.views) {
      const view = views.views[ii];
      const {
        type,
      } = view;
      if (type === 'viewGroup') {
        this._handleViewGroup(view, view.css);
      } else {
        this._handleView(view, parentCss);
      }
    }
  }

  _measureViews(viewGroup) {
    const size = {
      width: 0,
      height: 0,
    };
    const { views, css } = viewGroup;
    const { orientation } = css;
    for (const ii in views) {
      const view = views[ii];
      const { type } = view;
      if (type === 'viewGroup') {
        const ms = this._measureViews(view);
        if (orientation && orientation === 'horizontal') {
          size.width += ms.width;
          size.height = size.height > ms.height ? size.height : ms.height;
        } else {
          size.height += ms.height;
          size.width = size.width > ms.width ? size.width : ms.width;
        }
      } else {
        const ms = this._measureView(view);
        if (orientation && orientation === 'horizontal') {
          size.width += ms.width;
          size.height = size.height > ms.height ? size.height : ms.height;
        } else {
          size.height += ms.height;
          size.width = size.width > ms.width ? size.width : ms.width;
        }
      }
      return size;
    }

    const marginWidth = this._getPx(views.css.marginLeft ? views.css.marginLeft : 0) + this._getPx(views.css.marginRight ? views.css.marginRight : 0);
    const marginHeight = this._getPx(views.css.marginTop ? views.css.marginTop : 0) + this._getPx(views.css.marginBottom ? views.css.marginBottom : 0);
    size.width += marginWidth;
    size.height += marginHeight;
    return size;
  }

  _measureView(view) {
    const size = {
      width: 0,
      height: 0,
    };
    if (view.css.width) {
      size.width = view.css.width;
    } else {
      // 文字类需要手动获取宽度；
      if (view.type === 'text') {
        this.ctx.setFontSize(this._getPx(view.css.fontSize));
        size.width = this.ctx.measureText(view.text).width;
      }
    }
    if (view.css.height) {
      size.height = view.css.height;
    } else {
      // 文字类需要手动获取高度；
      if (view.type === 'text') {
        size.height = this._getPx(view.css.fontSize);
      }
    }
    const marginWidth = this._getPx(view.css.marginLeft ? view.css.marginLeft : 0) + this._getPx(view.css.marginRight ? view.css.marginRight : 0);
    const marginHeight = this._getPx(view.css.marginTop ? view.css.marginTop : 0) + this._getPx(view.css.marginBottom ? view.css.marginBottom : 0);
    size.width += marginWidth;
    size.height += marginHeight;
    return size;
  }

  _handleView(view, parentCss) {
    if (!(parentCss && parentCss.orientation && parentCss.orientation === 'horizontal')) {
      console.log(view);
      this.current.x = 0;
      this.current.y = this.current.baseline;
    }
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
    const y = this.current.y + marginTop + this.current.baseline;

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
