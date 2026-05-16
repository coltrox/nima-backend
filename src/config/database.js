import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './nima_local.sqlite', // O banco será esse arquivo na sua raiz
  logging: false,
});

export default sequelize;