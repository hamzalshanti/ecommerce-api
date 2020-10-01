const mongoose = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

categorySchema.pre('update', () => {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Category', categorySchema);
