module.exports = class Record {
/**
 * 
 * @param {Number} id 
 * @param {String} concept 
 * @param {Number} amount
 * @param {String} type 
 * @param {String} category 
 * @param {Date} date 
 */

    constructor(
      id,
      concept,
      amount,
      type,
      category,
      date,
      createdAt, 
      updatedAt,
      deletedAt,
    ) {
      this.id = id;
      this.concept = concept;
      this.amount = amount;
      this.type = type;
      this.category = category;
      this.date = date;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  
  };
  
