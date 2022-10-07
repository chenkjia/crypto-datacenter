import { Service } from 'egg';
/**
 * Targets Service
 */
export default class Targets extends Service {
  public async index(params: object) {
    return await this.ctx.model.Target.find(params);
  }
  public async create(params) {
    return await this.ctx.model.Target.create(params);
  }
  public async update(id: string, params: object) {
    return await this.ctx.model.Target.updateOne({ _id: id }, params);
  }
  public async destroy(id: string) {
    return await this.ctx.model.Target.deleteOne({ _id: id });
  }
}
