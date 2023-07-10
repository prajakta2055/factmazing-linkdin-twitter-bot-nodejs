Factmazing App Twitter Bot - Local Development Setup Guide
This guide will walk you through the steps to set up and run the Factmazing App Twitter Bot locally using Node.js, Google Cloud SDK, and Docker.

## Prerequisites
Before you begin, ensure that you have the following prerequisites installed:

Node.js and npm: Download and install Node.js.
Google Cloud SDK: Follow the instructions at Google Cloud SDK documentation to install it on your local machine.
Docker: Download and install Docker.
Setup Google Cloud SDK
Open a terminal or command prompt.
Run the following command to initialize the Google Cloud SDK:
gcloud init
This will guide you through the process of logging in to your Google Cloud account and selecting the project for the Factmazing App Twitter Bot.


## Installation
Open a terminal or command prompt.
Navigate to the project directory where you have cloned or downloaded the Factmazing App Twitter Bot code.
Run the following command to install the project dependencies:
npm install

Testing Locally
Make sure you are in the project directory in the terminal or command prompt.
Run the following command to start the local development server and test the bot:
node index.js

This will start the Twitter Bot locally and execute the necessary logic for posting facts on Twitter.
Building the Docker Container
Open a terminal or command prompt.
Navigate to the project directory.
Run the following command to build the Docker container image:
gcloud builds submit --pack image=gcr.io/factmazing-f3ce5/tweeter-bot-post-facts
This command will use the Google Cloud SDK to build the Docker container image for the Factmazing App Twitter Bot.


Deploying the Container
Open a terminal or command prompt.
Run the following command to deploy the Docker container on Google Cloud Run:
gcloud run deploy tweeter-bot-post-facts --image=gcr.io/factmazing-f3ce5/tweeter-bot-post-facts --platform=managed

This will deploy the containerized Twitter Bot to Google Cloud Run, making it accessible as a managed service.
