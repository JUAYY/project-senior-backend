// Initialize Google Cloud Storage client with your service account key
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");
const path = require("path");

const storage = new Storage({
  keyFilename: path.resolve(__dirname, "./credential.json"), // Replace with the path to your service account key JSON file
  projectId: "jarpuntrs", // Replace with your Google Cloud Project ID
});

const uploadToCloud = async (file) => {
  // Set up a storage bucket

  const uid = uuid.v4().split("-").join("");
  const filename = uid + path.extname(file.originalname);
  // Create a GCS file object with the specified file name

  const bucketName = "project-ingenuity"; // Replace with your GCS bucket name
  const fileUpload = storage.bucket(bucketName).file("img/" + filename);
  const config = {
    metadata: { contentType: file.mimetype },
    resumable: false,
  };
  // Create a write stream to pipe the file data to GCS
  const url = `https://storage.googleapis.com/${bucketName}/img/${filename}`;
  const stream = fileUpload.createWriteStream(config);
  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", () => resolve(url));
    stream.end(file.buffer);
  });
};

module.exports = {
  uploadToCloud,
};
