import { FaPlusCircle, FaSpinner, FaSearch } from 'react-icons/fa';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RecomendListResponse, createTodo, getRecomendList } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { Todo } from '../pages/Main';
import RecomendList from './RecomendList';
import { AxiosResponse } from 'axios';

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
  const [recomendList, setRecomendList] = useState<string[]>();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadNextPage = async () => {
    try {
      const nextPage = currentPage + 1;
      const recomend: Recomend = (
        (await getRecomendList(inputText, nextPage)) as { data: Recomend }
      ).data;

      if (recomend) {
        const newRecomendList = recomend.result;
        // 기존 데이터에 새로운 페이지의 데이터를 추가하여 업데이트
        setRecomendList((prevList) => {
          if (prevList === undefined) {
            return recomend.result;
          } else {
            return [...prevList, ...newRecomendList];
          }
        });
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load next page:', error);
    }
  };

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const noKoreaRegex = /^[A-Za-z0-9\s]+$/;

      if (inputValue.trim() === '') {
        setRecomendList(undefined);
        setInputText('');
        return;
      }

      if (!noKoreaRegex.test(inputValue)) {
        alert('Please enter only English letters.');
        return;
      }

      setInputText(inputValue);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      const typingTimeout = setTimeout(async () => {
        const recomend: Recomend = (
          (await getRecomendList(inputValue, 2)) as { data: Recomend }
        ).data;

        setRecomendList(recomend.result);
      }, 500);
    },
    [setInputText, setRecomendList]
  );

  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <FaSearch className='input-search' />
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
      <RecomendList
        recomendList={recomendList}
        inputText={inputText}
        setInputText={setInputText}
        setTodos={setTodos}
        loadNextPage={loadNextPage}
      />
    </>
  );
};

export default InputTodo;
