import { useState, useEffect, useCallback } from 'react';
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
  const getData = useCallback((): LandingPageResponse => {
    if(typeof window !== 'undefined') {
      const data = localStorage.getItem('lp-data');
      if (!data) return DUMMY_DATA;
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      if (!(parsedData.timestamp + Number(process.env.GATSBY_FIREBASE_CACHE) > new Date().valueOf())) {
        return DUMMY_DATA;
      }
      delete parsedData.timestamp;
      return parsedData;
    }
    return DUMMY_DATA;
  }, []);

  const storeData = useCallback((json: string): void => {
    if (typeof window !== 'undefined') {
      const parsedData = JSON.parse(json);
      parsedData.timestamp = new Date().valueOf();
      localStorage.setItem('lp-data', JSON.stringify(parsedData));
    }
  }, []);

  const [landingPageData, setLandingPageDate] = useState<LandingPageResponse>(getData());

  useEffect(() => {
    const remoteConfig = initFirebase().remoteConfig();

    remoteConfig.settings = {
      fetchTimeoutMillis: 60000,
      minimumFetchIntervalMillis: Number(process.env.GATSBY_FIREBASE_CACHE),
    };

    console.log(process.env.GATSBY_FIREBASE_CACHE);

    remoteConfig.fetchAndActivate()
      .then((isNewFetch) => {
        console.log(isNewFetch ? 'Novos dados' : 'Dados do cache');
        const data = remoteConfig.getString(page);
        setLandingPageDate(JSON.parse(data));
        storeData(data);
      })
      .catch((error) => console.log('Erro ao atualizar remote config', error));
  }, []);

  return landingPageData;
}