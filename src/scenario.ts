import { join } from 'path';
import { Page } from 'puppeteer';

export type EmptyFn = () => void;
export type PromiseFn = () => Promise<void>;
export type StepFn = EmptyFn | PromiseFn;
export type NamedFn = [string, StepFn];
export type UnnamedFn = [StepFn];
export type ScenarioStep = StepFn | NamedFn;

export function isNamedFn(arg: any): arg is NamedFn {
  return arg[0] && arg[1];
}

export function isUnnamedFn(arg: any): arg is UnnamedFn {
  return arg[0] && !arg[1];
}

export function isStepFn(arg: any): arg is StepFn {
  return arg instanceof Function;
}

const screensPath = 'screens';

export async function s(page: Page, ...others: ScenarioStep[]): Promise<void> {
  let suffix = '';
  for (const other of others) {
    let fn: StepFn;
    if (isNamedFn(other)) {
      suffix = other[0];
      // tslint:disable-next-line:no-console
      console.log(other[0]);
      fn = other[1];
    } else if (isUnnamedFn(other)) {
      fn = other[0];
    } else if (isStepFn(other)) {
      fn = other;
    } else {
      throw new Error('Not supported step type');
    }

    await fn();
    const date = new Date();
    const screenPath = join(screensPath, `${date.getTime()}-${suffix}.png`);
    await page.screenshot({ path: screenPath });
  }
}
