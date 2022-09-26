import { Controller } from 'egg';

export default class MarketController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { filter = '{}', select = null, query = '{}' } = ctx.query;
    try {
      ctx.body = {
        code: 0,
        data: await service.index({ filter: JSON.parse(filter), select, query: JSON.parse(query) }),
      };
    } catch (error) {
      ctx.body = error;
    }
  }
  async show() {
    const { ctx, service } = this;
    const { params, query } = ctx;
    try {
      ctx.body = {
        code: 0,
        data: await service.show({
          filter: { _id: params.id },
          ...query,
        }),
      };
    } catch (error) {
      ctx.body = error;
    }
  }
  async create() {
    const { ctx, service } = this;
    const { request } = ctx;
    ctx.body = await service.create(request.body);
  }
  async update() {
    const { ctx, service } = this;
    const { request, params } = ctx;
    ctx.body = await service.update({ _id: params.id }, request.body);
  }
  async destroy() {
    const { ctx, service } = this;
    const { params } = ctx;
    ctx.body = await service.destory({ _id: params.id });
  }
}
