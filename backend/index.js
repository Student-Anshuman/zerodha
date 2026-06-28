const dotenv = require('dotenv');
dotenv.config();


const express = require('express');

const mongoose = require('mongoose');


const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./model/UserModel");
const authRoutes = require("./routes/authRoutes");

const dns = require('dns');
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
app.use((req, res, next) => {
  console.log("Request:", req.method, req.originalUrl);
  console.log("Origin:", req.headers.origin);
  next();
});



// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL,
//       process.env.DASHBOARD_URL,
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming Origin:", origin);

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  mongoose.connect(uri, { family: 4 }).then(() => {
    console.log("DB connected!");
  }).catch((err) => {
    console.log("DB connection error: ", err);
  });
  
});
