import client from '../client';
import { UserProfileRequestPayload } from '../typings/user/UserProfileRequestPayload';

export default async function updateUserProfile(
  profile: UserProfileRequestPayload,
) {
  const response = await client.patch('/users/profile', profile);
  return response.data.data;
}
