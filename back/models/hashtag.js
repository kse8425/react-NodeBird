module.exports = (sequelize,DataTypes)=>{
  const Comment = sequelize.define('Comment', {
    content:{},

  }, {
    charset: 'uft8mb4',
    collate: 'utf8mb4_general_ci',

  });
  Comment.associate = (db) => {}
  return Comment
}