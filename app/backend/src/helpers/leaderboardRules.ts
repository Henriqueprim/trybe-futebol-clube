import { IGoals, IMatch, ILeaderboard } from '../interfaces/leaderboardInterface';

const totalPoints = (data: IGoals[]) => {
  let initialPoints = 0;
  data.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) initialPoints += 3;
    if (match.homeTeamGoals === match.awayTeamGoals) initialPoints += 1;
  });
  return initialPoints;
};

const totalVictories = (data: IGoals[]) => {
  let victories = 0;
  data.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
  });
  return victories;
};

const totalDraws = (data: IGoals[]) => {
  let draws = 0;
  data.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
  });
  return draws;
};

const totalLosses = (data: IGoals[]) => {
  let losses = 0;
  data.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
  });
  return losses;
};

const goalsFavor = (data: IGoals[]) => {
  let goals = 0;
  data.forEach((match) => {
    goals += match.homeTeamGoals;
  });
  return goals;
};

const goalsOwn = (data: IGoals[]) => {
  let goals = 0;
  data.forEach((match) => {
    goals += match.awayTeamGoals;
  });
  return goals;
};

const efficiency = (data: IGoals[]) => {
  const allMatches = data.length;
  const allPoints = totalPoints(data);
  const efficiencySum = ((allPoints / (allMatches * 3)) * 100).toFixed(2);
  return efficiencySum;
};

const SortingTeams = (data: ILeaderboard[]) => {
  const sorted = data.sort((a, b) =>
    b.totalPoints - a.totalPoints
  || (b.goalsFavor - b.goalsOwn) - (a.goalsFavor - a.goalsOwn)
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);
  return sorted;
};

const homeMatches = (data: IMatch[]) => {
  const performance = data.map((team) => ({
    name: team.teamName,
    totalPoints: totalPoints(team.homeMatch),
    totalGames: team.homeMatch.length,
    totalVictories: totalVictories(team.homeMatch),
    totalDraws: totalDraws(team.homeMatch),
    totalLosses: totalLosses(team.homeMatch),
    goalsFavor: goalsFavor(team.homeMatch),
    goalsOwn: goalsOwn(team.homeMatch),
    goalsBalance: goalsFavor(team.homeMatch) - goalsOwn(team.homeMatch),
    efficiency: efficiency(team.homeMatch),
  })) as unknown as ILeaderboard[];
  return SortingTeams(performance);
};

export default homeMatches;
