type Props = {
  recomend: string;
};

export default function RecomendItem({ recomend }: Props) {
  return <li>{recomend}</li>;
}
