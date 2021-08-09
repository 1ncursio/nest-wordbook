import client from '../client';

export default async function updateSpaceImage(
  wordbookSpaceId: string,
  image: FormData,
) {
  const response = await client.patch(
    `/wordbookspaces/${wordbookSpaceId}/image`,
    image,
  );
  return response.data.payload;
}
