import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { createTodo, getRocomendList } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { Todo } from '../pages/Main';
import RecomendList from './RecomendList';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export type Recomend = {
  limit: number;
  page: number;
  q: string;
  qty: number;
  result: string[];
  total: number;
};

const InputTodo = ({ setTodos }: Props) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const [recomendList, setRecomendList] = useState<Recomend>();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const todo: Todo = ((await createTodo(newItem)) as { data: Todo }).data;

        if (todo) {
          return setTodos((prev) => [...prev, todo]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const englishRegex = /^[A-Za-z]+$/;

    if (!englishRegex.test(inputValue)) {
      alert('Please enter only English letters.');
      return;
    }

    setInputText(inputValue);
    const recomend: Recomend = (
      (await getRocomendList(inputValue, 2)) as { data: Recomend }
    ).data;

    setRecomendList(recomend);
  };

  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <input
          className='input-text'
          placeholder='Add new todo...'
          ref={ref}
          value={inputText}
          onChange={handleChange}
          disabled={isLoading}
        />
        {!isLoading ? (
          <button className='input-submit' type='submit'>
            <FaPlusCircle className='btn-plus' />
          </button>
        ) : (
          <FaSpinner className='spinner' />
        )}
      </form>
      <RecomendList recomendList={recomendList} />
    </>
  );
};

export default InputTodo;
