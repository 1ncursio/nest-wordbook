import React, { useCallback, useState, VFC } from 'react';
import Icon from '../Icon';
import StyledModal from '../StyledModal';

const CreateSpaceCardButton: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex flex-col sm:flex-row justify-center items-center rounded-xl shadow transform transition hover:scale-105 hover:shadow-lg bg-white border-3 sm:border sm:h-16 border-cyan-600 border-dashed sm:border-solid"
      >
        <Icon name="plus" className="text-cyan-600 w-16 h-16 sm:w-8 sm:h-8" />
        <span className="text-lg font-bold text-gray-600">새로 만들기</span>
      </button>
      <StyledModal isOpen={isOpen} onRequestClose={closeModal} title="타이틀">
        gd
      </StyledModal>
    </>
  );
};

export default CreateSpaceCardButton;
