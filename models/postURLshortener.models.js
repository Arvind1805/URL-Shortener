const fs = require('fs/promises')

exports.postURLshortener = (loadlinks) => async(req,res)=>{
  const {url,shortCode} = req.body;
  const links = await loadlinks();
  if(links[shortCode]){
    res.status(400).send("Data already exists")
  }else{
    links[shortCode] = url;
    await fs.writeFile("links.json",JSON.stringify(links))
    console.log("Data inserted successfully")
  }
  res.redirect("/")
}