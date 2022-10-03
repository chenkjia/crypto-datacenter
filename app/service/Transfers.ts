import { Service } from 'egg';
/**
 * Transfers Service
 */
export default class Transfers extends Service {
  public async index(params: object) {
    return await this.ctx.model.Transfer.find(params);
  }
  public async create(params) {
    return await this.ctx.model.Transfer.create(params);
  }
  public async update(id:string, params: object) {
    return await this.ctx.model.Transfer.updateOne({ _id: id }, params);
  }
  public async destroy(id:string) {
    return await this.ctx.model.Transfer.deleteOne({ _id: id });
  }
}
