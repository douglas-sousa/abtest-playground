import { useState, useEffect } from 'react';
import { remoteConfig } from '@/ABTesting';
import { CTA_Props } from '@/components/CTA';

type LandingPageResponse = {
  btn_data: CTA_Props,
  header_data: CTA_Props,
};

type Props = {
  page: string;
}

export function useLandingPageData({ page }: Props): LandingPageResponse {
  const [landingPageData, setLandingPageDate] = useState<LandingPageResponse>(JSON.parse(remoteConfig.getString(page)));

  useEffect(() => {
    remoteConfig.fetchAndActivate()
      .then((isNewFetch) => {
        console.log(isNewFetch ? 'Novos dados' : 'Dados do cache');
        setLandingPageDate(JSON.parse(remoteConfig.getString(page)))
      })
      .catch((error) => console.log('Erro ao atualizar remote config', error));
  }, []);

  return landingPageData;
}