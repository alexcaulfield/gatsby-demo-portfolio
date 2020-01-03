const dotenv = require('dotenv')
const result = dotenv.config({
  path: `${__dirname}/.env`
})
const googleApiKey = process.env.PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

const env_creds = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: googleApiKey,
}

module.exports = {
  siteMetadata: {
    title: 'SpongeBob Squarepants\' Portfolio Website',
  },
  plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-less',
  {
    resolve: 'gatsby-source-google-sheets',
    options: {
        spreadsheetId: '1QnlyFO5yQivMoGOMXNEAWAZsqokykORa76RHLMJAMts',
        worksheetTitle: 'resume',
        credentials: env_creds
    }
  },
  ],
}
