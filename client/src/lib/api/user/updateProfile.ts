import client from '../client';
import { UserProfileRequestPayload } from '../typings/user/UserProfileRequestPayload';

export default async function updateProfile(
  profile: UserProfileRequestPayload,
) {
  const response = await client.patch('/user/profile', profile);
  return response.data;
}
