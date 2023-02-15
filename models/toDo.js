module.exports = (sequelize, Sequelize) => {
    const toDo = sequelize.define("toDos", {

    id: {
        type: Sequelize.INTEGER
    },

        name: {
        type: Sequelize.STRING
      },

      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createTime: {
        type: Sequelize.TIMESTAMP
      },
      updateTime: {
        type: Sequelize.TIMESTAMP
      }
    });
  
    return toDo;
  };