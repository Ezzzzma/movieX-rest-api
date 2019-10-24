let mongodbURL = "mongodb://localhost:27017/movieX"; // ilk basta default degerini bu yaptik

if (process.env.NODE_ENV === "development") {
  mongodbURL = "mongodb://localhost:27017/movieX";
}

if (process.env.NODE_ENV === "production") {
  mongodbURL = `mongodb+srv://Esma:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0-yzl47.mongodb.net/test?retryWrites=true&w=majority`;
}

module.exports = mongodbURL;
