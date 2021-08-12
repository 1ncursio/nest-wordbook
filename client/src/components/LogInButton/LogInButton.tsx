import React, { useCallback } from 'react';
import { undrawWelcome } from '../../assets/images';
import useBoolean from '../../hooks/useBoolean';
import IconButton from '../IconTextButton/IconTextButton';
import StyledModal from '../StyledModal';

const LogInButton = () => {
  const [isOpen, openModal, closeModal] = useBoolean(false);

  const auth = useCallback(
    (name: string) => () => {
      window.location.href = `http://localhost:3095/auth/${name}`;
    },
    [],
  );

  return (
    <>
      <button onClick={openModal}>로그인</button>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        onRequestOk={closeModal}
        width="639px"
        title="간편 로그인"
      >
        <div className="flex justify-around items-center">
          <IconButton icon="google" onClick={auth('google')} />
          <IconButton
            icon="github"
            onClick={auth('github')}
            className="bg-github"
          />
          <IconButton
            icon="kakao"
            onClick={auth('kakao')}
            className="bg-kakao"
          />
        </div>
        <img src={undrawWelcome} alt="login" className="w-2/3 mx-auto" />
      </StyledModal>
    </>
  );
};

export default LogInButton;
