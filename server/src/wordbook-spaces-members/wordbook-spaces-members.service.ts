import { Injectable } from '@nestjs/common';
import { CreateWordbookSpacesMemberDto } from './dto/create-wordbook-spaces-member.dto';
import { UpdateWordbookSpacesMemberDto } from './dto/update-wordbook-spaces-member.dto';

@Injectable()
export class WordbookSpacesMembersService {
  create(createWordbookSpacesMemberDto: CreateWordbookSpacesMemberDto) {
    return 'This action adds a new wordbookSpacesMember';
  }

  findAll() {
    return `This action returns all wordbookSpacesMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordbookSpacesMember`;
  }

  update(id: number, updateWordbookSpacesMemberDto: UpdateWordbookSpacesMemberDto) {
    return `This action updates a #${id} wordbookSpacesMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordbookSpacesMember`;
  }
}
