const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const adminModel = require("./models/admin")
const userModel = require("./models/user")
const feedbackModel = require("./models/feedback")
const campaignModel = require("./models/campaign")
const awarenessModel = require("./models/awareness")


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anjali2003:anjali2003@cluster0.wy6js.mongodb.net/EcoCup_db?retryWrites=true&w=majority&appName=Cluster0")

//admin signup
app.post("/adminSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    //console.log(hashedpassword)
    input.password = hashedpassword
    console.log(input)
    let result = new adminModel(input)
    result.save()
    res.json({ "status": "success" })

})

//admin signin

app.post("/adminSignin", (req, res) => {
    let input = req.body
    let result = adminModel.find({ username: input.username }).then(
        (response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(input.password, response[0].password)
                if (validator) {
                    jwt.sign({ email: input.username }, "Eco-Cup", { expiresIn: "7d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "token creation failed" })
                            } else {
                                res.json({ "status": "success", "token": token })
                            }
                        })
                } else {
                    res.json({ "status": "wrong email or password" })
                }
            } else {
                res.json({ "status": "user doesn't exist" })
            }
        }
    ).catch()
})

//User signup
app.post("/userSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    //console.log(hashedpassword)
    input.password = hashedpassword
    console.log(input)
    let result = new userModel(input)
    result.save()
    res.json({ "status": "success" })

})
  
  //user Signin
app.post("/userSignin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, "yourSecretKey", { expiresIn: "1h" });

    // Send the response
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//viewall users

app.post("/viewusers", (req, res) => {
    let token = req.headers["token"]
    jwt.verify(token, "Eco-Cup", (error, decoded) => {
        if (error) {
            res.json({ "status": "unauthorized access" })
        } else {
            if (decoded) {
                userModel.find().then(
                    (response) => {
                        res.json(response)
                    }
                ).catch()

            }
        }
    })
})

//add campaign
app.post("/AddCampaign", (req, res) => {
    let input = req.body
    console.log(input)
    let driver = new campaignModel(input)
    driver.save()
    res.json({ "status": "success" })
})

//search campaign
app.post("/searchCampaign", (req, res) => {
    let input = req.body
    campaignModel.find(input).then(
        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
})

//add awareness ideas
app.post("/AddAwarenessIdeas", (req, res) => {
    let input = req.body
    console.log(input)
    let driver = new awarenessModel(input)
    driver.save()
    res.json({ "status": "success" })
})

//viewall awareness ideas
app.get("/ViewAllAwarenessIdeas", (req, res) => {
    awarenessModel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch((error) => {
        res.json(error)
    })
})

//add feedback
app.post("/AddFeedback", (req, res) => {
    let input = req.body
    console.log(input)
    let feedback = new feedbackModel(input)
    feedback.save()
    res.json({ "status": "success" })
})

//view feedback
app.get("/viewfeedback",(req,res)=>{
    feedbackModel.find().then(
      (data)=>{
          res.json(data)
      }
    ).catch((error)=>{
  
      res.json(error)
    })  
  })

  app.listen(8080, () => {
    console.log("server started")
})
