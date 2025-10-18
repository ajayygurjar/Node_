const http=require('http')

const server=http.createServer((req,res)=>{
    //url method
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        //form

        res.setHeader(`Content-type`,`text/html`);
        res.end(
            `
            <form action='/message' method='POST'>
            <label>Name:</label>
            <input type='text' name='username'></input>
            <button type='submit'>Add</button>
            </form>
            `
        )


    }else{
        if(req.url==='/message'){
            res.setHeader('Content-type','text/html');
            let dataChunk=[];
            req.on('data',(chunk)=>{
                console.log(chunk)
                dataChunk.push(chunk)
            })
            req.on('end',()=>{
                let combinedBuffer=Buffer.concat(dataChunk)
                console.log(combinedBuffer.toString())
                let value=combinedBuffer.toString().split('=')
            console.log(value)
            })
        }
    }
})


server.listen(3000,()=>{
    console.log(`server is running`)
})