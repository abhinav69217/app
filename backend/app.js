const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const faqRoutes = require("./routes/faqRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", faqRoutes);

mongoose
  .connect(
    "mongodb+srv://abhinavjangra217:b3QBHo06ZowcVxHT@cluster0.jj79a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/faqdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
