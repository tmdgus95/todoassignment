import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../pages/Main';
import { Recomend } from '../components/InputTodo';

export type RecomendItemProps = {
  recomend?: string;
  recomendList?: Recomend | undefined;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};
