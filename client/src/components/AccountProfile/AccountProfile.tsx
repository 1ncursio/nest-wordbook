import React, { useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { userThumbnail } from '../../assets/images';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import client from '../../lib/api/client';
import { UserProfileRequestPayload } from '../../lib/api/typings/user/UserProfileRequestPayload';
import updateUserImage from '../../lib/api/user/updateUserImage';
import updateUserProfile from '../../lib/api/user/updateUserProfile';
import optimizeImage from '../../lib/optimizeImage';
import Button from '../Button';

const AccountProfile = () => {
  const { data: userData, mutate: mutateUser } = useProfileSWR();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserProfileRequestPayload>();
  const uploadRef = useRef<HTMLInputElement>(null);

  const disabled =
    watch('username') === userData?.username &&
    watch('shortBio') === userData?.shortBio;

  useEffect(() => {
    reset({
      username: userData?.username ?? '',
      shortBio: userData?.shortBio ?? null,
    });
  }, [userData]);

  const onClickUpload = useCallback(() => {
    uploadRef?.current?.click();
  }, [uploadRef]);

  const onUpload = useCallback(
    async (e) => {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const data = await updateUserImage(formData);
      mutateUser(
        {
          ...userData!,
          image: data.image,
        },
        false,
      );
    },
    [userData],
  );

  const onClearThumbnail = useCallback(() => {
    // upload handler
  }, []);

  const onSubmitProfile = useCallback(
    async ({ username, shortBio }: UserProfileRequestPayload) => {
      const data = await updateUserProfile({ username, shortBio });
      mutateUser(
        {
          ...userData!,
          username: data.username,
          shortBio: data.shortBio,
        },
        false,
      );
    },
    [userData],
  );
  // const onSubmitProfile = useCallback(
  //   async ({ username, shortBio }: UserProfileRequestPayload) => {
  //     console.log({ username, shortBio });
  //   },
  //   [],
  // );

  return (
    <>
      <Helmet>
        <title>프로필 설정 - Nest Wordbook</title>
      </Helmet>
      <h2 className="text-gray-800 font-bold text-3xl mb-6">내 프로필 설정</h2>
      <div className="flex md:flex-col">
        <div className="flex justify-center items-center md:inline-flex flex-col md:pr-0 pr-6">
          <span className="font-medium text-gray-600 mb-2 cursor-default">
            프로필 사진
          </span>
          <img
            src={optimizeImage(userData?.image ?? userThumbnail)}
            alt="profile"
            className="rounded-full w-48 h-48 mb-4 object-cover"
          />
          <input type="file" hidden ref={uploadRef} onChange={onUpload} />
          <Button
            onClick={onClickUpload}
            text="이미지 변경"
            className="btn-cyan w-40 mb-2"
          />
          <Button
            onClick={onClearThumbnail}
            text="이미지 삭제"
            className="btn-white w-40"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmitProfile)}
          className="md:pl-0 pl-6 flex-1 flex flex-col gap-y-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="font-medium text-gray-600 cursor-pointer"
            >
              닉네임
            </label>
            <input
              type="text"
              {...register('username', { required: true, maxLength: 20 })}
              id="username"
              placeholder="닉네임"
              autoComplete="off"
              spellCheck={false}
              className="input-primary"
            />
            {errors.username?.type === 'required' && (
              <p className="text-red-500">닉네임은 필수 항목입니다.</p>
            )}
            {errors.username?.type === 'maxLength' && (
              <p className="text-red-500">닉네임은 최대 20자입니다.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="short-bio"
              className="font-medium text-gray-600 cursor-pointer"
            >
              한 줄 소개
            </label>
            <input
              type="text"
              {...register('shortBio', { maxLength: 255 })}
              id="short-bio"
              placeholder="한 줄 소개"
              autoComplete="off"
              spellCheck={false}
              className="input-primary"
            />
            {errors.shortBio?.type === 'maxLength' && (
              <p className="text-red-500">한 줄 소개는 최대 255자입니다.</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              text="저장"
              disabled={disabled}
              className="btn-cyan w-32 disabled:bg-gray-300 disabled: disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountProfile;
