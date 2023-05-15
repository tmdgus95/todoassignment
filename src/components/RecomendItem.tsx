import { useState } from 'react';

type Props = {
  recomend: string;
  inputText: string;
};

const RecomendItem = ({ recomend, inputText }: Props) => {
  const highlightedRecomend = getHighlightedText(recomend, inputText);

  return <li className='recomend'>{highlightedRecomend}</li>;
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
