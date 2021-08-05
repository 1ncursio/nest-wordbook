import React from 'react';
import Icon from '../Icon';

const CreateSpaceCardButton = () => {
  return (
    <>
      <button className="flex flex-col sm:flex-row justify-center items-center rounded-xl shadow transform transition hover:scale-105 hover:shadow-lg bg-white border-3 sm:border sm:h-16 border-cyan-600 border-dashed sm:border-solid">
        <Icon name="plus" className="text-cyan-600 w-16 h-16 sm:w-8 sm:h-8" />
        <span className="text-lg font-bold text-gray-600">새로 만들기</span>
      </button>
    </>
  );
};

export default CreateSpaceCardButton;
