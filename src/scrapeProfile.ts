import { LinkedinScraper, Profile } from '@harvestapi/scraper';
import { createConcurrentQueuesPerKey } from './utils/queue.js';
import { LRUCache } from 'lru-cache';
import { Actor, ActorPricingInfo } from 'apify';

const profileCache = new LRUCache({
  maxSize: 500,
  sizeCalculation: () => {
    return 1;
  },
});

export const scrapeProfile = createConcurrentQueuesPerKey(
  (args) => args.linkedinUrl,
  1,
  async ({
    scraper,
    linkedinUrl,
    pricingInfo,
  }: {
    scraper: LinkedinScraper;
    linkedinUrl: string;
    pricingInfo: ActorPricingInfo;
  }): Promise<{ profile: Profile | null }> => {
    let profile: Profile | null = null;

    try {
      if (profileCache.has(linkedinUrl)) {
        profile = profileCache.get(linkedinUrl) as Profile;
      } else {
        const result = await scraper.getProfile({
          url: linkedinUrl,
          short: true,
        });

        if (result?.element?.id) {
          if (pricingInfo.isPayPerEvent) {
            Actor.charge({ eventName: 'main-profile' });
          }
          profileCache.set(linkedinUrl, result.element);
          profile = result.element;
        }
      }
    } catch (error) {
      console.error(`Failed to scrape profile at ${linkedinUrl}: ${(error as Error).message}`);
    }

    return { profile };
  },
);
