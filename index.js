const cron = require("node-cron");
const axios = require("axios");

function getCompanyOffers(company) {
  axios
    .get(`http://localhost:3000/getOpenJobsInfos/` + company)
    .then((result) => {
      return result;
    })
    .catch((err) => console.log("error"));
}

async function generateCompanyMessage(company) {
  return {
    companyName: company,
    broadcastSlackMessage: {
      blocks: [
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hi {{firstName}} 👋 This is your weekly update on new position openings at `{{companyName}}` \n@here are last week's openings:",
          },
        },
        {
          "...": "...",
        },
      ],
    },
    nbrOpenJobThisWeek: 4,
  };
}

cron.schedule("0 9 * * 1", () => {
  const companies = ["Swile", "Backmarket", "Ledger"];

  const companyMessages = companies.map((company) => {
    return generateCompanyMessage(company);
  });

  return JSON.stringify(companyMessages);
});
