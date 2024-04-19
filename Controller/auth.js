import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Modals/user.js";
import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);
export const signup = (req, response) => {
  const newUser = new User(req.body);
  const token = jwt.sign(
    { payload: { username: req.body.username } },
    privateKey,
    { algorithm: "RS256" }
  );
  const hash=bcrypt.hashSync(req.body.password,10)
  newUser.token = token;

  newUser.password=hash
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "compiler6367@gmail.com",
      pass: "ebir kqkx bydb ctzo",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "compiler6367@gmail.com", // sender address
      to: newUser.email, // list of receivers
      subject: `Thank you creating an account!`, // Subject line
      text: `Dear ${newUser.name}?`, // plain text body
      html: `<b>I hope this email finds you well. On behalf of our entire team, I want to extend a warm thank you for creating an account with us. We're thrilled to welcome you to our community!
      Your decision to join us means a great deal, and we're committed to ensuring that your experience with our platform is nothing short of exceptional. Whether you're here to explore our products, access exclusive content, or engage with our services, we're here to support you every step of the way.
      As a valued member of our community, you'll have access to a range of benefits, including [mention any specific benefits or features]. We're constantly working to enhance our platform and provide you with the tools you need to [mention the purpose or goal of the platform].
      If you have any questions, feedback, or suggestions, please don't hesitate to reach out to us. Our dedicated support team is always available to assist you and ensure that your experience is smooth and enjoyable.  
      Once again, thank you for choosing to be a part of our community. We're excited about the journey ahead and look forward to serving you.
      <br/> <br/>
      Plz click here to verify your email
      <br/>
    <a href="http://localhost:5000/dashboard"> <button onclick="${() => {
      newUser.confirmed = true;
    }}" style="padding:4px 8px;background:blue;color:white">Click to verify!</button></a>
      <br/><br/>
      Best regards,
      <br/><br/>
      Varun Tiwari
      </b>`, // html body
    });
    console.log("Message sent: %s", info.accepted);
  }
  main().catch(console.error);
  newUser
    .save()
    .then((res) => {
      console.log(res);
      response.json({status:'ok',user:token});
    })
    .catch((err) => response.json({status:'error',error:'duplicate username'}));

  console.log(newUser);
};

export const signin = async (req, response) => {
  // response.json("Hii")

  try {
    const doc = await User.findOne({username:req.body.username } );
    //To check password
    console.log("doc",doc)
    if(doc!=null)
    {
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    console.log(isAuth)
    if (isAuth) {
      var token = jwt.sign({ username: req.body.username }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      doc.save();
      const obj={status:'ok',user:token}
      return response.json(obj)
    } else{ 
      console.log("password and username combination is not valid")
      response.json({status:"error",user:false})};
    }else
    {
      return response.json({user:false})
    }
  } catch (err) {
    // response.sendStatus(401)//giving error so commented
    console.log("err",err)
    return err
  }
};
