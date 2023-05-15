import { Dispatch, SetStateAction } from 'react';
import { createTodo } from '../api/todo';
import { Todo } from '../pages/Main';

type Props = {
  recomend: string;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const RecomendItem = ({
  recomend,
  inputText,
  setInputText,
  setTodos,
}: Props) => {
  const highlightedRecomend = getHighlightedText(recomend, inputText);

  const handleClick = async (e: React.MouseEvent<HTMLLIElement>) => {
    const text = e.currentTarget.textContent;
    if (text !== null) {
      const todo: Todo = ((await createTodo({ title: text })) as { data: Todo })
        .data;
      setInputText((prev) => '');
      setTodos((prev) => [...prev, todo]);
    }
  };

  return (
    <li onClick={handleClick} className='recomend'>
      {highlightedRecomend}
    </li>
  );
};

export default RecomendItem;

const getHighlightedText = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} style={{ color: '#2BC9BA' }}>
          {part}
        </span>
      );
    } else {
      return part;
    }
  });
};
