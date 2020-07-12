const http = require('http');

const server = http.createServer((req, res) => {
    console.log('running')

    if (req.url === '/ben') {
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>test</title>
        </head>
        <body>
            <h1>Ben</h1>
        </body>
        </html>`)
        res.end();
    }

    if (req.url === '/') {
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>test</title>
        </head>
        <body>
            <h1>This is a test</h1>
            <form action="/create-user" method="POST">
                <label for="username">Enter Username:</label>
                <input type="text" name="username">
            </form>
        </body>
        </html>`)
        res.end();
    }


    if (req.url === '/create-user') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk)
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString().split('=')[1]
            console.log(parsedBody)
            res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>test</title>
            </head>
            <body>
                <h1>${parsedBody}</h1>
                <form action="/create-user" method="POST">
                    <label for="username">Enter Username:</label>
                    <input type="text" name="username">
                </form>
            </body>
            </html>`)
        });
        res.end()
    }
});

server.listen(3000)
