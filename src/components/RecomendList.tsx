import RecomendItem from './RecomendItem';
import { RecomendItemProps } from '../types/RecomendItemProps';

export default function RecomendList({
  recomendList,
  inputText,
  setInputText,
  setTodos,
}: RecomendItemProps) {
  return (
    <section>
      {inputText !== '' && recomendList?.result && (
        <ul className='recomendContainer'>
          {recomendList.result.map((recomend) => (
            <RecomendItem
              key={recomend}
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
