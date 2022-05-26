const path = require('path')
module.exports = {
    //入口
    entry: './src/main.js',
    //出口
    output: {
        //打包到哪里去
        path: path.resolve(__dirname, "dist"),
        //文件名
        filename: "main.js"
    },
    //加载器
    module: {
        rules: [
            //loader配置
            {
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                //css-loader:将css文件引入到commonJs中
                //style-loader：将css文件创建style标签插入到页面中
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                //loader只能写一个，但use可以写多个
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"],
            }
        ]
    },
    //插件
    plugins: [
        //插件的配置
    ],
    //模式
    mode: 'development'
}