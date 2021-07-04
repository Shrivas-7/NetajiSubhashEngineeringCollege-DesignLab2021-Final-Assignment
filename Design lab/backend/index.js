const express = require("express");
const mysql = require("mysql");
const app = express();
const cors =require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "login_DL"
  });
  
  app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
  
      db.query(
        "INSERT INTO user (name,email,mobile, password) VALUES (?,?,?,?)",
        [username, email,mobile,password],
        (err, result) => {
          console.log(err);
        }
      );
    });

    app.post("/login", (req, res) => {
        const password = req.body.password;
        const email = req.body.email;
        
      
          db.query(
            "SELECT name,email,mobile,image FROM user WHERE Email = ? AND Password = ?",
            [email,password],
            (err, result) => {
                if(err)
                    res.send({err:err});
                if(result.length>0)
                {
                    res.send(result)
                }
                else
                {
                    console.log({message:"Wrong Email/Password Combination!"})
                    
                }
            }
          );
        });

        app.post("/update", (req, res) => {
            const name = req.body.username;
            const email = req.body.email;
            const mobile = req.body.mobile;

            console.log(name);
          
              db.query(
                "UPDATE user SET name = ? , mobile = ? WHERE email = ?",
                [name,mobile,email],
                (err, result) => {
                    if(err)
                        console.log({err:err});
                    else
                        console.log("updated")
                    
                }
              );
            });

            app.post("/upload", (req, res) => {
              const url = req.body.url;
              const email = req.body.email;
            
                db.query(
                  "UPDATE user SET image = ?  WHERE email = ?",
                  [url,email],
                  (err, result) => {
                      if(err)
                          console.log({err:err});
                      else
                          console.log("Image Uploaded")
                      
                  }
                );
              });
    


  app.listen(3001, () => {
    console.log("running server");
  });