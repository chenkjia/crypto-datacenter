import { Application } from 'egg';
// import { markets } from './config';
export default (app: Application) => {
  const { controller, router } = app;
  router.resources('transfer', '/api/transfer', controller.transfer);
  router.resources('target', '/api/target', controller.target);
  router.get('/api/collect', controller.collect.index);
  // markets.forEach(({ name }) => {
  //   router.resources(name, `/api/${name}`, controller[name]);
  // });
};
