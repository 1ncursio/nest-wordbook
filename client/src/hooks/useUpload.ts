import { ChangeEvent, useCallback } from 'react';
import updateUserImage from '../lib/api/user/updateUserImage';

export default function useUpload() {
  const upload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('image', e.target.files![0]);
    const data = await updateUserImage(formData);
    const imageURL = data.data.image;
  }, []);

  return upload;
}
