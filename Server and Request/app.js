
const http = require('http');
const server = http.createServer((req, res) => {
    console.log('server is created')

    //req.url this tells you what the client wants to see
    //req.headers this provide you extra detail what kind of data, what kind of security function the request has.
    //one important header we opten need is (content type) this tell the client what kind of data we are sending back.
    res.setHeader(`Content-type`, `text/html`)

    if (req.url === '/') {
        res.statusCode = 200;//ok
        res.end(`<h1>Hello world </h1>`)
    }
    else {

        if (req.url === '/pizza') {
            res.statusCode = 200;//ok
            res.end('<h1>This is your pizza</h1>')
        }
         else if (req.url === '/home') {
            res.statusCode = 200;//ok
            res.end('<h1>welcome home</h1>')
        }
        else if (req.url === '/node') {
            res.statusCode = 200;//ok
            res.end('<h1>welcome node</h1>')
        }
        
         else if (req.url === '/about') {
            res.statusCode = 200;//ok
            res.end('<h1>welcome about</h1>')
        }
        else {
            res.statusCode = 404; //not found
            res.end(`<h1>Page not found</h1>`)
        }
    }

})

const port = 3000;
server.listen(port, () => {
    console.log(`server is running`)
})
