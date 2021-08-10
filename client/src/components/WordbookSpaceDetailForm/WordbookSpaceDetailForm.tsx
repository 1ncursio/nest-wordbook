import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const WordbookSpaceDetailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(() => {}, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-y-5"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-medium text-gray-600 cursor-pointer"
        >
          단어장 공간 이름
        </label>
        <input
          type="text"
          {...register('name', { required: true, maxLength: 20 })}
          id="name"
          placeholder="단어장 공간 이름"
          autoComplete="off"
          spellCheck={false}
          className="input-primary"
        />
        {errors.name?.type === 'required' && (
          <p className="text-red-500">단어장 공간 이름은 필수 항목입니다.</p>
        )}
        {errors.name?.type === 'maxLength' && (
          <p className="text-red-500">단어장 공간 이름은 최대 20자입니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="visibility"
          className="font-medium text-gray-600 cursor-pointer"
        >
          공개 여부
        </label>
        <select {...register('visibility')} id="visibility">
          <option value="public">전체 공개</option>
          <option value="limited">일부 공개</option>
          <option value="private">비공개</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="short-bio"
          className="font-medium text-gray-600 cursor-pointer"
        >
          소개
        </label>
        <input
          type="text"
          {...register('shortBio', { maxLength: 255 })}
          id="short-bio"
          placeholder="소개"
          autoComplete="off"
          spellCheck={false}
          className="input-primary"
        />
        {errors.shortBio?.type === 'maxLength' && (
          <p className="text-red-500">소개는 최대 255자입니다.</p>
        )}
      </div>
    </form>
  );
};

export default WordbookSpaceDetailForm;
