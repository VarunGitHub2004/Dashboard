import express, { response } from "express";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./Routes/auth.js";
import { userRouter } from "./Routes/user.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
const server = express();
import cookieParser from "cookie-parser";
dotenv.config();
//bodyParser
server.use(express.json());
server.use(cookieParser())
server.use(cors());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
//Middleware for verification
const auth = (req, res, next) => {
  const token = req.cookies.token; //but token may be send by form
  // const token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiVmFydW4zNDI0MzI0In0sImlhdCI6MTcxMjc3MTc2OX0.EzMe5dJ0Yv8zwIzAUXiwym1fOTxXRsCqT3DoMztgyj-35pgrkdh15v9MqlBRbLLRBzX_TnbwcGWFVrs8r1LO_mnCVKAQwfob7SNxHfZ33WjE4W3fCcdaUyUqOSscS2Byyy4nMaAzwhkG8pcpOHDaOBvYd-vA0FbQST654V_lZdbgT9fYVC8X-_btgaL4DYF8ebLh0tiLEac5um_0wnQi8261u7M9ustOCRAEpbAqQ8lbrUcmaLqPVj3niRRH3KT_FfXXBtRAf7uGYcWPcjZ4jP1T0q9WDchiXsfSedXYdjZSjXXklEGeFd_EvvFdrFtbx52U96Sih92wgkYU9XrhOaQOrI52zc3XS28nsUUXaB0Dr-ppXJiWSPd2C47n9NdOstAJpTZy-KhhONI3gGh4rZWiVUjEwfKq0OaLyqrzsDs_xawi7H09nm0iYiin3t4ioAUlzUsCTNMEFmMU_FKLYfwD7DfHvlorw70GMEpbn04P9HtZaxIt4QhRAz5a-1OAyop7JJ35Pmsda_k94lJ76R5lDaUkD88w0yPJAuau8nX3JWIWN-0Tg5e66RAJCr6vUOZhB2TZJ86YiT1AznOO92sXCCOXTyeGvO0sSUmF6B-Fw-wde6ApUA74uxoN4A0Fy3T1GpY2WJzObmUo0-SldDpjH0KVXtSl9Ue9EyPlTIU"
  console.log("token ", token);
  try {
    var decoded = jwt.verify(token, publicKey);
    console.log("decoded", decoded);
    if (decoded.username || decoded.payload.username) next();
    else res.sendStatus(401);
  } catch (err) {
    response.send("Unauthorized")
    console.log("err",err)
  }
};
main()
  .then(res => console.log("Database connected"))
  .catch(err=> console.log("Database could not connected"));
async function main() {
  await mongoose.connect(process.env.MONGO_URL
  );
}

server.use("/auth", authRouter);
server.use("/qwertyuiop",auth, userRouter);
server.use('/dashboard',auth,(req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

const withoutAuth = [ "/confirmation", "/avatar", "/bring", "/signin","/"];
withoutAuth.map(wAuth => {
  server.use(wAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
  });
});


server.listen(process.env.PORT_NO, () => {
  console.log("Server successfully connected to port no", process.env.PORT_NO);
});
