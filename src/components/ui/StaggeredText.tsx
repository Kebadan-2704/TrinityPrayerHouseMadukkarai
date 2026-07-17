import React from 'react';

type Props = {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean; // kept for backwards compatibility
};

export default function StaggeredText({ text, className = '', el: Wrapper = 'p' }: Props) {
  return (
    <Wrapper className={className}>
      {text}
    </Wrapper>
  );
}
