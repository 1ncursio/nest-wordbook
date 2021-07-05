import bcrypt from 'bcrypt';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entities/user.entity';
import { WordbookSpaceMember } from '../../entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from '../../entities/wordbook-space-role.entity';
import { WordbookSpace } from '../../entities/wordbook-space.entity';
import { Wordbook } from '../../entities/wordbook.entity';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    /* Create a user */
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash('testtest', 9);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: userId,
        email: 'test@naver.com',
        nickname: '황현종',
        enabled: true,
        role: 'default',
        password: hashedPassword,
      })
      .execute();

    /* Create a wordbook space */
    const wordbookSpaceId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpace)
      .values({
        id: wordbookSpaceId,
        OwnerId: userId,
        name: '첫번째 단어장 공간',
        description: '첫번째 단어장 공간입니다!',
        visibility: 'private',
      })
      .execute();

    /* Create a wordbook space's role */
    const roleId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceRole)
      .values({
        id: roleId,
        WordbookSpaceId: wordbookSpaceId,
        name: '관리자',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canInvite: true,
        canKick: true,
      })
      .execute();

    /* Create a wordbook space's member */
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceMember)
      .values({
        MemberId: userId,
        WordbookSpaceId: wordbookSpaceId,
        RoleId: roleId,
      })
      .execute();

    /* Create a wordbook */
    await connection
      .createQueryBuilder()
      .insert()
      .into(Wordbook)
      .values({
        id: uuidv4(),
        name: '첫번째 단어장',
        WordbookSpaceId: wordbookSpaceId,
      })
      .execute();
  }
}
