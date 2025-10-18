const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
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
})


server.listen(3000,()=>{
    console.log(`server is running`)
})