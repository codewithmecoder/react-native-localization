import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Localization from 'expo-localization';
import * as RNLocalize from 'react-native-localize';
const STORE_LANGUAGE_KEY = 'user-language';
const LANG_CODES = ['en', 'fr'];
console.log(LANG_CODES);
const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          const findBestAvailableLanguage =
            RNLocalize.findBestAvailableLanguage(LANG_CODES);
          callback(findBestAvailableLanguage?.languageTag || 'fr');
          return;
        } else {
          return callback('fr');
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  // detect: (callback: any) => {
  //   AsyncStorage.getItem(STORE_LANGUAGE_KEY, (err, language) => {
  //     if (err || !language) {
  //       if (err) {
  //         console.log('Error fetching Languages from asyncstorage ', err);
  //       } else {
  //         console.log('No language is set, choosing English as fallback');
  //       }
  //       const findBestAvailableLanguage =
  //         RNLocalize.findBestAvailableLanguage(LANG_CODES);
  //       callback(findBestAvailableLanguage?.languageTag || 'fr');
  //       return;
  //     }
  //     callback(language);
  //   });
  // },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

module.exports = {languageDetectorPlugin};
