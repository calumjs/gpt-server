# OpenAI Web Server

Today's GPT experiment: Using the ChatGPT API as a web server! When clients request a route, we prompt GPT: "You're a web server. You receive a route for an HTML page that the client requests. Reply with the full HTML for the page..."

![Home page photo](https://pbs.twimg.com/media/Fst04nnaEAArH17?format=jpg&name=large)
**Figure: Example home page**

Page history gets stored & repeated with each request for seamless cohesion between pages.

![Child page photo](https://pbs.twimg.com/media/Fst1qOqaYAE_Bom?format=jpg&name=large)
**Figure: Clicking on a link to a child page**

Roll the dice - Type in a random URL and voilà, a new page gets generated! No more 404 errors!

![Random URL photo](https://pbs.twimg.com/media/Fst1zjzaIAIv5tp?format=jpg&name=large)
**Figure: Going to a random URL**

My favorite feature: Restart the server, and you get a fresh, entirely new look every time.

![New home page photo after refresh](https://pbs.twimg.com/media/Fst18hxakAMojxB?format=jpg&name=large)
**Figure: New home page after server restart**

This is an Express web server that uses OpenAI's GPT-4 API to generate HTML pages in response to incoming requests. 

Feel free to explore, contribute or just take a look! Let me know what you think below!

Note: This experiment isn't exactly optimized for performance – some pages may take a couple of minutes to load fully. It's a nostalgic throwback to dial-up internet days...

## Installation

1. Clone this repository
2. Install dependencies using `npm install`
3. Create a `.env` file and add your OpenAI API key as `OPENAI_API_KEY=your_api_key_here`
4. Start the server using `npm start`

Note: If you do not have access to the GPT-4 model, you can use the `gpt-3.5-turbo` model instead by modifying the `model` parameter in the `createChatCompletion` function in `index.js`.

## Usage

Make a GET request to the server with the desired route as the path, and the server will respond with the full HTML for that page, including any CSS, JavaScript, etc.

For example, if the server is running locally on port 3000, and you want to request the home page, you would make a GET request to `http://localhost:3000/`.

## How it Works

When a request is received, the server uses the current request route as input to an OpenAI GPT-4 (or GPT-3.5-turbo) model, along with a prompt that instructs the model to respond with the full HTML for the requested page, as if it were a web server. 

The model generates the HTML and the server responds with it as the HTTP response. The generated HTML is also added to a page history array, which is used to provide context to the model for future requests. 

The page history is limited to 3700 tokens, and older entries are removed when the limit is reached to prevent the array from growing too large. 

