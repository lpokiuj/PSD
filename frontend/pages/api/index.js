const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3606;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to AI.URUS</h1>");
});

const { usersRouters } = require("./routers");

app.use("/users", usersRouters);

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
