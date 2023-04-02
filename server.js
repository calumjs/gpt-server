const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const {encode} = require('gpt-3-encoder')


// Load environment variables from .env file
require('dotenv').config()

// Initialize OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

var pageHistory = [];

// Middleware for handling all incoming requests
app.use(async (req, res, next) => {
  try {
    const route = req.path;
    console.log(req.path);
    
    const systemPrompt = `You are a web server. You will receive a route for an HTML page that the client has requested, and reply with the full HTML for the page.
    Make sure the page looks aesthetic. Do not use any place holders like lorem ipsum or feature 1, 2, 3 - just make something up if you are not sure. Use images from unsplash if required.
    Feel free to add hyperlinks to other pages as required too.
    Respond as if you are a server, no additional explanation - just give the HTML, we don't need HTTP/1.1 200 OK, etc.`

    pageHistory.push({ role: 'user', content: route });

    // Keep the page history under 3700 tokens so we don't hit the limit
    while(encode(JSON.stringify(pageHistory)) > 3700) {
      pageHistory.shift();
    }

    const messages = [{ role: 'system', content: systemPrompt }].concat(pageHistory);

    const completion = await openai.createChatCompletion({
      model: 'gpt-4', // Replace with 'gpt-3.5-turbo' if you don't have access yet
      messages: messages
    });

    const generatedHTML = completion.data.choices[0].message.content;

    // Add the generated HTML to the page history so subsequent files are cohesive
    pageHistory.push({ role: 'system', content: generatedHTML });

    res.status(200).send(generatedHTML);
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
