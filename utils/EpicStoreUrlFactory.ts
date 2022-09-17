const DEFAULT_LANG = 'en-US';

export default class EpicStoreUrlFactory {
  urlSlug: string | number | undefined;
  lang: string;
  storeOriginUrl: string;

  constructor(lang = DEFAULT_LANG, urlSlug: string | number | undefined) {
    this.lang = lang;
    this.urlSlug = urlSlug;
    this.storeOriginUrl = 'https://store.epicgames.com/';
  }

  get getStoreUrl() {
    const url = `${this.storeOriginUrl}${this.lang}/p/${this.urlSlug}`;
    return url;
  }
}
