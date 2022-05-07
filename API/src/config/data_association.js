module.exports = function SetDataAssociations(container) {

    /**
     * @type {import('../module/record/module').RecordModel} record
     * @type {import('../module/user/module').UserModel} user
     * @type {import('../module/auth/module').AuthModel} token
     */
    const token = container.get ('AuthModel')
    const record = container.get('RecordModel');
    const user = container.get('UserModel');
    record.belongsTo(user,{foreignKey: 'user_id'});
    user.hasMany(record ,{as:'records', foreignKey: 'user_id'});
    token.belongsTo(user ,{foreignKey: 'user_id'});
    user.hasMany(token ,{foreignKey: 'user_id'})
  };

