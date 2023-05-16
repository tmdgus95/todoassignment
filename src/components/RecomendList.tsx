import RecomendItem from './RecomendItem';
import { RecomendItemProps } from '../types/RecomendItemProps';
import { SyntheticEvent } from 'react';

export default function RecomendList({
  recomendList,
  inputText,
  setInputText,
  setTodos,
  loadNextPage,
}: RecomendItemProps) {
  const handleScroll = (event: SyntheticEvent<HTMLUListElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight === scrollHeight && loadNextPage) {
      loadNextPage();
    }
  };

  return (
    <section>
      {inputText !== '' && recomendList && (
        <ul className='recomendContainer' onScroll={handleScroll}>
          {recomendList.map((recomend, i) => (
            <RecomendItem
              key={i}
              recomend={recomend}
              inputText={inputText}
              setInputText={setInputText}
              setTodos={setTodos}
            ></RecomendItem>
          ))}
        </ul>
      )}
    </section>
  );
}
