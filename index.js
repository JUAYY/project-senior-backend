const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello world" });
});

app.use("/api/users", require("./src/user/route"));
app.use("/api/templates", require("./src/template/route"));
app.use("/api/contents", require("./src/content/route"));
app.use("/api/files", require("./src/file/route"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
