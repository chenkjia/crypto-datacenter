import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  // egg-mongoose插件配置
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};

export default plugin;
