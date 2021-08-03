import client from '../client';

export default async function deleteUserImage() {
  const response = await client.delete('/users/image');
  return response.data.payload;
}
