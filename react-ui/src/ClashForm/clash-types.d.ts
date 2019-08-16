declare namespace CLASH {
  interface ISearchClanResponse {
    success: boolean;
    message: string;
    data: {
      items: ISearchClanResult[];
    };
    paging: {
      cursors: object;
    };
  }
  interface ISearchClanItems {
    items?: CLASH.ISearchClanResult[]
  }
  interface ISearchClanResult {
    tag: string;
    name: string;
    type: string;
    location: {
      id: number;
      name: string;
      isCountry: boolean;
      countryCode: string;
    };
    badgeUrls: {
      small: string;
      large: string;
      medium: string;
    };
    clanLevel: number;
    clanPoints: number;
    clanVersusPoints: number;
    requiredTrophies: number;
    warFrequency: string;
    warWinStreak: number;
    warWins: number;
    warTies: number;
    warLosses: number;
    isWarLogPublic: boolean;
    members: number;
  }
}
