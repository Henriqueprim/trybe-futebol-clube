export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface IGoals {
  homeGoals: number,
  awayGoals: number,
}

export interface IHome {
  teamName: string,
  homeMatch: IGoals[],
}
