Factmazing App Twitter Bot
This project features automated Twitter and LinkedIn bots designed to schedule and post engaging content for the FactMazing application. By leveraging these bots, the marketing process has been streamlined, significantly reducing costs while enhancing user engagement and visibility.

##Features
Automated Content Scheduling: Schedules and posts facts to Twitter and LinkedIn at regular intervals.
Engagement Boost: Attracts target users and fosters community growth for the FactMazing app.
Cost Efficiency: Reduces manual marketing efforts, cutting down on marketing expenses.

##Getting Started
1. Prerequisites
Ensure you have the Google Cloud SDK installed.
Log in to your Google Cloud account and select the appropriate project for deployment.

2. Initial Setup
Open a terminal or command prompt and run:
gcloud init

This will guide you through logging into your Google Cloud account and setting up the project.

3. Installation
Navigate to the project directory and install the dependencies:
npm install

4. Testing Locally
To test the bot locally, run:

node index.js
This starts the bot, executing its logic to post facts on Twitter and LinkedIn.

5. Building the Docker Container
Build the Docker container image using:
gcloud builds submit --pack image=gcr.io/factmazing-f3ce5/tweeter-bot-post-facts

6. Deploying to Google Cloud Run
Deploy the bot to Google Cloud Run as a managed service with:
gcloud run deploy tweeter-bot-post-facts --image=gcr.io/factmazing-f3ce5/tweeter-bot-post-facts --platform=managed

This makes the bot accessible as a scalable, cloud-based service.

##Technologies Used
Node.js: Backend logic for the bots.
Google Cloud Run: Deployment of containerized bots for scalable and cost-effective service.
Twitter & LinkedIn APIs: Integration for automated content posting.


##Impact
Significantly boosted user engagement on social media.
Attracted the target audience to the FactMazing application.
Enabled growth and visibility for the app while reducing marketing overhead.
