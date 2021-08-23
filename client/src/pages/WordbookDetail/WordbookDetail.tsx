import React from 'react';
import { useParams } from 'react-router-dom';
import useWordbookSWR from '../../hooks/swr/useWordbookSWR';

export interface WordbookDetailParams {
  wordbookSpaceId: string;
  wordbookId: string;
}

const WordbookDetail = () => {
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData } = useWordbookSWR(wordbookSpaceId, wordbookId);
  return <div>Yeah</div>;
};

export default WordbookDetail;
