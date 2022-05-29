/*CSV converter to JSON*/
const csvtojson = require('csvtojson')
const fs = require('fs')

const csvfilepath = "./CadopReport.csv"

csvtojson()
.fromFile(csvfilepath)
.then((json)=>{
    console.log(json);
    fs.writeFileSync("db.json", JSON.stringify(json),'utf-8',(err) => {
        if(err) console.log(err)
    })
})

