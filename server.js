const express = require("express");
const app = express();
const PORT = 5000;
const fs = require("fs");

app.use((req, res, next) => {
  let url = req.url;
  let method = req.method;
  console.log(`🕵️‍♂️ Agent detected: ${method} ${url} — don’t trigger the alarms!

🔍 Mission log: Agent tried to sneak in using ${method}.

🛰️ Spy activity noticed: ${method} at ${url}.`);

  next();
});

app.all("/agent", (req, res, next) => {
  if (req.method == "DELETE") {
    return res.status(403).json({
      success: false,
      message:
        "🛑 Non-POST blocked: “🛑 Only POST allowed! The vault door won’t open otherwise.",
    });
  }
  next();
});

app.post("/agent/:currentYear", (req, res) => {
  let currentYear = req.params.currentYear || 2024;
  let birthYear = req.query.birthYear || 2000;

  let age = currentYear - birthYear;
  let data = `valut agent age : ${age}`;

  fs.writeFile("valutAge.txt", data, (error) => {
    if ( error ) {
        console.log("file writing failed")
    }else {
      console.log("file written successfully");
    }
  })

  return res.status(200).json({
    success: true,
    message: `Valut agent age is : ${age}`,
  });

 
});


app.get("/agent/delete", ( req, res ) => {
    fs.unlink("valutAge.txt", (error) => {
        if ( error ) {
             return res.status(500).json({ success: false, message: "file delete error" });
        }else {
             return res.status(200).json({ success: true, message: "file deleted successfully" });
        }
    })


});


app.get("/agent/read", ( req, res) => {
    fs.readFile("valutAge.txt","utf-8", (error, data) => {
        if ( error) {
       return res.status(500).json({ success: false, message: "file reading error" });
    
        }else {
           return res.status(200).json({ success: true, content: data });
        }
    })
})

app.get("/agent/:username", (req, res) => {
  let username = req.params.username;
  return res.status(200).json({
    success: true,
    message: ` hello from valut calculator pleasure to meet you ${username} `,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`valut is listening on http://localhost:${PORT}`);
});
