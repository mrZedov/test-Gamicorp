import { MikroORM } from '@mikro-orm/core';
import { EntityManager, MongoDriver } from '@mikro-orm/mongodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchQueryParser } from '../../shared/controllers';
import { UsersQueryDto } from '../dto/users-query.dto';
import { UsersSearchResult, UsersSearchResultDto } from '../dto/users-search.result.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersSearchService {
  constructor(private readonly orm: MikroORM<MongoDriver>) {}

  public async query(query: UsersQueryDto): Promise<UsersSearchResultDto> {
    if (!query.sortBy) query.sortBy = 'id';
    const em = (this.orm.em as EntityManager).fork();
    const queryParser = new SearchQueryParser();
    const { where, options } = queryParser.parse(query, {
      constraints: {
        login: { type: 'string', condition: 'startWith' },
        email: { type: 'string', condition: 'startWith' },
        _id: { orderOnly: true },
      },
    });
    where.deleted = false;
    try {
      const repo = em.getRepository<Users>('Users');
      const records = await repo.find(where, options);
      const resultRecords = records.map<UsersSearchResult>((rec: Users): UsersSearchResult => {
        return {
          id: rec._id,
          login: rec.login,
          email: rec.email,
        };
      });
      const res = await repo.aggregate([{ $match: where }, { $group: { _id: null, n: { $sum: 1 } } }]);
      const count = (res.shift() || { n: 0 }).n;
      return {
        page: query.page,
        itemsPerPage: query.itemsPerPage,
        pages: Math.ceil(count / options.limit),
        records: resultRecords,
      };
    } catch (e) {
      throw new InternalServerErrorException(2, 'Database error');
    }
  }
}
