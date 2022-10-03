import { Controller } from 'egg';


export default class TransferController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.transfers.index({});
  }
  public async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.transfers.create(ctx.request.body);
  }
  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.transfers.update(ctx.params.id, ctx.request.body);
  }
  public async destroy() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.transfers.destroy(ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }
  public async info() {
    const { ctx } = this;
    try {
      const state = ctx.state;
      // 响应接口
      ctx.body = {
        code: 0,
        data: state,
      };
    } catch (error) {
      ctx.body = error;
    }
  }
}
