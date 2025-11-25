import { ApiItemResponse, Company, LinkedinScraper, Profile } from '@harvestapi/scraper';
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
    actorType,
  }: {
    scraper: LinkedinScraper;
    linkedinUrl: string;
    actorType: 'profile' | 'company';
    pricingInfo: ActorPricingInfo;
  }): Promise<{ profile: Profile | Company | null }> => {
    let profile: Profile | Company | null = null;

    try {
      if (profileCache.has(linkedinUrl)) {
        profile = profileCache.get(linkedinUrl) as Profile;
      } else {
        let result: ApiItemResponse<Profile | Company> | null = null;
        if (actorType === 'company') {
          result = await scraper.getCompany({
            url: linkedinUrl,
          });
        } else {
          result = await scraper.getProfile({
            url: linkedinUrl,
            short: true,
          });
        }

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
