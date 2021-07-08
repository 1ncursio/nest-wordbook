import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NotMemberGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
