import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button';
import useProfileSWR from '../../hooks/swr/useProfileSWR';

const WordbookSpace = () => {
  const { data: userData } = useProfileSWR();

  return (
    <div>
      <Button text="새 단어장 공간 추가" className="btn-white" />
    </div>
  );
};

export default WordbookSpace;
