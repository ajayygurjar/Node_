const fs=require('fs')


const requestHandler=(req,res)=>{

     //url method
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        //form
        fs.readFile('formValues.txt',(err,data)=>{
            const userName=data.toString();
        

        res.setHeader(`Content-type`,`text/html`);
        res.end(
            `
            <h3>${userName}<h3>
            <form action='/message' method='POST'>
            <label>Name:</label>
            <input type='text' name='username'></input>
            <button type='submit'>Add</button>
            </form>
            `
        )
        })


    }else{
        if(req.url==='/message'){
            res.setHeader('Content-type','text/html');
            let body=[];
            req.on('data',(chunk)=>{
                body.push(chunk)
            })
            req.on('end',()=>{
                let buffer=Buffer.concat(body)
                console.log(buffer)
                let formData=buffer.toString();
            console.log(formData)

            const formValues=formData.split('=')[1];
            fs.writeFile('formValues.txt',formValues,(err)=>{
                res.statusCode=302;//redirect
                res.setHeader('Location','/');
                res.end();
            })

            })
        }
        else{
            if(req.url=='/read'){
                //read from the file


                fs.readFile('formValues.txt',(err,data)=>{
                    console.log(data.toString())
                    res.end(`
                        <h1>${data.toString()}
                        </h1>
                        `);
                })
            }
        }
    }

}



const anotherFunction=()=>{
    console.log(`this is another function`)
}

// Way of importing Function
// module.exports={
//  requestHandler,
//  anotherFunction
//}Direct nae of the function 


//Storing function as key value pair
// module.exports={
//     handler:requestHandler,
//     testFunction:anotherFunction
// }



// module.exports.handler=requestHandler;
// module.exports.testFunction=anotherFunction;


// in js we also have provision of removing module and using only exports as shortcut exporting a function


exports.handler=requestHandler;
exports.testFunction=anotherFunction;
