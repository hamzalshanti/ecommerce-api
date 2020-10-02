class Tag {
  constructor(Tag) {
    this.Tag = Tag;
  }
  async create({ name }) {
    const tag = await this.Tag.create({ name: name.trim().toLowerCase() });
    if (!tag) return false;
    return tag;
  }
  async modify({ id, name }) {
    const tag = await this.Tag.findByIdAndUpdate(
      id,
      {
        name: name.trim().toLowerCase(),
      },
      {
        new: true,
      }
    ).select({
      name: 1,

      updatedAt: 1,
    });

    if (!tag) return false;
    return tag;
  }
  async getOne(id) {
    const tag = await this.Tag.findById(id).select({
      __v: 0,
    });
    if (!tag) return false;
    return tag;
  }
  async getAll() {
    const tags = await this.Tag.find().select({
      name: 1,
    });
    if (tags.length === 0) return false;
    return tags;
  }
}

module.exports = Tag;
