## vue-manage-system

## 基于vue的通用航空综合管理系统

## Project setup

### 项目需要nodejs环境，需要npm或者yarn包管理器

#### 下载nodejs:  https://nodejs.org/zh-cn/download/

```
打开cmd或者git bash，克隆项目
git clone git@github.com:Tinyfatboy/vue-manage-system.git
进入目录
cd ./vue-manage-system
使用npm或者yarn安装依赖
via npm => npm install
via yarn => yarn
```

### 在开发模式运行项目
```
安装完成依赖后，运行命令
via npm => npm run serve
via yarn => yarn serve
运行完成后，打开127.0.0.1:8080或者localhost:8080，查看项目
开发模式配置了webpack的devServer，可以直接访问后台api
```

### 在生产模式运行项目
```
执行命令，生成生产环境下的静态文件
via npm => npm run build
via yarn => yarn build
在项目文件夹中会生成dist文件夹，在生产模式代理dist中的index.html即可访问 (需自行解决跨域问题)
```

#### 注1：此系统是模拟后台登录，登陆后会保存信息到localStorage，保存用户信息一天。一天后用户需要重新登录，模拟token过期的情况
#### 注2：由于接口中的图片资源不存在，项目中的图片全部暂用本地文件代替，后续待接口完善