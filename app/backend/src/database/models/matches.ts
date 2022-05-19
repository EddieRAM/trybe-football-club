import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;

  homeTeam!: number;

  homeTeamGoals!: number;

  awayTeam!: number;

  awayTeamGoals!: number;

  inProgress!: boolean;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    home_team: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    home_team_goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    away_team: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    away_team_goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_progress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'awayTeam' });
Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'awayTeam' });

export default Matches;