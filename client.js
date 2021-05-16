const http = require('http');

function callHTTP(reqHost, reqPort, reqPath, reqMethod, reqHeaders, reqBody) {
	const reqOptions = {
		hostname: reqHost,
		port: reqPort,
		path: reqPath,
		method: reqMethod,
		headers: reqHeaders
	};

	const req = http.request(reqOptions, (res) => {
		let resBody = [];
		res.on('data', (chunk) => {
			resBody.push(chunk);
		});
		res.on('end', () => {
			resBody = Buffer.concat(resBody).toString('utf8');

			let resLog = `HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}\n`
			for (let i=0; i<res.rawHeaders.length; i+=2) {
				resLog += `${res.rawHeaders[i]}: ${res.rawHeaders[i+1]}\n`;
			}
			resLog += '\n';
			resLog += resBody;
			console.log('=====\n[data] svr->cli [' + resLog.length + ']\n' + resLog.toString('utf8'));
		});
	});

	req.on('error', (e) => {
		console.error('>>>>> error:', e);
	});

	if (reqBody) {
		req.write(reqBody);
	}
	req.end();
}

callHTTP('localhost', 8081, '/', 'GET', undefined, undefined);
// callHTTP('localhost', 8081, '/', 'POST', undefined, 'this is test body');

