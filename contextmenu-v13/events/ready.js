const client = require("../index");
const database = require('quick.db');
client.on("ready", () =>{
    let veri = database.get("firstsetup") || false
    if(veri == true){
        
    }else{
        database.set("firstsetup", true) 
        
    } 


    console.log(`              Başarıyla Aktif Oldu`)
	console.log(`///////////////////////////////////////////////////`)



setTimeout(function(){
    console.log(`              Shadox x)`)
		console.log(`///////////////////////////////////////////////////`)
},1000)
                     
});
