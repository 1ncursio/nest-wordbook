import { SetMetadata } from '@nestjs/common';

/* export type RequiredWordbookSpaceRole = {
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canInvite?: boolean;
  canKick?: boolean;
  canGrant?: boolean;
}; */

export type RequiredWordbookSpaceRole =
  | 'canCreate'
  | 'canUpdate'
  | 'canDelete'
  | 'canInvite'
  | 'canKick'
  | 'canGrant';

export const WORDBOOK_SPACE_ROLES_KEY = 'role';

export const WordbookSpaceRoleDecorator = (role: RequiredWordbookSpaceRole[]) =>
  SetMetadata(WORDBOOK_SPACE_ROLES_KEY, role);
