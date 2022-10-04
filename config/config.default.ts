import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import mongodb from './config.mongodb.json';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664198435735_4150';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 由于只考虑演示，此处关闭csrf防御
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 连接数据库
  config.mongoose = mongodb;
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
