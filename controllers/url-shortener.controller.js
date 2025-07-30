const path = require('path')
const fs = require('fs/promises')

exports.urlShortenerController = (loadlinks) => async(req,res)=>{
  // res.sendFile(path.join(__dirname,"views","index.html"))
  // console.log(__dirname)

  // const baseDir = path.join(__dirname,"..")
  // let fileContent = await fs.readFile(path.join(baseDir,"views","index.html"))  // reading the index.html file entirely 
  // and then replacing the {{shortcode}} content here . EJS is a middleware helps to add dynamic content in the html
  const links = await loadlinks();

  // fileContent = fileContent.toString().replaceAll("{{shortcode}}",listHTML)
  res.render("index",{links,host : req.headers.host})
}

exports.redirectURL =(loadlinks) => async(req,res)=>{
  if(req.params){
    console.log(req.params)
    const {shortcode} = req.params;
    const links = await loadlinks();
    if(links[shortcode]){
      res.redirect(links[shortcode])
    }else{
      console.log("no data found")
      res.status(400).send("data not found")
    }
  }
}