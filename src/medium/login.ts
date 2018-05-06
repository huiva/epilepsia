import { Page } from 'puppeteer';
import { ScenarioStep } from '../scenario';

export const login = (user: string, pw: string) => (page: Page): ScenarioStep[] => [
  ['Go to medium', () => page.goto('https://medium.com')],
  [
    'Wait and close popup',
    async () => {
      await page.waitFor(1000);
      const icon = await page.$('.svgIcon-use');
      await icon.click();
    },
  ],
  [
    'Click Sign in',
    async () => {
      const signIn = await page.$x('//*[(text() = "Sign in")]');
      await signIn[0].click();
    },
  ],
  [
    'Click sign in with google',
    async () => {
      const withGoogle = await page.$x('//*[(text() = "Sign in with Google")]');
      await withGoogle[0].click();
    },
  ],
  [
    'Wait for email input',
    async () => {
      await page.waitForNavigation();
      await page.waitForSelector('[type=email]', { visible: true });
    },
  ],
  [
    'Enter email',
    async () => {
      const email = await page.$('[type=email]');
      await email.type(user);
    },
  ],
  [
    'Click next',
    async () => {
      const emailNext = await page.$x('//*[(text() = "Next")]');
      await emailNext[0].click();
    },
  ],
  [
    'Wait for password input',
    async () => {
      await page.waitForSelector('[type=password]', { visible: true });
      await page.waitFor(3000);
    },
  ],
  [
    'Enter password',
    async () => {
      const pwInput = await page.$('[type=password]');
      await pwInput.type(pw);
    },
  ],
  [
    'Click next',
    async () => {
      const emailNext = await page.$x('//*[(text() = "Next")]');
      await emailNext[0].click();
    },
  ],
  [
    'Wait for medium loaded',
    async () => {
      await page.waitForNavigation();
      await page.waitFor(3000);
    },
  ],
  [
    'Wait for .avatar',
    async () => {
      await page.waitFor('.avatar');
    },
  ],
];
