module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        name: {
        type: Sequelize.STRING
      },

      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createTime: {
        type: Sequelize.DATETIME
      },
      updateTime: {
        type: Sequelize.DATETIME
      }
    });
  
    return User;
  };