const skin = {
  name: 'frozen-flame',
  id: '002',
  lastModified: '20180528',
  background: '#fff',
  viewContainer: {
    type: 'viewGroup',
    css: {
      padding: '20rpx',
      marginTop: '30rpx',
    },
    views: [
      {
        type: 'viewGroup',
        views: [
          {
            type: 'text',
            text: '梁晋荣',
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
