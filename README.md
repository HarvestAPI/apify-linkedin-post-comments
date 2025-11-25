## LinkedIn Post Comments Mass scraper

Our powerful tool helps you extract LinkedIn post comments, as well as comment social activities such as likes and reactions without compromising security or violating platform policies. It is very helpful for engagement analysis and outreach purposes.

### Key Benefits

- No cookies or account required: Access comments data without sharing cookies or risking account restrictions
- Low pricing: $2 per 1k comments.
- Fast response times deliver data in seconds 🚀
- No caching, fresh data.

## How It Works

- (required) List of post URLs to scrape.

Other params (optionally):

- `maxItems` - Maximum number of comments to scrape per each post. If you set to 0, it will scrape all available pages or up to 100 pages (each page 10 items) per post.
- `postedLimit` - Limit comments to those posted within a certain timeframe. Supported values: `24h`, `week`, `month`, `3months`, `6months`, `year`. Default is to scrape all comments.
- `profileScraperMode` - Set this to `main` to enrich comment actors with main profile data (position, profile picture, etc.). Note that this will increase the cost of the actor as profile scraping is charged separately.

### Data You'll Receive

- Comment URL
- Comment text
- Number of replies, likes, shares
- Reaction type counts (like, love, insightful, etc.)
- Actor's name
- Actor's LinkedIn URL
- Actor's position
- Actor's profile picture URL
- Comment creation date

### Sample output data

Here is the example comment output of this actor:

```json
{
  "type": "comment",
  "id": "7331190065471078400",
  "linkedinUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7328838056403173380?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7328838056403173380%2C7331190065471078400%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287331190065471078400%2Curn%3Ali%3Aactivity%3A7328838056403173380%29",
  "commentary": "❤️",
  "createdAt": "2025-05-22T05:31:58.534Z",
  "numComments": 0,
  "numShares": null,
  "numImpressions": null,
  "reactionTypeCounts": [
    {
      "type": "LIKE",
      "count": 1
    }
  ],
  "actor": {
    "id": "ACoAAFsE9LEBl7BKtsoGeoDZz0IvKfmiGgiEtX8",
    "name": "Leek Gai",
    "linkedinUrl": "https://www.linkedin.com/in/leek-gai-3a94a6367",
    "position": "Student at Bugema University",
    "pictureUrl": "https://media.licdn.com/dms/image/v2/D4D03AQFWtueH_5zHYQ/profile-displayphoto-shrink_800_800/B4DZb4IP4IG0Ac-/0/1747919636435?e=1753315200&v=beta&t=ykKTPu2Mkc6i9uyRaHXm8yziqM3dkd18zLaRQ8dCLdg",
    "picture": {
      "url": "https://media.licdn.com/dms/image/v2/D4D03AQFWtueH_5zHYQ/profile-displayphoto-shrink_800_800/B4DZb4IP4IG0Ac-/0/1747919636435?e=1753315200&v=beta&t=ykKTPu2Mkc6i9uyRaHXm8yziqM3dkd18zLaRQ8dCLdg",
      "width": 800,
      "height": 800,
      "expiresAt": 1753315200000
    },
    "author": false
  },
  "createdAtTimestamp": 1747891918534,
  "pinned": false,
  "contributed": false,
  "edited": false,
  "postId": "7328838056403173380"
}
```

## Linkedin Post Comment API

The actor stores results in a dataset. You can export data in various formats such as CSV, JSON, XLS, etc. You can scrape and access data on demand using API.

### Support and Feedback

We continuously enhance our tools based on user feedback. If you encounter technical issues or have suggestions for improvement:

- Create an issue on the actor’s Issues tab in Apify Console
- Chat with us on our [Discord server](https://discord.gg/TGA9k9u2gE)
- Or contact us at contact@harvest-api.com
