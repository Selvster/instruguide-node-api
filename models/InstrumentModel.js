import mongoose from "mongoose";
import slugify from "slugify";

const instrumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true
  }
});

instrumentSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

instrumentSchema.post(/^find/, function (docs) {
  const baseUrl = `https://accepted-bonni-selvster-e5e6faa2.koyeb.app/public/imgs/instruments/`;

  if (Array.isArray(docs)) {
    docs.forEach((doc) => {
      if (doc.image) {
        doc.image = `${baseUrl}${doc.image}`;
      }
    });
  } else if (docs && docs.image) {
    docs.image = `${baseUrl}${docs.image}`;
  }
});

const Instrument = mongoose.model("Instrument", instrumentSchema);
export default Instrument;
