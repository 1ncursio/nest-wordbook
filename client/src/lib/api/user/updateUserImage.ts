import client from '../client';

export default async function updateUserImage(image: FormData) {
  const response = await client.patch('/user/image', image);
  return response.data;
}
