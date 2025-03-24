import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    defaultViewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
    },
  });

  try {
    const page = await browser.newPage();
    
    // 首页截图
    await page.goto('http://localhost:5173/fuel/');
    await wait(2000); // 等待页面加载
    await page.screenshot({
      path: path.join(__dirname, '../docs/assets/home.png'),
      fullPage: true,
    });

    // 图表页面截图
    await page.goto('http://localhost:5173/fuel/#/chart');
    await wait(2000); // 等待页面加载
    await page.screenshot({
      path: path.join(__dirname, '../docs/assets/chart.png'),
      fullPage: true,
    });

    // 设置页面截图
    await page.goto('http://localhost:5173/fuel/#/preference');
    await wait(2000); // 等待页面加载
    await page.screenshot({
      path: path.join(__dirname, '../docs/assets/settings.png'),
      fullPage: true,
    });

    // 记录页面截图
    await page.goto('http://localhost:5173/fuel/');
    await wait(2000); // 等待页面加载
    await page.evaluate(() => {
      const addButton = document.querySelector('button.add-record');
      if (addButton) {
        addButton.click();
      }
    });
    await wait(1000); // 等待表单显示
    await page.screenshot({
      path: path.join(__dirname, '../docs/assets/record.png'),
      fullPage: true,
    });

    console.log('所有截图已完成！');
  } catch (error) {
    console.error('截图过程中出错：', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots(); 