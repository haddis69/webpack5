//babel是把es高版本编译成浏览器能接受的版本
module.exports = {
    //这个就是智能预设，把es最新版本编译成浏览器能接受的版本
    //除此之外还可以写其他配置项，详情见官网，配置项可以写多个
    presets: ["@babel/preset-env"],
};