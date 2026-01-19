"use client";
import { Fragment } from "react";

import FaqContentItem from "./FaqContentItem";
import CurvyRect, { Connector } from "@/components/shared/layout/curvy-rect";
import { FAQ } from "@/marketing-global/types";

const data: { label: string; items: FAQ[] }[] = [
  {
    label: "General",
    items: [
      {
        id: "what-is-firecrawl",
        question: "What is Firecrawl?",
        answer:
          "Firecrawl turns entire websites into clean, LLM-ready markdown or structured data. Scrape, crawl and extract the web with a single API. Ideal for AI companies looking to empower their LLM applications with web data",
      },
      {
        id: "what-sites-work",
        question: "What sites work?",
        answer:
          "Firecrawl is best suited for business websites, docs and help centers. We currently don't support social media platforms.",
      },
      {
        id: "who-can-benefit-from-using-firecrawl",
        question: "Who can benefit from using Firecrawl?",
        answer:
          "Firecrawl is tailored for LLM engineers, data scientists, AI researchers, and developers looking to harness web data for training machine learning models, market research, content aggregation, and more. It simplifies the data preparation process, allowing professionals to focus on insights and model development.",
      },
      {
        id: "is-firecrawl-open-source",
        question: "Is Firecrawl open-source?",
        answer:
          "Yes, it is. You can check out the repository on GitHub. Keep in mind that this repository is currently in its early stages of development. We are in the process of merging custom modules into this mono repository.",
      },
      {
        id: "what-is-the-difference-between-firecrawl-and-other-web-scrapers",
        question:
          "What is the difference between Firecrawl and other web scrapers?",
        answer:
          "Firecrawl is designed with reliability and AI-ready data in mind. We focus on delivering data reliably and in a LLM-ready format - so you can spend less tokens and build better AI applications.",
      },
      {
        id: "what-is-the-difference-between-the-open-source-version-and-the-hosted-version",
        question:
          "What is the difference between the open-source version and the hosted version?",
        answer:
          "Firecrawl's hosted version features Fire-engine which is our proprietary scraper that takes care of proxies, anti-bot mechanisms and more. It is an intelligent scraper designed to get the data you need - reliably. The hosted version also allows for actions (interacting with the page before scraping), a dashboard for analytics, and it is 1 API call away.",
      },
    ],
  },
  {
    label: "Scraping & Crawling",
    items: [
      {
        id: "how-does-firecrawl-handle-dynamic-content-on-websites",
        question: "How does Firecrawl handle dynamic content on websites?",
        answer:
          "Unlike traditional web scrapers, Firecrawl is equipped to handle dynamic content rendered with JavaScript. It ensures comprehensive data collection from all accessible subpages, making it a reliable tool for scraping websites that rely heavily on JS for content delivery.",
      },
      {
        id: "why-is-it-not-crawling-all-the-pages",
        question: "Why is it not crawling all the pages?",
        answer:
          "There are a few reasons why Firecrawl may not be able to crawl all the pages of a website. Some common reasons include rate limiting, and anti-scraping mechanisms, disallowing the crawler from accessing certain pages. If you're experiencing issues with the crawler, please reach out to our support team at help@firecrawl.com.",
      },
      {
        id: "can-firecrawl-crawl-websites-without-a-sitemap",
        question: "Can Firecrawl crawl websites without a sitemap?",
        answer:
          "Yes, Firecrawl can access and crawl all accessible subpages of a website, even in the absence of a sitemap. This feature enables users to gather data from a wide array of web sources with minimal setup.",
      },
      {
        id: "what-formats-can-firecrawl-convert-web-data-into",
        question: "What formats can Firecrawl convert web data into?",
        answer:
          "Firecrawl specializes in converting web data into clean, well-formatted markdown. This format is particularly suited for LLM applications, offering a structured yet flexible way to represent web content.",
      },
      {
        id: "how-does-firecrawl-ensure-the-cleanliness-of-the-data",
        question: "How does Firecrawl ensure the cleanliness of the data?",
        answer:
          "Firecrawl employs advanced algorithms to clean and structure the scraped data, removing unnecessary elements and formatting the content into readable markdown. This process ensures that the data is ready for use in LLM applications without further preprocessing.",
      },
      {
        id: "is-firecrawl-suitable-for-large-scale-data-scraping-projects",
        question:
          "Is Firecrawl suitable for large-scale data scraping projects?",
        answer:
          "Absolutely. Firecrawl offers various pricing plans, including a Scale plan that supports scraping of millions of pages. With features like caching and scheduled syncs, it's designed to efficiently handle large-scale data scraping and continuous updates, making it ideal for enterprises and large projects.",
      },
      {
        id: "does-it-respect-robots-txt",
        question: "Does it respect robots.txt?",
        answer:
          "Yes, Firecrawl's crawl endpoint respects the rules set in a website's robots.txt file. If you notice any issues with the way Firecrawl interacts with your website, you can adjust the robots.txt file to control the crawler's behavior. Firecrawl user agent name is 'FirecrawlAgent'. If you notice any behavior that is not expected, please let us know at help@firecrawl.com.",
      },
      {
        id: "what-measures-does-firecrawl-take-to-handle-web-scraping-challenges-like-rate-limits-and-caching",
        question:
          "What measures does Firecrawl take to handle web scraping challenges like rate limits and caching?",
        answer:
          "Firecrawl is built to navigate common web scraping challenges, including stealth proxies, rate limits, and smart wait. It smartly manages requests and employs techniques to minimize bandwidth usage and avoid triggering anti-scraping mechanisms, ensuring reliable data collection.",
      },
      {
        id: "does-firecrawl-handle-captcha-or-authentication",
        question: "Does Firecrawl handle captcha or authentication?",
        answer:
          "Firecrawl avoids captcha by using stealth proxies. When it encounters captcha, it attempts to solve it automatically, but this is not always possible. We are working to add support for more captcha solving methods. Firecrawl can handle authentication by providing auth headers to the API.",
      },
    ],
  },
  {
    label: "API Related",
    items: [
      {
        id: "where-can-i-find-my-api-key",
        question: "Where can I find my API key?",
        answer:
          "Click on the dashboard button on the top navigation menu when logged in and you will find your API key in the main screen and under API Keys.",
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        id: "is-firecrawl-free",
        question: "Is Firecrawl free?",
        answer:
          "Firecrawl is free for the first 500 scraped pages (500 free credits). After that, you can upgrade to our Hobby, Standard or Growth plans for more credits and higher rate limits.",
      },
      {
        id: "is-there-a-pay-per-use-plan-instead-of-monthly",
        question: "Is there a pay-per-use plan instead of monthly?",
        answer:
          "We currently do not offer a pay-per-use plan, instead you can upgrade to our Hobby, Standard or Growth plans for more credits and higher rate limits.",
      },
      {
        id: "do-credits-roll-over-to-the-next-month",
        question: "Do credits roll over to the next month?",
        answer:
          "In short, no — credits do not roll over to the next month/year. Credit packs follow their own billing period. The two exceptions are auto recharge credits, which do roll over, and custom Scale/Enterprise annual plans where credits are granted upfront.",
      },
      {
        id: "how-many-credits-do-scraping-and-crawling-cost",
        question: "How many credits do scraping and crawling cost?",
        answer:
          "Scraping and crawling usually cost 1 credit per webpage or 1 credit per PDF page. There are advanced features available which cost additional credits. Check out the credits table on the pricing page for more details.",
      },
      {
        id: "do-you-charge-for-failed-requests",
        question: "Do you charge for failed requests?",
        answer:
          "We do not usually charge for any failed requests. The only exception is requests using FIRE-1 agent are always billed, even if the request fails. Please contact support at help@firecrawl.com if you notice something wrong.",
      },
      {
        id: "what-payment-methods-do-you-accept",
        question: "What payment methods do you accept?",
        answer:
          "We accept payments through Stripe which accepts most major credit cards, debit cards, and PayPal.",
      },
    ],
  },
];

type Props = {
  showKeys?: string[];
};

export default function FaqContent(props: Props) {
  const dataFiltered = props.showKeys
    ? data.filter((group) => props.showKeys?.includes(group.label))
    : data;

  return (
    <div>
      {dataFiltered.map((group, index) => (
        <Fragment key={group.label}>
          {index !== 0 && (
            <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
              <CurvyRect
                className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
                allSides
              />
            </div>
          )}
          <div className="lg:flex relative -mt-1" key={group.label}>
            <div className="h-1 top-0 w-full left-0 absolute bg-border-faint" />
            <div className="h-1 top-79 lg:top-112 w-full left-0 absolute bg-border-faint" />
            <div className="w-1 lg-max:hidden top-0 h-full left-1/2 absolute bg-border-faint" />
            <div className="text-title-h5 flex-1 relative">
              <div className="px-20 lg:px-64 py-24 lg:py-40 relative">
                {group.label}
              </div>
              <Connector className="absolute -right-[11px] top-[102px] lg-max:hidden" />
              <CurvyRect className="overlay lg:hidden" allSides />
            </div>

            <div className="lg:flex-1 lg:pt-111 lg:-ml-[0.5px] relative lg-max:-mt-1">
              <CurvyRect className="overlay lg:hidden" allSides />
              {group.items.map((item) => (
                <FaqContentItem item={item} key={item.id} />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
