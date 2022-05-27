const path = require('path')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
    //入口
    entry: './src/main.js',
    //出口
    output: {
        //打包到哪里去
        path: path.resolve(__dirname, "dist"),
        //文件名,这里默认指的是js文件的出口，其它的需要自己去配置
        filename: "static/js/main.js",// 将 js 文件输出到 static/js 目录中
        clean: true // 自动将上次打包目录资源清空，这里和webpack4有所不同
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
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        //转为base64的图片要求的最大的大小
                        //优点：减少请求数量   缺点：体积变大
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/imgs/[hash:8][ext][query]",
                }
            },
            {
                //处理字体，音视频等其它资源
                test: /\.(ttf|woff2?|mp4|mp3|avi)$/,
                //这里指原封不动的输出
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:8][ext][query]",
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules代码不编译
                loader: "babel-loader"
                //这里也可以直接写配置，但是写在babel.config.js会更加方便修改
            }
        ]
    },
    //插件
    plugins: [
        //插件的配置
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            //把声明使用eslint写在plugins里，但是需要有eslint的配置，否则还会报错
            //配置文件名是固定的几种形式，一定要写在根目录中
            context: path.resolve(__dirname, "src"),
        }),
    ],
    //模式
    mode: 'development'
}