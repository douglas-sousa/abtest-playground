import React from 'react';
import { CTA_Props } from '@/components/CTA';

type Button = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = Button & CTA_Props;

import './style.css';

export default function CTA_Button(props: Props): JSX.Element {
  const { children: text, mode, ...btnProps } = props;

  return (
    <button {...btnProps} className={`CTA_Button ${mode} ${props.className ? props.className : ''}`}>{text}</button>
  );
}