import { Dispatch, SetStateAction, useEffect } from 'react';
import { Recomend } from './InputTodo';
import RecomendItem from './RecomendItem';
import { Todo } from '../pages/Main';

type Props = {
  recomendList: Recomend | undefined;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function RecomendList({
  recomendList,
  inputText,
  setInputText,
  setTodos,
}: Props) {
  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

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
