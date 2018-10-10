const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const app = express();

const BROADCAST_API_TOKEN = "a62d4078-c92a-4bb0-8cb8-8b303f12a1b2"
const ENDPOINT = "https://hbotconnect.unicornonzen.com/api/sendmessage/?accessToken=";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/dist'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/dist"));
}

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

// app.get('/', (req, res) => {
// 	res.sendStatus(200);
// });

app.post('/api/test', (req, res) => {
  const user = req.body.user;
  const message = req.body.message;
  sendText(user, message);
  res.json({a: 'Message has been sent.'});
});

app.post('/api/text', (req, res) => {
	const user = req.body.user;
	const message = req.body.message;
	// console.log(user);	
	sendText([user], message);

	res.sendStatus(200);
});


function sendText(users, message) {
	const data = {
		to: users,
		msg_type: "text",
		msg: message,
		buttons:  [
			{
				title: "first",
				type: "show_block",
				block_ids: ["3_e455-1d70-142f-4eb4-6822"]
			},
			{
				title: "second",
				type: "show_block",
				block_ids: ["2_776e-a66b-c6b2-9b2b-cdf6"]
			}
		]
	};

	sendRequest(data);
}

function sendImage(users, image) {
	const data = {
		to: users,
		msg_type: "image",
		msg: image
	};

	sendRequest(data);
}

function sendAudio(users, audio) {
	const data = {
		to: users,
		msg_type: "audio",
		msg: audio
	};

	sendRequest(data);
}

function sendFile(users, file) {
	const data = {
		to: users,
		msg_type: "file",
		msg: file
	};

	sendRequest(data);
}

function sendCarouselSample(users) {
	let carousel = {
		"title": "Title",
		"subtitle": "Subtitle",
		"image_url": "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p50x50/24174158_745710642297764_706246064037500222_n.png?oh=612a0ee2f96704da402414ff351bc1f3&oe=5A98A944",
		"buttons": [{
				"title": "Open Google",
				"type": "web_url",
				"url": "https://www.google.com",
				"webview_height_ratio": "tall"
			}
		]
	}

	const data = {
		to: users,
		msg_type: "carousel",
		msg: [carousel]
	};

	sendRequest(data);
}

function sendSetAttributesSample(users, attrs) {
	const data = {
		to: users,
		msg_type: "carousel",
		msg: [{
      "attr_name": "abc",
      "attr_value": "123"
    }]
	};

	sendRequest(data);
}

function sendRequest(data) {
	const options = {
		uri: ENDPOINT + BROADCAST_API_TOKEN,
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		json: data
	}
	
	request(options, function(error, response, body) {
		if (!error) {
			console.log("SEND", response.body);
		} else {
			console.error("ERROR: " + error);	
		}
	});
}

app.listen(8081, () => console.log('Server is listening on port 8081!'))
