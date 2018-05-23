// app.js
import Router from './core/router';
import Request from './core/request';
import Event from './core/event';
import Settings from './utils/settings';
import EventNames from './utils/event-names';

App({
  router: {
    type: Object,
  },
  request: new Request(),
  event: new Event(),
  settings: new Settings(),
  eventNames: new EventNames(),

  Pages: [
    'pages/index/index',
    'pages/xml2can/xml2can',
  ],

  onLaunch: function () {
    this.router = new Router(this.Pages, '');
  },

});

