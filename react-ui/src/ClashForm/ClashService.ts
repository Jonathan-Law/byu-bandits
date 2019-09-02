import { IPromise } from 'q';

const doFetch = (config: string, def: any) => {
  return fetch(config).then((d) => {
    if (d.ok) {
      return d.json();
    }
    throw new Error(d.statusText);
  });
};

class ClashService {
  private base: string = '/api/clash/';

  public searchClans(query: string): IPromise<{ items: CLASH.ISearchClanResult[] }> {
    const url = `${this.base}clans/search?query=${query ? encodeURIComponent(query) : ''}`;
    return doFetch(url, []).then((resp: CLASH.ISearchClanResponse) => resp.data);
  }
}

export default new ClashService();
