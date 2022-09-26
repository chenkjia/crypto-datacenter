import { Application } from 'egg';
import { markets } from './config';
export default (app: Application) => {
  const { controller, router } = app;
  markets.forEach(({ name }) => {
    router.resources(name, `/api/${name}`, controller[name]);
  });
};
