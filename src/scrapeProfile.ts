import { LinkedinScraper, Profile } from '@harvestapi/scraper';
import { createConcurrentQueuesPerKey } from './utils/queue.js';
import { LRUCache } from 'lru-cache';
import { Actor, ActorPricingInfo } from 'apify';

const profileCache = new LRUCache({ maxSize: 500 });

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

    if (profileCache.has(linkedinUrl)) {
      profile = profileCache.get(linkedinUrl) as Profile;
    } else {
      const result = await scraper
        .getProfile({
          url: linkedinUrl,
          short: true,
        })
        .catch((err) => {
          console.warn(`Failed to fetch profile ${linkedinUrl}: ${err.message}`);
          return null;
        });
      if (result?.element?.id) {
        if (pricingInfo.isPayPerEvent) {
          Actor.charge({ eventName: 'main-profile' });
        }
        profileCache.set(linkedinUrl, result.element);
        profile = result.element;
      }
    }

    return { profile };
  },
);
