const http = require('http');

http.createServer(function (req, res) {
	let reqBody = [];
	req.on('data', (chunk) => {
		reqBody.push(chunk);
	});
	req.on('end', () => {
		reqBody = Buffer.concat(reqBody).toString('utf8');
		console.log('req.url:', req.url);
		console.log('req.method:',   req.method);
		console.log('req.headers', JSON.stringify(req.headers, null, 2));
		console.log('reqBody:', reqBody);
		res.write('Hello World!');
		res.end();
	});
}).listen(8080);
