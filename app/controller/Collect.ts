import { Controller } from 'egg';


export default class TransferController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.collect.start();
  }
}
