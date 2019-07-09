import knex from './index';

export interface Repository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  find(criteria: {}): Promise<T[]>;
  findOne(criteria: {}): Promise<T>;
  getTableName(): string;
  getFields(): string[] | [] | string;
}

export abstract class BaseRepository<T> implements Repository<T> {
  public async create(item: T, fields = this.getFields()): Promise<T> {
    try {
      const result = await knex
        .insert(item)
        .into(this.getTableName())
        .returning(fields);
      return result[0];
    } catch (err) {
      throw new Error(`Unable to create item in ${this.getTableName()}:\n${err}`);
    }
  }

  public async update(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.' + id + item);
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.' + id);
  }

  public async find(criteria: {}): Promise<T[]> {
    return knex
      .from(this.getTableName())
      .select('*')
      .where(criteria);
  }

  public async findOne(criteria: {}): Promise<T> {
    const result = await knex.from(this.getTableName()).where(criteria);

    const results = result.length;

    if (results === 1) {
      return result[0];
    } else {
      // TODO: Enhance this more
      throw new Error('More than 1 or 0 records found');
    }
  }

  public abstract getTableName(): string;

  public abstract getFields(): string[] | [] | string;
}
