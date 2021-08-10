import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entities/user.entity';
import { WordbookSpaceMember } from '../../entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from '../../entities/wordbook-space-role.entity';
import { WordbookSpace } from '../../entities/wordbook-space.entity';

export class InsertWordbookSpaces implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: 'Yechan Kim' })
      .getOne();

    if (!user) return;

    const spaceId1 = uuidv4();
    const spaceId2 = uuidv4();
    const spaceId3 = uuidv4();
    const spaceId4 = uuidv4();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpace)
      .values([
        {
          id: spaceId1,
          OwnerId: user.id,
          name: 'N1 단어장 공간',
          shortBio: 'N1 단어 모음',
          visibility: 'public',
        },
        {
          id: spaceId2,
          OwnerId: user.id,
          name: 'N2 단어장 공간',
          shortBio: 'N2 단어 모음',
          visibility: 'public',
        },
        {
          id: spaceId3,
          OwnerId: user.id,
          name: 'N3 단어장 공간',
          shortBio: 'N3 단어 모음',
          visibility: 'limited',
        },
        {
          id: spaceId4,
          OwnerId: user.id,
          name: 'N4 단어장 공간',
          shortBio: 'N4 단어 모음',
          visibility: 'private',
        },
      ])
      .execute();

    const adminRoleId1 = uuidv4();
    const normalRoleId1 = uuidv4();
    const adminRoleId2 = uuidv4();
    const normalRoleId2 = uuidv4();
    const adminRoleId3 = uuidv4();
    const normalRoleId3 = uuidv4();
    const adminRoleId4 = uuidv4();
    const normalRoleId4 = uuidv4();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceRole)
      .values([
        {
          id: adminRoleId1,
          WordbookSpaceId: spaceId1,
          name: '관리자',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: true,
          canKick: true,
          canGrant: true,
        },
        {
          id: normalRoleId1,
          WordbookSpaceId: spaceId1,
          name: '일반 멤버',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: false,
          canKick: false,
          canGrant: false,
        },
        {
          id: adminRoleId2,
          WordbookSpaceId: spaceId2,
          name: '관리자',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: true,
          canKick: true,
          canGrant: true,
        },
        {
          id: normalRoleId2,
          WordbookSpaceId: spaceId2,
          name: '일반 멤버',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: false,
          canKick: false,
          canGrant: false,
        },
        {
          id: adminRoleId3,
          WordbookSpaceId: spaceId3,
          name: '관리자',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: true,
          canKick: true,
          canGrant: true,
        },
        {
          id: normalRoleId3,
          WordbookSpaceId: spaceId3,
          name: '일반 멤버',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: false,
          canKick: false,
          canGrant: false,
        },
        {
          id: adminRoleId4,
          WordbookSpaceId: spaceId4,
          name: '관리자',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: true,
          canKick: true,
          canGrant: true,
        },
        {
          id: normalRoleId4,
          WordbookSpaceId: spaceId4,
          name: '일반 멤버',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: false,
          canKick: false,
          canGrant: false,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceMember)
      .values([
        {
          MemberId: user.id,
          WordbookSpaceId: spaceId1,
          RoleId: adminRoleId1,
        },
        {
          MemberId: user.id,
          WordbookSpaceId: spaceId2,
          RoleId: adminRoleId2,
        },
        {
          MemberId: user.id,
          WordbookSpaceId: spaceId3,
          RoleId: adminRoleId3,
        },
        {
          MemberId: user.id,
          WordbookSpaceId: spaceId4,
          RoleId: adminRoleId4,
        },
      ])
      .execute();
  }
}
