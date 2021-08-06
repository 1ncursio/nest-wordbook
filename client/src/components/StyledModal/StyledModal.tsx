import { css, Global } from '@emotion/react';
import React, { FC } from 'react';
import Modal from 'react-modal';
import tw from 'twin.macro';

Modal.setAppElement('#root');

export type StyledModalProps = {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const StyledModal: FC<StyledModalProps> = ({
  children,
  title,
  isOpen,
  onRequestClose,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={{
          afterOpen: 'overlay-after',
          base: 'overlay-base',
          beforeClose: 'overlay-before',
        }}
        className={{
          afterOpen: 'content-after',
          base: 'content-base',
          beforeClose: 'content-before',
        }}
        contentLabel="Modal"
      >
        {/* p, m, text-2xl 등 몇몇 클래스가 적용이 안됨. */}
        {title && <h3 className="text-xl font-bold">{title}</h3>}
        <p className="p-12">{children}</p>
      </Modal>
      <Global styles={modalStyle} />
    </>
  );
};

const modalStyle = css`
  .overlay-base {
    ${tw`fixed inset-0 transition duration-300 flex justify-center items-center backdrop-filter backdrop-blur-sm`}
  }

  .overlay-after {
    ${tw`bg-gray-700 bg-opacity-60 transform`}
  }

  .overlay-before {
  }

  .content-base {
    ${tw`rounded-lg shadow transition ease-out-back duration-300 transform translate-y-full scale-50`}
  }

  .content-after {
    ${tw`bg-white  min-w-[24rem] min-h-[12rem] p-8 transform translate-y-0 scale-100`}
  }

  .content-before {
  }
`;

export default StyledModal;
