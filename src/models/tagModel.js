const mongoose = require('mongoose');
const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

tagSchema.pre('update', () => {
  this.update({}, { $set: { updatedAt: new Date() } });
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
