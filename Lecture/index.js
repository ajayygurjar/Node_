const http=require('http');
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end(`
            <h1>Hello from sharpener</h1>
            <h1>this is the Home Page</h1>
            <h1>This is Page 1</h1>`)
    }
})

server.listen(3000,()=>{
    console.log(`server is running`);
})