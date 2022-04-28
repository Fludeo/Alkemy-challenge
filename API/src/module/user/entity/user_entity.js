module.exports = class User {
    /**
     * @param {number} id
     * @param {string} name
     * @param {string} email
     * @param {string} hash
     * @param {string} createdAt
     * @param {string} updatedAt
     * @param {string} deletedAt
      * @param {import('../../record/entity/Record')[]} records
     */
    constructor(
      id,
      name,
      email,
      hash,
      createdAt,
      updatedAt,
      deletedAt,
      records,
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.hash = hash;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
      this.records = records;
    }
  
  };
  