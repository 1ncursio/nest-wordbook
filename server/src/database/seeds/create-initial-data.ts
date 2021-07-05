import bcrypt from 'bcrypt';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { PartOfSpeech } from '../../entities/part-of-speech.entity';
import { User } from '../../entities/user.entity';
import { WordPartOfSpeech } from '../../entities/word-part-of-speech.entity';
import { WordSense } from '../../entities/word-sense.entity';
import { Word } from '../../entities/word.entity';
import { WordbookSpaceMember } from '../../entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from '../../entities/wordbook-space-role.entity';
import { WordbookSpace } from '../../entities/wordbook-space.entity';
import { Wordbook } from '../../entities/wordbook.entity';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    /* Create new user */
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash('testtest', 9);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: userId,
          email: 'test@naver.com',
          nickname: '황현종',
          enabled: true,
          role: 'default',
          password: hashedPassword,
        },
      ])
      .execute();

    /* Create new wordbook space */
    const wordbookSpaceId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpace)
      .values([
        {
          id: wordbookSpaceId,
          OwnerId: userId,
          name: '첫번째 단어장 공간',
          description: '첫번째 단어장 공간입니다!',
          visibility: 'private',
        },
      ])
      .execute();

    /* Create new admin & normal roles in wordbook space's role table */
    const roleId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceRole)
      .values([
        {
          id: roleId,
          WordbookSpaceId: wordbookSpaceId,
          name: '관리자',
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canInvite: true,
          canKick: true,
          canGrant: true,
        },
        {
          id: uuidv4(),
          WordbookSpaceId: wordbookSpaceId,
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

    /* Create new wordbook space's member */
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordbookSpaceMember)
      .values([
        {
          MemberId: userId,
          WordbookSpaceId: wordbookSpaceId,
          RoleId: roleId,
        },
      ])
      .execute();

    /* Create new wordbook */
    const wordbookId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Wordbook)
      .values([
        {
          id: wordbookId,
          name: '첫번째 단어장',
          WordbookSpaceId: wordbookSpaceId,
        },
      ])
      .execute();

    /* Create new words */
    const wordId1 = uuidv4();
    const wordId2 = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Word)
      .values([
        {
          id: wordId1,
          WordbookId: wordbookId,
          kanji: '貧富',
          hiragana: 'ひんぷ',
          katakana: 'ヒンプ',
          level: 1,
        },
        {
          id: wordId2,
          WordbookId: wordbookId,
          kanji: '残酷極まりない',
          hiragana: 'ざんこくきわまりない',
          katakana: 'ザンコクキワマリナイ',
          level: 1,
        },
      ])
      .execute();

    /* Create new words's senses */
    await connection
      .createQueryBuilder()
      .insert()
      .into(WordSense)
      .values([
        { id: uuidv4(), WordId: wordId1, definition: '빈부' },
        { id: uuidv4(), WordId: wordId2, definition: '잔혹하기 짝이 없다' },
        { id: uuidv4(), WordId: wordId2, definition: '더할 수 없이 잔혹하다' },
      ])
      .execute();

    /* Create new parts of speech */
    const nounId = uuidv4();
    const adjectiveId = uuidv4();
    await connection
      .createQueryBuilder()
      .insert()
      .into(PartOfSpeech)
      .values([
        {
          id: nounId,
          name: '명사',
        },
        {
          id: adjectiveId,
          name: '형용사',
        },
        {
          id: uuidv4(),
          name: '동사',
        },
        {
          id: uuidv4(),
          name: '형용동사',
        },
        {
          id: uuidv4(),
          name: '부사',
        },
        {
          id: uuidv4(),
          name: '연체사',
        },
        {
          id: uuidv4(),
          name: '접속사',
        },
        {
          id: uuidv4(),
          name: '감동사',
        },
        {
          id: uuidv4(),
          name: '조동사',
        },
        {
          id: uuidv4(),
          name: '조사',
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WordPartOfSpeech)
      .values([
        {
          WordId: wordId1,
          PartOfSpeechId: nounId,
        },
        {
          WordId: wordId2,
          PartOfSpeechId: adjectiveId,
        },
        {
          WordId: wordId2,
          PartOfSpeechId: nounId,
        },
      ])
      .execute();
  }
}
