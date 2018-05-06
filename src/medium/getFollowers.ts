import { Page } from 'puppeteer';
import { ScenarioStep } from '../scenario';

export const getFollowers = (user: string) => (page: Page): ScenarioStep[] => [
  [
    'Go to user page',
    async () => {
      const url = `https://medium.com/${user}/followers`;
      await page.goto(url);
    },
  ],
  ['Wait whil user page loaded', () => page.waitFor('.hero-title')],
  [
    'Load all followers',
    async () => {
      await page.evaluate(() => {
        function scrolltoBottom(height: number): Promise<void> {
          if (this.document.body.scrollHeight > height) {
            height = this.document.body.scrollHeight;
            this.scrollBy(0, height);
            return new Promise((resolve) => {
              setTimeout(() => {
                scrolltoBottom(height).then(resolve);
              }, 3000);
            });
          } else {
            return Promise.resolve();
          }
        }
        return scrolltoBottom(0);
      });
    },
  ],
  [
    'Get all followers',
    async () => {
      const followers = await page.evaluate(function() {
        return Array.from(this.document.querySelectorAll('.streamItem--userPreview')).map(
          (userCard: any) => userCard.querySelector('a').href.match(/\@.*/)[0],
        );
      });

      // tslint:disable-next-line:no-console
      followers.forEach((x: any) => console.log(x));
    },
  ],
];
