import { useState, useEffect } from 'react';
import { initFirebase } from '@/lib/Firebase';
import { CTA_Props } from '@/components/CTA';

type LandingPageResponse = {
  btn_data: CTA_Props,
  header_data: CTA_Props,
};

type Props = {
  page: string;
}

const DUMMY_DATA: LandingPageResponse = {
  btn_data: { mode: 'dark', children: '' },
  header_data: { mode: 'light', children: '' }
}

export function useLandingPageData({ page }: Props): LandingPageResponse {
  const [landingPageData, setLandingPageDate] = useState<LandingPageResponse>(DUMMY_DATA);

  useEffect(() => {
    const remoteConfig = initFirebase().remoteConfig();

    remoteConfig.settings = {
      fetchTimeoutMillis: 60000,
      minimumFetchIntervalMillis: Number(process.env.GATSBY_FIREBASE_CACHE_EXPIRATION)
    };

    remoteConfig.fetchAndActivate()
      .then((isNewFetch) => {
        console.log(isNewFetch ? 'Novos dados' : 'Dados do cache');
        setLandingPageDate(JSON.parse(remoteConfig.getString(page)))
      })
      .catch((error) => console.log('Erro ao atualizar remote config', error));
  }, []);

  return landingPageData;
}