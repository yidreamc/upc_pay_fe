# upc_pay_fe
石油大学缴费后台对接项目  
后端地址 [upc_pay](https://github.com/yidreamc/upc_pay)
### 项目介绍
该项目和石油大学的财务平台、微信企业号对接，快速创建和管理微信缴费页面，便利师生。   
该项目具有扩展能力，可以创建通用性的缴费，也可以创建特定需要接口回调的缴费，比如需要和锐捷缴费平台进行交互网络缴费。

### 启动项目

#### docker(推荐)
```bash
git clone https://github.com/yidreamc/upc_pay_fe  
cd upc_pay_fe
docker-compose -f docker/docker-compose.yml up
```

#### node
需要提前安装`nodejs`
```
git clone https://github.com/yidreamc/upc_pay_fe  
cd upc_pay_fe
yarn
yarn start
```
### 已完成
- 创建通用缴费界面
- 自定义通用缴费参数
- 权限分层，不同角色对应不同权限
- docker构建
### 待解决
- 维护界面编写
- 维护管理界面编写
- 交网费的系统功能移植及扩展
- 数据分析功能
- 持续集成
- 升级底层库
### 其他问题
如果遇到了其他的问题或错误，请保留出现问题的时间段以及出现问题原因，或者参数，把这些信息给我，我会帮你解决。
联系 qq 710801583


