import produce from 'immer';
import React, { useCallback, VFC } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import useWordbookSWRImmutable from '../../hooks/swr/useWordbookSWRImmutable';
import { WordbookDetail } from '../../lib/api/typings/wordbook';
import deleteWord from '../../lib/api/word/deleteWord';
import reorderWord from '../../lib/api/word/reorderWord';
import IconButton from '../IconTextButton/IconTextButton';
import WordItem from '../WordItem';

export interface WordbookDetailParams {
  wordbookSpaceId: string;
  wordbookId: string;
}

const WordList: VFC = () => {
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData, mutate: mutateWordbook } =
    useWordbookSWRImmutable(wordbookSpaceId, wordbookId);

  const onDeleteWord = useCallback(
    (wordId: string) => async () => {
      if (!wordbookData) return;

      await deleteWord(wordbookSpaceId, wordbookId, wordbookData, wordId);
    },
    [wordbookData],
  );

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!wordbookData) return;
      if (!result.destination) return;
      if (result.destination.index === result.source.index) return;

      const destinationIndex = result.destination.index;
      const sourceIndex = result.source.index;

      try {
        // TODO: reorderWord
        // await reorder(source word's id, destination index)
        const [sourceWord] = wordbookData.Words.filter(
          (_, i) => i === sourceIndex,
        );

        mutateWordbook(
          produce((wordbook: WordbookDetail) => {
            // TODO: WordbookDetail 페이지와 인터페이스 명이 겹침. 변경해야 됨

            const [removed] = wordbook.Words.splice(sourceIndex, 1);
            wordbook.Words.splice(destinationIndex, 0, removed);

            return wordbook;
          }, wordbookData),
          false,
        );
        // return;
        await reorderWord(
          wordbookSpaceId,
          wordbookId,
          { rank: destinationIndex },
          sourceWord.id,
        );
      } catch (error) {
        console.error(error);
      }
    },
    [wordbookData],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
            }}
          >
            {React.Children.toArray(
              wordbookData?.Words.map((word, index) => (
                <Draggable draggableId={word.id} key={word.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-4 mb-2"
                    >
                      <WordItem word={word} />
                      {/* <button type="button">삭제</button> */}
                      <IconButton
                        icon="remove"
                        onClick={onDeleteWord(word.id)}
                        className="w-12 h-12 border-0"
                      />
                    </div>
                  )}
                </Draggable>
              )),
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default WordList;
