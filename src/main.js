import count from "./js/count";
import sum from './js/sum';
//想打包解析css,需要loader
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import "./stylus/index.styl";
import './css/iconfont.css'
//eslint配置了不能用var,安装插件这里会飘红，不安装插件编译时才会报错
//这行会在编译器里飘红
// var a=1;
console.log(count(1,2));
console.log(sum(1,2,3,4));