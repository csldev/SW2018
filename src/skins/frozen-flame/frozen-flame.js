const skin = {
  name: 'frozen-flame',
  id: '002',
  lastModified: '20180528',
  background: '#aaf',
  viewContainer: {
    type: 'viewGroup',
    css: {
      padding: '20rpx',
      marginTop: '50rpx',
    },
    views: [
      {
        type: 'image',
        url: '/res/s01.jpg',
        css: {
          position: 'absolute',
          top: '50rpx',
          right: '50rpx',
          width: '150rpx',
          height: '150rpx',
          shape: 'circle',
        },
      },
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '梁普荣',
            css: {
              fontSize: '50rpx',
              color: '#000',
            },
          },
        ],
        css: {
          marginLeft: '30rpx',
        },
      },
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '30 - 100元/m²',
            css: {
              fontSize: '30rpx',
              color: '#333',
            },
          },
          {
            type: 'text',
            text: '从业8年',
            css: {
              marginLeft: '30rpx',
              fontSize: '30rpx',
              color: '#333',
            },
          },
        ],
        css: {
          position: 'relative',
          orientation: 'horizontal',
          marginLeft: '30rpx',
          marginTop: '40rpx',
        },
      },
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '服务地区：东莞、深圳、湛江',
            css: {
              fontSize: '30rpx',
              color: '#333',
            },
          },
        ],
        css: {
          marginLeft: '30rpx',
          marginTop: '40rpx',
        },
      },
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '擅长风格 新中式、北欧、混搭、后现代',
            css: {
              fontSize: '30rpx',
              color: '#333',
            },
          },
        ],
        css: {
          marginLeft: '30rpx',
          marginTop: '20rpx',
        },
      },
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '忠实粉丝 1226',
            css: {
              fontSize: '30rpx',
              color: '#333',
            },
          },
        ],
        css: {
          marginLeft: '30rpx',
          marginTop: '20rpx',
        },
      },
    ],
  },

};

module.exports.skin = skin;
