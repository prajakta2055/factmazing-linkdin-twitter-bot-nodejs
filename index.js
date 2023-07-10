import axios from "axios";
import facts from "./facts.json" assert { type: "json" };
import { Configuration, OpenAIApi } from "openai";
import { TwitterApi } from "twitter-api-v2";
// Retrieve Job-defined env vars
const { CLOUD_RUN_TASK_INDEX = 0, CLOUD_RUN_TASK_ATTEMPT = 0 } = process.env;
// Retrieve User-defined env vars
const {
  APP_LINK_IOS = "https://apple.co/3YCfcFX",
  APP_LINK_ANDROID = "https://bit.ly/3WxP516",
  OPENAI_API_KEY = "//your api key",
  APP_LINK_SHORT = "https://t.ly/jDLhm"
} = process.env;

// Define main script
const main = async () => {
  
  const twitterClient = new TwitterApi({
    appKey: "abc",
    appSecret: "your twitter account app secret",
    // Following access tokens are not required if you are
    // at part 1 of user-auth process (ask for a request token)
    // or if you want a app-only client (see below)
    accessToken: "your twitter account app access token",
    accessSecret: "your twitter account app access secret",
  });


  //posting logic for linkdin
  async function postOnLinkedIn(finalFact) {
    try {
      const response = await axios.post(
        'https://api.linkedin.com/v2/ugcPosts',
        {
          author: '//your company page urn',
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: {
                text: `${finalFact}\nGet more incredible facts by downloading our app-${APP_LINK_SHORT}`,
              },
              shareMediaCategory: 'NONE',
            },
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
          },
        },
        {
          headers: {
            'Authorization': 'Bearer your OAuth access token',
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Successfully posted on LinkedIn:', response.data);
    } catch (error) {
      console.error('Error posting on LinkedIn:', error);
    }
  }
  
 
  
  var then = new Date(2023, 5, 25), // month is zero based
    now = new Date(); // no arguments -> current date

  // 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
  let day = Math.round((now - then) / (1000 * 60 * 60 * 24)); // round the amount of days
  // result: 712

  if (day >= facts.length) {
    day = 0 + (day % facts.length);
  }
  const todaysFact = facts[day].quote;
  console.log("Todays facts", todaysFact);
  let cleanedFact = todaysFact;
  if (todaysFact.includes("@@")) {
    const factSplit = todaysFact.split("@@");
    cleanedFact = factSplit[0];
  }
  console.log("cleanedFact", cleanedFact);

  const polishedFactFromAI = await beautifyFactIntoLinkdinPostWithOpenAI(cleanedFact);

 console.log("Polished fact from AI: ", polishedFactFromAI);
 //call post api for linkdin
 postOnLinkedIn(polishedFactFromAI);

const polishedForTwitter = await beautifyFactIntoTweetWithOpenAI(cleanedFact);


//POst on twitter
const { data: createdTweet } = await twitterClient.v2.tweet(
  `${polishedForTwitter}\nDownload-${APP_LINK_SHORT}`
);
console.log("Tweet", createdTweet.id, ":", createdTweet.text);


};



const beautifyFactIntoLinkdinPostWithOpenAI = async (fact) => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Write a nice linkdin post for the following fact; keep it less than 100 words; use hashtags;make it engaging; use emojis; ask rhetorical questions- ${fact}`,
      },
    ],
  });
  
  return chatCompletion.data.choices[0].message.content;
};

const beautifyFactIntoTweetWithOpenAI = async (fact) => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Write a tweet using maximum 200 characters for following fact; use emoji; make it fun; ${fact}`,
      },
    ],
  });
  if (chatCompletion.data.choices[0].message.content.length > 215) {
    return fact;
  }
  return chatCompletion.data.choices[0].message.content;
};

// Start script
main().catch((err) => {
  console.error(err);
  process.exit(1); // Retry Job Task by exiting the process
});