import tpl from './info.tpl'

const oApp = document.querySelector('#app');

const info = {
  name: 'kyz',
  age: 24,
  career: 'web',
  hobby: '游戏，音乐'
};

oApp.innerHTML = tpl(info)