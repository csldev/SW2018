// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    items: [{
      id: 1,
      name: 'xml2canvas',
    }],
  },

  onLoad() {
    setTimeout(() => {
      app.router.navigateTo(app.router.nativePage('xml2can'));
    }, 500);
  },

  onButtonTapped(e) {
    switch (e.currentTarget.dataset.id) {
      case 1:
        app.router.navigateTo(app.router.nativePage('xml2can'));
        break;
      default:
        break;
    }
  },

});
