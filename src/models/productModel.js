const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 1,
    },
    qty: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    gallary: {
      type: [],
    },
    rateCount: {
      type: Number,
      default: 0,
    },
    rateValue: {
      type: Number,
      default: 0,
    },
    rateAverage: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

productSchema.pre('update', () => {
  this.update({}, { $set: { updatedAt: new Date() } });
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
