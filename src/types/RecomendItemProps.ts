import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../pages/Main';

export type RecomendItemProps = {
  recomend?: string;
  recomendList?: string[];
  loadNextPage?: () => Promise<void>;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};
