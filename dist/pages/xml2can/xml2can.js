// src/pages/xml2can/xml2can.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skin: {
      name: 'the light of the sky',
      id: '001',
      lastModified: '20180524',
      background: '#0a0',
      viewContainer: [
        {
          type: 'viewGroup',
          views: [
            {
              type: 'text',
              text: 'sw',
              css: {
                position: 'relative',
                marginLeft: '30rpx',
                fontSize: '70rpx',
                color: '#000',
              },
            },
            {
              type: 'image',
              url: '/res/s01.jpg',
              css: {
                position: 'relative',
                width: '150rpx',
                height: '150rpx',
                marginTop: '0rpx',
                marginLeft: '30rpx',
              },
            },
          ],
          css: {
            position: 'relative',
            width: '100%',
            orientation: 'horizontal',
          },
        },
        {
          type: 'text',
          text: 'description',
          css: {
            position: 'relative',
            marginLeft: '30rpx',
            fontSize: '40rpx',
            color: '#000',
          },
        },
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


});

