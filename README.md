# OpenAI Web Server

This is an Express web server that uses OpenAI's GPT-4 API to generate HTML pages in response to incoming requests. 

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

