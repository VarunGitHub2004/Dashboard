import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service:"gmail",
  host:"smtp.gmail.com",
  port:587,
  secure:false,
   auth: {
       user: 'varuntiwaritiwari3@gmail.com',
       pass: 'ebir kqkx bydb ctzo'
   }
});

const mailOptions = {
   from: "compiler6367@gmail.com",
   to: "varuntiwaritiwari3@gmail.com",
   subject: "Nodemailer Test",
   html: "Test <button>sending</button> Gmail using Node JS"
};

transporter.sendMail(mailOptions, function(error, info){
   if(error){
      console.log('error ',error);
   }else{
      console.log("Email sent: " + info.accepted);
   }
});
