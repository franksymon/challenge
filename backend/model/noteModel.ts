import {Model, DataTypes} from 'sequelize';
import {db} from '../util/database';

export interface NoteInterface {
    id?: number;
    title: string;
    body: string;
    date: string;
}

export class Note extends Model<NoteInterface> implements NoteInterface {
    public id!: number;
    public title!: string;
    public body!: string;
    public date!: string;
}

Note.init(
    {   id: {
            type: new DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'note',
    }
)