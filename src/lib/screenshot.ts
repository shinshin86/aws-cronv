import http from "http";
import path from 'path';
import puppeteer from 'puppeteer';

const port = 3000;

// screenshot browser size
const width = 1440;
const height = 900;

export const generate = async (html: string): Promise<string> => {
    const server = http.createServer((_: any, response: any) => {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
    
        response.end(html);
    });

    server.listen(port);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width,
        height
    })
    
    await page.goto(`http://localhost:${port}`);

    const savePath = path.join(process.cwd(), "screenshot.png")
    await page.screenshot({ path: savePath});
    await browser.close();
    
    server.close();

    return savePath;
}