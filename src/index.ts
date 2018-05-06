import { launch } from 'puppeteer';
import { getFollowers } from './medium/getFollowers';
import { login } from './medium/login';
import { s } from './scenario';
import { mediumEmail, mediumPw, mediumUser } from './sensitive';

(async () => {
  const browser = await launch();
  const page = await browser.newPage();

  const scenario = () =>
    s(page, ...login(mediumEmail, mediumPw)(page), ...getFollowers(mediumUser)(page));

  try {
    await scenario();
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  } finally {
    await browser.close();
  }
})();
