# Gatsby + Semantic UI Resume Demo

This tutorial is supposed to walk you through setting up a serverless resume site

### Demo is live at [https://quizzical-torvalds-1345f0.netlify.com/](https://quizzical-torvalds-1345f0.netlify.com/)

## Setting up the [Gatsby/Semantic UI starter](https://github.com/pretzelhands/gatsby-starter-semantic-ui)

This starter is a bit out of date, so I've added some extra steps to getting set up

Get Gatsby CLI

`npm install --global gatsby-cli`

Run from your dev folder

`gatsby new gatsby-semantic-resume https://github.com/pretzelhands/gatsby-starter-semantic-ui`

Then update the `package.json` to remove all references to **next**

```  
"dependencies": {
    "gatsby": "^2.18.4",
    "gatsby-plugin-less": "^2.0.0-beta.5",
    "gatsby-plugin-react-helmet": "^3.1.16",
    "less": "^3.8.1",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-helmet": "^5.2.0",
    "semantic-ui-less": "^2.3.3",
    "semantic-ui-react": "^0.82.1"
  },
```  
  
Now we have to reinstall node modules before we startup the project. First, remove `package-lock.json` and then run

```
cd gatsby-semantic-resume
rm -rf node_modules
npm install
```

Now start the project with `gatsby develop`

## Starting Development + Connecting to Google Sheets

Update `gatsby-config.js` to have the correct title

Create a Google Sheet to pull data from and then follow [these steps](https://www.twilio.com/blog/2017/03/google-spreadsheets-and-javascriptnode-js.html)

1. Go to the Google APIs Console.
2. Create a new project.
3. Click `Enable API`. Search for and enable the Google Drive API.
4. `Create credentials` for a `Web Server` to access `Application Data`.
5. Name the service account and grant it a `Project` Role of `Editor`.
6. Download the JSON file.
7. Copy the JSON file to your code directory and rename it to `client_secret.json`
 

There is one last required step to authorize your app, and it’s easy to miss!

Find the `client_email` inside `client_secret.json`. Back in your spreadsheet, click the `Share` button in the top right, and paste the client email into the People field to give it edit rights. Hit Send.

Then run the command `yarn add gatsby-source-google-sheets`

And then update `gatsby-config.js` to add (under `plugins`)

```
...
{
    resolve: 'gatsby-source-google-sheets',
    options: {
        spreadsheetId: 'get this from the sheet url',
        worksheetTitle: 'ie the name in the worksheet tab',
        credentials: require('./path-to-credentials-file.json')
    }
},
...
```

Now kill the server and restart it with `gatsby develop`

If you get the error `Cannot find module 'babel-runtime/regenerator`

I ran these commands (in my root directory)

```
nvm install node --reinstall-packages-from=node
npm i npm@latest -g
npm i babel-runtime
```

Now you should be able to go to `http://localhost:8000/___graphql` and access `allGoogleSheetResumeRow` where `resume` is the name of your worksheet in the Google Sheet

## Using GraphQL to query the Google Sheet

Create a Resume Container that will do the GraphQL querying and pass the results to the display component

The query should look something like this

```
  const data = useStaticQuery(graphql`
    query resumeQuery {
      allGoogleSheetResumeRow {
        edges {
          node {
			whateverFieldsYou
			haveInYourDoc
          }
        }
      }
    }
  `)
```

You can then pass that data into whatever component you decide to render your work experience

## Finishing touches + Deploy (via GitHub and Netlify)

Now you have a nice page that has all your resume related information, so feel free to add any necessary bells and whistles.

To get your project ready to go, you want to move your config into a `.env` file that won't get added via git (by updating `.gitignore`

Update your `.env` file to include the important stuff from the Google Drive credentials (`PRIVATE_KEY` and `CLIENT_EMAIL`), where you just store it as key=value pairs

```
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPR1VAT3INF0\n-----END PRIVATE KEY-----\n"
CLIENT_EMAIL="test-123@name-of-app.iam.gserviceaccount.com"
```

Then update your `gatsby_config.js` to import from `.env`

```
const dotenv = require('dotenv')
const result = dotenv.config({
  path: `${__dirname}/.env`
})
const googleApiKey = process.env.PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

const env_creds = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: googleApiKey,
}
...
  {
    resolve: 'gatsby-source-google-sheets',
    options: {
        spreadsheetId: '1QnlyFO5yQivMoGOMXNEAWAZsqokykORa76RHLMJAMts',
        worksheetTitle: 'resume',
        credentials: env_creds
    }
  },
...
``` 

And add this dependency to your `package.json` `dependencies`

`"gatsby-source-google-sheets": "^1.1.1",`

Now you can push your changes to GitHub and Deploy to Netlify (you can store the environment varibles in the Netlify console so they're kept secret)
