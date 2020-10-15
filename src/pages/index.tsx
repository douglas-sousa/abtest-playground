import React from 'react';
import { useLandingPageData } from '@/hooks';
import { CTA_Button, CTA_Header } from '@/components/CTA';

import '@/assets/pages/index.css';

export default function Home() {
  const { btn_data, header_data } = useLandingPageData({ page: 'index' });

  return (
    <div id="index-page">
      <CTA_Header mode={header_data.mode} className="main-header">
        <div className="main-header__heading">
          <h1>{header_data.children}</h1>
          <h3>Texto fixo aqui</h3>
        </div>
        <div className="main-header__button">
          <CTA_Button mode={btn_data.mode}>{btn_data.children}</CTA_Button>
        </div>
      </CTA_Header>
    </div>
  );
}
