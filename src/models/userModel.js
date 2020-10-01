const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

userSchema.pre('update', () => {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('User', userSchema);
