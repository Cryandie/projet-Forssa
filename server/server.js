const express = require("express");
const app = express();
const ConnectDB = require("./Config/ConnectDB");
const path = require("path");
const usersRouter = require("./Routes/users");
const profileRoute = require("./Routes/profile");
const authRoute = require("./Routes/auth");
const postsRoute = require("./Routes/posts");
const feedbackRoute = require("./Routes/feedbacks");
//1 Parse Data

app.use(express.json());
//2 Connect DataBase
ConnectDB();

//3 Define Routes
// app.use("/api/users", usersRouter);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/feedback", feedbackRoute);

//Production serve static assets
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//4 Connect to Server
const PORT = process.env.PORT || 7000;

app.listen(PORT, (err) => {
  err
    ? console.log("Server Error", err)
    : console.log(`Server is running on port ${PORT}`);
});

//test
