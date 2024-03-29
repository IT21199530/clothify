const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClothesSchema = new Schema({

  ClothID: {
    type: String,
    unique: true,
  },
  Username: {
    type: String,
    require: true
  },
  ClothName:{
    type: String,
    require: true
  },
  ClothImage :{
    type: String,
    require: true
},
   WearType :{
    type: String,
    require: true
   },
   Casualty : {
    type: String,
    require: true
},
})

// Middleware to generate UserID before saving the document
ClothesSchema.pre('save', async function (next) {
  try {
      if (!this.isNew) {
          // If the document is not new, do not generate a new ID
          return next();
      }

      // Find the highest FloorID
      const highestCloth = await this.constructor.findOne({}, {}, { sort: { ClothID: -1 } });

      let lastID = 1;
      if (highestCloth) {
          // Extract the number part of the highest FloorID and increment it
          lastID = parseInt(highestCloth.ClothID.split('_')[1]) + 1;
      }

      // Create the new FloorID by combining the prefix and the incremented number
      this.ClothID = `cloth_${lastID}`;

      next();
  } catch (error) {
      next(error);
  }
});

const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
