const express = require("express");
const dbConnect = require("./dbConfigs/dbConnect");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());
dbConnect();

const routes = require("./routes/routes");

app.use("/", routes);
app.use((req, res, next) => {
  res.send("404 NOT FOUND")
});

app.listen(port, () => {
  console.log(`Server is Connected to ${port}`);
});
