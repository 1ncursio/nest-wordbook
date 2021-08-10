export interface Role {
  id: string;
  name: string;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canInvite: boolean;
  canKick: boolean;
  canGrant: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  WordbookSpaceId: string;
}
