import { Recomend } from './InputTodo';
import RecomendItem from './RecomendItem';

type Props = {
  recomendList: Recomend | undefined;
};

export default function RecomendList({ recomendList }: Props) {
  console.log('2', recomendList);

  return (
    <section className='test'>
      <ul>
        {recomendList?.result &&
          recomendList.result.map((recomend) => (
            <RecomendItem key={recomend} recomend={recomend}></RecomendItem>
          ))}
      </ul>
    </section>
  );
}
