import { Recomend } from './InputTodo';
import RecomendItem from './RecomendItem';

type Props = {
  recomendList: Recomend | undefined;
  inputText: string;
};

export default function RecomendList({ recomendList, inputText }: Props) {
  return (
    <section>
      {recomendList?.result && (
        <ul className='recomendContainer'>
          {recomendList.result.map((recomend) => (
            <RecomendItem
              key={recomend}
              recomend={recomend}
              inputText={inputText}
            ></RecomendItem>
          ))}
        </ul>
      )}
    </section>
  );
}
