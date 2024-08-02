const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3300;

app.use(express.static(__dirname));
app.use("/images", express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userLogin = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
    },
    {
      collection: "userdetails",
    }
  )
);

mongoose
  .connect("mongodb://127.0.0.1:27017/agri")
  .then(() => console.log("Connection successfull"))
  .catch((err) => {
    console.log("Error in connection" + err.stack);
    process.exit(1);
  });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await userLogin.findOne({ email });
    if (!existinguser) {
      await userLogin.create({ name, email, password });
      res.redirect("/login");
    } else {
      return res.send("User already exist");
    }
  } catch (error) {
    console.error("Failed to register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userLogin.findOne({ email, password });
    if (!user) {
      return res.send("Invalid User");
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.error("Failed to Login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/home1.html")
 })
 

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/About Us", (req, res) => {
  res.sendFile(__dirname + "/About Us.html");
});

app.get("/ContactPage", (req, res) => {
  res.sendFile(__dirname + "/ContactPage.html");
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/signin.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.get("/weather",(req,res)=>{
  res.sendFile(__dirname+"/weather.html")
})
app.get("/vegetable",(req,res)=>{
  res.sendFile(__dirname+"/vegetable.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
  });
app.get("/Smartfarming", (req, res) => {
  res.sendFile(__dirname + "/Smartfarming.html");
});
app.get("/Crops", (req, res) => {
    res.sendFile(__dirname + "/Crops.html");
  });
app.listen(port,()=>console.log(`Server is running in http://localhost:${port}`))
const usercontacts=mongoose.model("use",new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: String,
  msg:String
 },
 {
  collection:"contacts"
 }
))
app.post('/contacts',async(req,res)=>{
const data=new usercontacts(req.body)
await data.save()
res.redirect('/home')
})