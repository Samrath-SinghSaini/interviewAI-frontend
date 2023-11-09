import express from "express";
import bodyParser from "body-parser";
import ReactDomServer from "react-dom/server";
import Body from '../src/Components/Body'
import App from '../src/App'
import {StaticRouter} from 'react-router-dom'
import path from 'path'
import fs from 'fs'
import React from "react";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist/assets', {index:false}))


app.get("/", (req, res) => {
  const reactApp = ReactDomServer.renderToString(
  <Body/>
  );

  let filePath = path.resolve('./dist/index.html')
  fs.readFile(filePath, 'utf-8', (err, data)=>{
    if(err){
      console.log('an error occurred, ',err)
      return res.status(500).json({error:err})
    } 

    return data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
  })
  res.send(`
    <html>
    <body>
    <div id="root">${reactApp}</div> 
    </body>
    </html>
    `);
});
const PORT = "3000";
app.listen(PORT, () => {
  console.log("Server has been started on Port", PORT);
});
export default app