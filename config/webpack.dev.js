const os = require("os");
const path = require('path')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// npx webpack serve --config ./config/webpack.dev.js    运行


module.exports = {
    //入口
    entry: './src/main.js',
    //出口
    output: {
        //打包到哪里去
        path: path.resolve(__dirname, "../dist"),
        //文件名,这里默认指的是js文件的出口，其它的需要自己去配置
        filename: "static/js/main.js",// 将 js 文件输出到 static/js 目录中
        clean: true // 自动将上次打包目录资源清空，这里和webpack4有所不同
    },
    //加载器
    module: {
        rules: [
            {
                //加上oneOf后只匹配一个
                oneOf: [
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
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    }
                ]
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
            context: path.resolve(__dirname, "../src"),
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        })
    ],
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    },
    //模式
    mode: 'development',
    //优点：打包编译速度快，只包含行映射
    //缺点：没有列映射
    //开发模式代码符合规范，不压缩，不必非要关心列
    devtool: "cheap-module-source-map"
}