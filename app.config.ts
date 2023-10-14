import {ExpoConfig} from '@expo/config';
// import * as dotenv from 'dotenv';

const appVariant = process.env.APP_VARIANT ?? 'dev';

// dotenv.config({
//   path: `.env.${appVariant}`,
//   debug: true,
// });

// Automatically select build flavor based on build profile
const bundleIdByProfile: Record<string, string> = {
  dev: 'com.kml.yay.app.dev',
  prod: 'com.kml.yay.app',
};

const bundleId = bundleIdByProfile[appVariant];

const getConfig = ({config}: {config: ExpoConfig}): ExpoConfig => {
  return {
    ...config,
    // icon: `./icon${appVariant !== 'production' ? `-${appVariant}` : ''}.png`,
    name: `YAY${appVariant !== 'production' ? `-${appVariant}` : ''}`,
    extra: {
      ...config.extra,
      APP_VARIANT: appVariant,
    },
    ios: {
      ...config.ios,
      bundleIdentifier: bundleId,
      googleServicesFile: process.env.FIREBASE_IOS_CONFIG_PROD,
    },
    android: {
      ...config.android,
      package: bundleId,
      googleServicesFile: process.env.FIREBASE_ANDROID_CONFIG_PROD,
    },
  };
};

export default getConfig;
