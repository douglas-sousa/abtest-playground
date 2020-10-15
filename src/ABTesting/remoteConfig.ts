import { initFirebase } from '@/lib/Firebase';
import { CTA_Props } from '@/components/CTA';

const remoteConfig = initFirebase().remoteConfig();

remoteConfig.settings = {
  fetchTimeoutMillis: 60000,
  minimumFetchIntervalMillis: Number(process.env.GATSBY_FIREBASE_CACHE_EXPIRATION)
};

remoteConfig.defaultConfig = {
  index: JSON.stringify({
    btn_data: { mode: 'dark', children: 'Botão padrão do teste AB' } as CTA_Props,
    header_data: { mode: 'light', children: 'Header padrão do teste AB' } as CTA_Props,
  }),
}

export { remoteConfig };

/**
 * A propriedade minimumFetchIntervalMillis serve como um guard para evitar o frontend de chamar o servidor do firebase desnecessariamente.
 * O servidor do firebase tem um quota máxima então é bom deixar o valor default 43200000 (12 horas) quando em produção.
 */