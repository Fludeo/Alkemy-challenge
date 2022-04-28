module.exports = function SetDataAssociations(container) {

    /**
     * @type {import('../module/record/module')} record
     * @type {import('../module/user/module')} user
     */

    const record = container.get('RecordModel');
    const user = container.get('UserModel');
    record.belongsTo(user);
    user.hasMany(record);
  };