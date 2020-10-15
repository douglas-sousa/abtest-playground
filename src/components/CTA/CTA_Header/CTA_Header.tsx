import React from 'react';
import { CTA_Props } from '@/components/CTA';

type Header = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type Props = Header & CTA_Props;

import './style.css';

export default function CTA_Header(props: Props): JSX.Element {
  const { children, mode, ...headerProps } = props;

  return (
    <header {...headerProps} className={`CTA_Header ${mode} ${props.className ? props.className : ''}`}>
      {children}
    </header>
  );
}