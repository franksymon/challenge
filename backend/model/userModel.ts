import {Model, DataTypes} from 'sequelize';
import {db} from '../util/database';

export interface UserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  usuario: string;
  email: string;
  password: string;
}
export class User extends Model<UserInterface> implements UserInterface {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public usuario!: string;
    public email!: string;
    public password!: string;
}

User.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    usuario:{
      type: DataTypes.STRING(100),
      allowNull: false,   
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
      sequelize: db,
      modelName: 'user', 
  }
);

