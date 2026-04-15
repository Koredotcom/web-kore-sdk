export interface SearchResult {
  id: string;
  snippet: string;
  source: {
    title: string;
    type: string;
    url?: string;
    fileType?: string;
    imageUrls?: Array<string>;
  };
}
export const getResultsWebsocket = {
  "results": {
    "web": {
      "data": [
        {
          "docId": "fc-78f33c2d-7d6e-46d1-8090-3ac2a7a44751",
          "recordTitle": "8 Tips for Long-Distance Real Estate Investing",
          "recordUrl": "https://www.propstream.com/real-estate-investor-blog/8-tips-for-long-distance-real-estate-investing",
          "chunkResults": [
            "chk-c039066b-d903-4d63-831b-1c0ea34f73a3",
            "chk-d85a2fe7-9bf0-4812-be79-a3a577433d07"
          ]
        },
        {
          "docId": "fc-35d40d3b-01b2-427e-8d0c-b3a03a524292",
          "recordTitle": "PropStream's July Recap",
          "recordUrl": "https://www.propstream.com/news/propstreams-july-recap",
          "chunkResults": [
            "chk-e8c2d5d2-d200-457d-a2a2-c2f0f939d903"
          ]
        },
        {
          "docId": "fc-30548300-b07e-42f5-b562-088851be6588",
          "recordTitle": "Lead List Spotlight: Pre-Foreclosures",
          "recordUrl": "https://www.propstream.com/news/quick-list-spotlight-pre-foreclosures",
          "chunkResults": [
            "chk-010eded1-c726-466f-af37-4f4398efd750"
          ]
        },
        {
          "docId": "fc-c7a1cf85-bca5-4a4e-8994-bb01d70dff16",
          "recordTitle": "How to Market Effectively To Leads",
          "recordUrl": "https://www.propstream.com/news/how-to-market-effectively-to-leads",
          "chunkResults": [
            "chk-eb5beeb0-f66f-4aed-8d8d-83c3f72d8266"
          ]
        },
        {
          "docId": "fc-09d6efc1-3c3c-477c-bd14-88a4d9271957",
          "recordTitle": "Wholesale, Fix & Flip or Buy & Hold: Which Strategy Is Best for Me?",
          "recordUrl": "https://www.propstream.com/real-estate-investor-blog/wholesale-fix-flip-or-buy-hold-which-strategy-is-best-for-me",
          "chunkResults": [
            "chk-d798a44a-8e34-4f63-977a-55ca2d493275"
          ]
        },
        {
          "docId": "fc-f1092952-f973-4174-a7ca-2d5ec0ad0f15",
          "recordTitle": "The Great Pursuit for a Better Life: What This Means for REIs",
          "recordUrl": "https://www.propstream.com/real-estate-investor-blog/the-great-pursuit-for-a-better-life-what-this-means-for-reis",
          "chunkResults": [
            "chk-487c4d09-9e5a-45e9-b972-cd1434c466a4"
          ]
        }
      ],
      "doc_count": 6
    },
    "file": {
      "data": [
        {
          "docId": "fc-88383f53-75b9-5424-aac5-16a857dc8a83",
          "recordTitle": "Cisco.pdf",
          "recordUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=1305533597&s=Ikd2YVgrMW1ndGFUVjZPNjRMQ3Jxc1Y3YzBPTjlwZ0pxSk1OTm9rVFQ3WHc9Ig%24%24#page=1",
          "chunkResults": [
            "chk-8e51ea65-11af-41d8-9c63-5daf5147a58c",
            "chk-dafb1b66-8a03-4043-8e2e-ba748fdb6ba3",
            "chk-86a6c3e8-808d-4271-87a4-a61e56fb705a"
          ]
        }
      ],
      "doc_count": 1
    }
  },
  "facets": [
    {
      "fieldName": "sys_file_type",
      "multiselect": true,
      "name": "Sys File Type",
      "subtype": "value",
      "buckets": [
        {
          "key": "html",
          "chunk_count": 16,
          "doc_count": 10
        },
        {
          "key": "pdf",
          "chunk_count": 26,
          "doc_count": 1
        },
        {
          "key": "excel",
          "chunk_count": 8,
          "doc_count": 1
        },
        {
          "key": "csv",
          "chunk_count": 16,
          "doc_count": 1
        },
        {
          "key": "word",
          "chunk_count": 12,
          "doc_count": 1
        }
      ]
    }
  ],
  "tabFacet": {
    "fieldName": "sourceType",
    "buckets": [
      {
        "key": "file",
        "name": "Files",
        "chunk_count": 26,
        "doc_count": 1
      },
      {
        "key": "web",
        "name": "Web Results",
        "chunk_count": 16,
        "doc_count": 10
      },
      {
        "key": "word",
        "name": "Word Documents",
        "chunk_count": 12,
        "doc_count": 1
      },
      {
        "key": "excel",
        "name": "Excel Documents",
        "chunk_count": 8,
        "doc_count": 1
      },
      {
        "key": "csv",
        "name": "CSV Documents",
        "chunk_count": 16,
        "doc_count": 1
      }
    ]
  },
  "chunk_result": [
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "TqxymJgBsXKxTCaQc7Tp",
      "_score": 2.2893677,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "8 Tips for Long-Distance Real Estate Investing",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-78f33c2d-7d6e-46d1-8090-3ac2a7a44751",
        "recordUrl": "https://www.propstream.com/real-estate-investor-blog/8-tips-for-long-distance-real-estate-investing",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/long%20distance.png",
        "updatedOn": "2025-08-11T09:24:43.211Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-c039066b-d903-4d63-831b-1c0ea34f73a3",
        "createdOn": "2025-08-11T09:24:43.211Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": " frequent communication is always important when managing real estate, especially when you’re far away from your tenants and team. Fortunately, there’s never been a better time to communicate long distance. With video calls, texts, and other digital channels, you can keep an open line of communication with tenants or outsource it to a property manager who can give you regular updates. Set a regular communication schedule with them so everyone stays on the same page. ## 5. Visit the Property Periodically Just because you’re an absentee landlord doesn’t mean you can’t visit your properties.  Sometimes, visiting your investments to see them in person is worthwhile as it can provide a better sense of their value, condition, and needed maintenance. Of course, your property manager can handle this for you, too, but checking in helps keep them accountable. Plus, it can improve your relationships with tenants. Consider scheduling an annual visit to each of your properties to check in.  ## 6. Establish Clear Processes and Protocols Without clear processes for managing properties remotely, your business may struggle. Set up systems for marketing rental units, screening tenants, collecting rent, responding to maintenance requests and emergencies, and more. Efficient standard operating procedures (SOPs) that comply with local regulations can help minimize errors and prevent important tasks from falling through the cracks. ## 7. Monitor Financial Performance Keep a close eye on your investments’ financial metrics. That way, if they no longer serve your goals or fail to perform, you can explore exit strategies. One easy way to track your rental income, property expenses, and ROI is to invest in accounting software. It can automatically calculate your returns and provide a dashboard to check investment performances quickly.  Financial performance data can be used over time to adjust your investing strategy by optimizing operations, cutting costs, or selling.  ## 8. Stay Informed About Local Laws and Regulations Real estate regulations vary by state, county, and city, so it's essential to do your homework on your market’s rules. Ensure you comply with any laws regarding zoning, building codes, rental licensing, home insurance, and landlord-tenant relationships. Need more clarification about the rules? Consult a local real estate attorney. They can educate you and help you avoid costly fines. ## Find Your Next Long-Distance Investment with PropStream! Ready to start your long-distance real estate investing adventure?  Use PropStream to find your first property. With data for 160+ million properties nationwide and hundreds of search filters, you’re sure to find an excellent opportunity in your desired market. ### Try PropStream for 7 Days Free! Activate your 7-day free trial and enjoy 50 complimentary leads. Get Started ##### What are the benefits of long-distance real estate investing? Long-distance real estate investing can provide access to markets with higher potential returns, better cash flow, more landlord-friendly laws, and geographic diversification.  ##### How do I choose the best market for long-distance real estate investing? Look for markets with strong economic growth, high rental demand, low vacancy rates, reasonable property prices, and favorable local regulations. Real estate lead generation tools like PropStream can help you identify markets that meet your investment criteria. ##### How often should I visit my long-distance investment properties? With a good property management team, you may never need to visit your long-distance investments. However, visiting each property at least once per year is wise to keep your team accountable and strengthen relationships with tenants. ##### What should I look for in a local property management team? Trustworthy and reputable professionals. Carefully vet your team by checking their online reviews and requesting past client references. ##### What is the biggest mistake first-time long-distance real estate investors make? The biggest mistake is investing in out-of-state real estate too quickly. What may look like an attractive investment on the surface may not be. Identifying good investment opportunities requires a deep understanding of a market’s dynamics and regulations. That’s why it's vital to build a reliable local team and leverage real estate data software. ##### What does PropStream do? PropStream helps you automate property lead generation. With the right search filters and Lead Automator, you can quickly find viable investment opportunities and receive updates whenever a new property that meets your investment criteria comes on the market. ### Subscribe to PropStream's Newsletter Share Published by PropStream July 29, 2024  Buy and Hold 09.23.2024 PropStream ### Multifamily vs. Single-Family: Which Investment Strategy Fits You? Buy and Hold 07.8.2024 PropStream ### How to Calculate ROI on Rental Property",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [
          "chk-d85a2fe7-9bf0-4812-be79-a3a577433d07"
        ],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.2893677,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-c039066b-d903-4d63-831b-1c0ea34f73a3"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "Fc5ymJgBbBEKqEulcJFc",
      "_score": 2.2864053,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "PropsyStream's July Recap",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-35d40d3b-01b2-427e-8d0c-b3a03a524292",
        "recordUrl": "https://www.propstream.com/news/propstreams-july-recap",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/ps%20recap%20%281%29.png",
        "updatedOn": "2025-08-11T09:24:43.210Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-e8c2d5d2-d200-457d-a2a2-c2f0f939d903",
        "createdOn": "2025-08-11T09:24:43.210Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": "PropStream News and Real Estate Investment Blog » Latest Articles Categories    * PropStream Announcement   * Tips   * Market Analysis   * PropStream Tutorials   * Definitions   * PropStream Academy   * Real Estate Agent Tips   * REI Tips   * Brokers   * Buy and Hold   * Lenders   * MLS   * Other   * PropStream for Agents   * PropStream for Investors\n\nPropStream Announcement Aug 02, 2024 • PropStream # PropStream's July Recap There have been plenty of exciting things going on this month on PropStream's blog, Academy, and social media channels. Here are some highlights: ## PropStream's Blog ### PropStream to Attend Inman Connect 2024 in Las Vegas We announced our attendance at Inman Connect 2024 and shared details about the event.  Learn More ### PropStream Named a Finalist for Inman Innovator Award PropStream was named a finalist for the Inman Innovator Award for the category: **Most Innovative Lead-Generation Solution**! Learn More ### Timing Real Estate: An Exclusive Chat With Brian Tepfer & Kevin Harrington PropStream's CEO, Brian Tepfer, sat down with original shark Kevin Harrington to discuss the topic of timing real estate in an exclusive interview. Learn More ### 6 Most Frequently Asked Lunch and Listings Questions We explored the 6 most frequently asked questions in our Lunch and Listings weekly live webinar. Learn More ### PropStream to Attend the Tom Ferry 2024 Success Summit We announced our attendance at the 2024 Tom Ferry Success Summit in August, along with booth and event details.  Learn More ## Social Media Over on our social media channels, we've shared some great tidbits and tips for real estate professionals! Here are some of our highlights: ## PropStream's Free Downloadable Persona Guide We created a free downloadable personas guide to help real estate professionals learn how to use personas to drive their marketing efforts. Click here to access the form to download our guide for FREE! Previous Next ## 11 Steps for Listing a Property We posted a note-style checklist with 11 steps for listing a property as a seller's agent. To learn more, click here. Previous Next ## Why PropStream? In this clip from his interview with Kevin Harrington, PropStream's CEO, Brian Tepfer, explained why PropStream is the premier real estate data platform. > View this post on Instagram > A post shared by PropStream Software (@propstream) ## PropStream's Interest Rate Filters Resident PropStream guru Burton explained the importance of PropStream's Interest Rate filters in today's dynamic market.  > View this post on Instagram > A post shared by PropStream Software (@propstream) ## PropStream Academy In July, the PropStream Academy celebrated its third anniversary! To recognize it, PropStream hosted a giveaway (which is still going on until August 23rd, 2024).  _Learn more about PropStream Academy's Power of 3 Giveawayhere._ At PropStream, we're always looking for new and creative ways to educate our audience on the real estate industry while finding unique ways to engage. To stay on top of PropStream's news and posts:   * Create a free PropStream Academy account   * Follow us on our social media channels   * Subscribe to our Newsletter (the form is below)\n\n_Psst! Head over toour links page to easily navigate to PropStream's resources!_ ### Subscribe to PropStream's Newsletter Share Published by PropStream August 2, 2024  PropStream Announcement 07.31.2025 PropStream ### Join Us for a Three-Day Live Webinar Series: Connect to Close PropStream Announcement 07.30.2025 PropStream ### PropStream to Speak at the SoCal JV Event PropStream Announcement 07.21.2025 PropStream ### PropStream Announces a New Visual Experience for its Map Search",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.2864053,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-e8c2d5d2-d200-457d-a2a2-c2f0f939d903"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "TaxymJgBsXKxTCaQc7Tp",
      "_score": 2.285503,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "8 Tips for Long-Distance Real Estate Investing",
        "nextChunkIds": [
          "chk-c039066b-d903-4d63-831b-1c0ea34f73a3"
        ],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-78f33c2d-7d6e-46d1-8090-3ac2a7a44751",
        "recordUrl": "https://www.propstream.com/real-estate-investor-blog/8-tips-for-long-distance-real-estate-investing",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/long%20distance.png",
        "updatedOn": "2025-08-11T09:24:43.211Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-d85a2fe7-9bf0-4812-be79-a3a577433d07",
        "createdOn": "2025-08-11T09:24:43.211Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": "Real Estate Investor Blog » Latest Articles Categories    * REI Tips   * Buy and Hold   * Market Analysis   * Definitions   * PropStream for Investors   * Fix and Flip   * Wholesaling   * Tips   * PropStream Tutorials\n\nBuy and Hold Jul 29, 2024 • PropStream # 8 Tips for Long-Distance Real Estate Investing _Disclaimer: PropStream does not offer financial advice. We recommend consulting with legal and/or financial professionals and doing your due diligence before investing in any properties._ _** Key Takeaways:**_   ---     * _Long-distance real estate investing can expand your investment opportunities, offer higher potential returns, and help diversify your portfolio._   * _Building a reliable local team and leveraging technology are essential for managing properties effectively from a distance._   * _Regular communication, periodic property visits, and staying informed about local laws help ensure the smooth operation of your long-distance investments._     Many real estate investors start locally, but what if your market is too competitive, with high property values or strict regulations? Investing beyond your backyard—long-distance real estate investing—can be a smarter, more strategic move. Dive in to discover why and explore eight tips to succeed with this approach! ## Table of Contents   ---   Why Invest in Real Estate Long-Distance?   1. Research the Market Thoroughly   2. Build a Reliable Local Team   3. Leverage Technology   4. Communicate Regularly   5. Visit the Property Periodically   6. Establish Clear Processes and Protocols   7. Monitor Financial Performance   8. Stay Informed About Local Laws and Regulations  Find Your Next Long-Distance Investment with PropStream   ## Why Invest in Real Estate Long Distance? Investing in real estate long-distance can widen your investment prospects.  For example, you may find markets with higher potential returns, better cash flow, or more landlord-friendly laws.  Furthermore, long-distance real estate investing can help you diversify geographically. Instead of owning property in only one market, you can own property in multiple, minimizing your exposure to a downturn in any one. That said, long-distance real estate investing has its challenges. It may be harder to learn the market, find reliable contractors, and communicate across time zones.  To mitigate these and other potential risks, follow these tips: ## 1. Research the Market Thoroughly  Before you settle on a market to invest in, carefully study it. Learn its unique dynamics and trends so you can recognize a good deal when you see one. Here are some factors to consider:   * Property values   * Average rent   * Average vacancy rates   * Population growth   * Local employers   * Unemployment rates   * School ratings   * Crime rates   * Transportation options\n\nOverall, look for a market with a growing population, thriving economy, strong rental demand, low operating costs, and reasonable property prices. Of course, no market is perfect, but you might be surprised at the opportunities outside your local market.  ## 2. Build a Reliable Local Team Once you’ve chosen a market, it’s time to build your team.  This is extremely important when investing long-distance because you’re not there to manage properties in person.  Your real estate team can include local agents, contractors, lawyers, lenders, insurance providers, property managers, and other investors. Each should serve a purpose—whether that’s managing your properties, executing renovations, facilitating transactions, or educating you on the market’s nuances and local regulations.  Above all, your team members should be trustworthy. Ask your existing network for referrals, check online reviews, and look out for candidates with a strong reputation. ## 3. Leverage Technology Another must for managing properties from afar is technology.  These days, there are many software options for streamlining everyday landlord tasks, such as rent collection, tenant screening, maintenance requests, and recordkeeping. There’s even virtual tour technology that lets you inspect and show properties remotely.  Consider investing in some of these tools to automate repetitive tasks and free up time to find and analyze more real estate deals. ## 4. Communicate Regularly Clear and frequent communication is always important when managing real estate, especially when you’re far away from your tenants and team. Fortunately, there’s never been a better time to communicate long distance. With video calls, texts, and other digital channels, you can keep an open line of communication with tenants or outsource it to a property manager who can give you regular updates. Set a regular communication schedule with them so everyone stays on the same page. ## 5. Visit the Property Periodically Just",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.285503,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-d85a2fe7-9bf0-4812-be79-a3a577433d07"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "M6xxmJgBsXKxTCaQ2LSu",
      "_score": 2.270358,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-8ad3e1b3-2398-5d59-82c6-44e6dce18572",
        "nextChunkIds": [
          "chk-e57071e1-3050-4e9a-8f5b-ee7335c95a06",
          "chk-6ac8f597-06a0-432b-8086-792454183609",
          "chk-86a6c3e8-808d-4271-87a4-a61e56fb705a"
        ],
        "pageNumber": 1,
        "docId": "fc-88383f53-75b9-5424-aac5-16a857dc8a83",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "chunkId": "chk-8e51ea65-11af-41d8-9c63-5daf5147a58c",
        "createdOn": "2025-08-11T09:24:03.154Z",
        "sourceUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=8434756078&s=Im5hL3h6UVhNWjkvZm94czlweS8zRncwcGVMNnlsT1UycCtxdm41ZHB2cUU9Ig%24%24",
        "chunkText": "Important disclosures appear on the last page of this report.    The Henry Fund      Henry B. Tippie College of Business    Jack Wells [john­t­wells@uiowa.edu]    Cisco Systems, Inc. (CSCO)  March 18, 2021    Information Technology – Networking Equipment  Stock Rating  BUY    Investment Thesis  Target Price  $58 ­ 64    We recommend a buy rating for Cisco Systems with an 18­28% upside. Cisco is  a leader in the Networking Equipment industry where they are well positioned  to grow  as they shift  their  strategy  to software  and subscription revenues.  Increased enterprise spending on network security will also drive performance  as Cisco is the leading cybersecurity vendor globally.    Drivers of Thesis    • Cisco’s  shift  in  strategy  to  more  software  and  subscriptions  will  drive  recurring  revenues  to digitizing enterprises,  leading  to  a 5­year  revenue  CAGR of 2.58%    • Companies,  governments,  and  educational  institutions  are  increasing  security spending as attacks become more prevalent and costly. We predict  a 9.08% CAGR for Cisco’s Security revenues over the next 5 years    • Cisco will benefit from a rebound in enterprise spending on IT infrastructure  as the pandemic subsides and employees return to the workplace    • New CFO Scott Herren has a  successful history of  transforming business  models to Software­as­a­Service, subscriptions, and cloud­based software.  We forecast Cisco’s transition to increase gross margins at a 1% CAGR      Risks to Thesis    • A  slower­than­expected  pandemic  recovery  would  halt  spending  on  infrastructure updates    • Legacy product gross margins have declined since 2011, and total product  revenues have been  relatively  flat over  last 5  years.  Failure  to  innovate  could hurt growth and increase pressure on margins    Henry Fund DCF  $64  Henry Fund DDM  $58  Relative P/E 2021  $68  Price Data    Current Price  $49  52wk Range  $33 – 50  Consensus 1yr Target  $54  Key Statistics    Market Cap (B)  $206.8  Shares Outstanding (M)  4,222  Institutional Ownership  73.53%  Beta  0.91  Dividend Yield 2.91% Est. 5yr Growth  6.00%  Price/Earnings (TTM)  17.93  Price/Earnings (FY1)  20.28  Price/Sales (TTM)  11.64  Price/Book (mrq)  5.15  Profitability    Operating Margin  27.63%  Profit Margin  22.75%  Return on Assets (TTM)  11.82%  Return on Equity (TTM)  33.40%    Earnings Estimates  Year  2018  2019  2020  2021E  2022E  2023E    EPS  HF est.    $0.02  ­    $2.63  ­    $2.65  ­    $2.47  $2",
        "pageChunks": [
          "chk-8e51ea65-11af-41d8-9c63-5daf5147a58c",
          "chk-e57071e1-3050-4e9a-8f5b-ee7335c95a06"
        ],
        "extractionMethodType": "token",
        "extractionStrategy": "Default Strategy",
        "recordTitle": "Cisco.pdf",
        "sys_content_type": "file",
        "sys_source_name": "Default Directory",
        "recordUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=1305533597&s=Ikd2YVgrMW1ndGFUVjZPNjRMQ3Jxc1Y3YzBPTjlwZ0pxSk1OTm9rVFQ3WHc9Ig%24%24#page=1",
        "updatedOn": "2025-08-11T09:24:03.154Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "sys_file_type": "pdf",
        "sourceType": "file",
        "downloadable_url": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?n=3438637155&s=IjdsbUpZMlR4bWpwRWpDUytJQmRqREZtclRCRi9USFdsMnNEaVNJTnI5SVU9Ig$$",
        "extractionMethod": "text",
        "sourceName": "Default Directory",
        "previousChunkIds": [],
        "chunkQualified": true,
        "score": 2.270358,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-8e51ea65-11af-41d8-9c63-5daf5147a58c"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "KYlymJgBTpubbDGIcLF6",
      "_score": 2.2694812,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "Lead List Spotlight: Pre-Foreclosures",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-30548300-b07e-42f5-b562-088851be6588",
        "recordUrl": "https://www.propstream.com/news/quick-list-spotlight-pre-foreclosures",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-QuickListSpotlightPreForeclosures@2x.jpg",
        "updatedOn": "2025-08-11T09:24:43.210Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-010eded1-c726-466f-af37-4f4398efd750",
        "createdOn": "2025-08-11T09:24:43.210Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": " any additional search filters you’d like_\n\nFrom there, any pre-foreclosure properties in your search region will appear in your menu in minutes! You can easily save any properties that pique your interest to a marketing list within the platform, which you can use to contact the property owner when ready. When you’re trying to find motivated sellers as a real estate investor or agent, pre-foreclosure leads should be at the top of your list. Try PropStream for 7 days free and enjoy 50 complimentary pre-foreclosure leads! Share Published by PropStream March 13, 2023",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [
          "chk-eb27529f-e3e1-437a-bf68-97293e26ddeb"
        ],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.2694812,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-010eded1-c726-466f-af37-4f4398efd750"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "B85xmJgBbBEKqEul1pHA",
      "_score": 2.2684078,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-8ad3e1b3-2398-5d59-82c6-44e6dce18572",
        "nextChunkIds": [
          "chk-243ad8dc-aec0-4476-a0fe-f72970080e08",
          "chk-a310ccd9-1ae5-4bcc-8473-2928a4260913",
          "chk-0f5fa586-5435-4814-a30d-b4827888cb37"
        ],
        "pageNumber": 11,
        "docId": "fc-88383f53-75b9-5424-aac5-16a857dc8a83",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "chunkId": "chk-dafb1b66-8a03-4043-8e2e-ba748fdb6ba3",
        "createdOn": "2025-08-11T09:24:03.181Z",
        "sourceUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=9617670362&s=IkM0SGd4OFFMYzAyc2lFUnJLNmFweUtBM0pVUlpKMWtuRlhkc1ZHQzR2bVk9Ig%24%24",
        "chunkText": "service providers is an investment negative because of  the  higher  relative  revenues  coming  from  the  service  provider  market  versus  enterprise  market,  which  was  shown in Figure 9.     In  conclusion,  Cisco  remains  the  titan  in  the  Communication Equipment  industry and we believe they  are the best positioned going forward. Their scale, product  portfolio, and continued transformation into software and  subscriptions as­a­service position them well to capitalize  on secular opportunities in multicloud environments, 5G,  and network security. However, Cisco is increasingly facing  competition  from  newer  and  foreign  competitors.  It  is  especially important to keep track of competitors who are  excelling  in multicloud  and  software  areas. We  believe  Arista could potentially be a much bigger player in the long  term if Cisco does not continue to innovate in those areas.  Arista’s innovation in software­driven cloud networking is  helping them take some market share in sub­segments of  the  industry  that  are  poised  for  high  growth.  Their  exposure  to  hyperscale  cloud  companies  and  service  providers  will  help  them  in  the  long  term.  Chinese  competitors  like  Huawei  and  HP3  also  continue  to  innovate and are helped by their exposure to 5G networks.  If governments and companies were to ease up on their",
        "pageChunks": [
          "chk-f08af4c7-e8bc-485f-bfa7-c76fe0cca975",
          "chk-dafb1b66-8a03-4043-8e2e-ba748fdb6ba3"
        ],
        "extractionMethodType": "token",
        "extractionStrategy": "Default Strategy",
        "recordTitle": "Cisco.pdf",
        "sys_content_type": "file",
        "sys_source_name": "Default Directory",
        "recordUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=5244882631&s=ImNtYjhVTG5naXlydC9PMXdLRlhyZnJZRjhiL3BsWEpuRFpmeks0V3p4NDg9Ig%24%24#page=11",
        "updatedOn": "2025-08-11T09:24:03.181Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "sys_file_type": "pdf",
        "sourceType": "file",
        "downloadable_url": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?n=3438637155&s=IjdsbUpZMlR4bWpwRWpDUytJQmRqREZtclRCRi9USFdsMnNEaVNJTnI5SVU9Ig$$",
        "extractionMethod": "text",
        "sourceName": "Default Directory",
        "previousChunkIds": [
          "chk-214b02a8-cc6b-4bbb-a93a-3348105b3dad",
          "chk-1ffce5f8-f817-4b1b-a9e3-4bfad5a2e744",
          "chk-f08af4c7-e8bc-485f-bfa7-c76fe0cca975"
        ],
        "chunkQualified": true,
        "score": 2.2684078,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-dafb1b66-8a03-4043-8e2e-ba748fdb6ba3"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "MIlymJgBTpubbDGId7Fn",
      "_score": 2.261382,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "How to Market Effectively To Leads",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-c7a1cf85-bca5-4a4e-8994-bb01d70dff16",
        "recordUrl": "https://www.propstream.com/news/how-to-market-effectively-to-leads",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-marketleads2.webp",
        "updatedOn": "2025-08-11T09:24:43.211Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-eb5beeb0-f66f-4aed-8d8d-83c3f72d8266",
        "createdOn": "2025-08-11T09:24:43.211Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": "PropStream News and Real Estate Investment Blog » Latest Articles Categories    * PropStream Announcement   * Tips   * Market Analysis   * PropStream Tutorials   * Definitions   * PropStream Academy   * Real Estate Agent Tips   * REI Tips   * Brokers   * Buy and Hold   * Lenders   * MLS   * Other   * PropStream for Agents   * PropStream for Investors\n\nFeb 07, 2022 • PropStream # How to Market Effectively To Leads You’ve generated a few marketing lists, and you’re ready to reach out to your prospects. Before you hit “send” on that postcard, email, or text message or make a cold call, you’ll want to make a plan for communicating with the homeowners. How you present yourself, your skills, and your proposal is critical for grabbing their attention. Not sure how to start your marketing campaign? Let us help! ## Do Your Research Before speaking to a contact, perform a deep dive into the property in question. A “Property Details” page is available for each property on our platform. Using the Property Details page, you can learn the value of a property (in non-disclosure states, the sale price is estimated, in disclosure states, the sale price is collected through public record data), the homeowner’s name, how much they owe, and so much more! After you’ve learned everything there is to know about a property, print out a report of your findings right within the software. If you’re meeting with your prospect in person, you can go over the data to make a case for your business proposal. ## Cold-Calling and Emailing One mistake many entrepreneurs make is using the same generic pitch to every prospect.  Sure, you can save some time and create a script for emailing or calling, but make sure you can manipulate it to address a specific contact based on their unique circumstance. A great way to do this is by creating lists organized by the motivation to sell. From there, you can create custom email templates with language that’s appropriate for each situation if you don’t have the time to write out individual emails. ## PropStream as an All-in-One Marketing Solution Now that you know how to prepare for your outreach, it’s time to figure out which medium you want to use to gather your contact information and send marketing materials. PropStream offers intuitive marketing tools right within the software to help you save time and money! Our marketing features include:   * **Skip tracing:** Skip tracing allows you to locate any email addresses and phone numbers available for your leads.    * **Email Campaigns:** Use your contact information to start an email campaign within the software and monitor email clickthroughs.   * **Postcards:** Postcards are a great way to market yourself while staying on a lead’s radar. We offer many pre-designed postcard templates or the ability to design your own.   * **Custom landing page:** Create a free web page to direct prospects to so they can learn more about your experience/credentials.\n\n_Use marketing features as frequently as you’d like to work with your monthly budget. To see our complete pricing list,__click here_ _!_ ## Start Closing Deals Using Your Marketing Lists! Having access to PropStream’s robust datasets allows you to do the bulk of the research for a homeowner before you’ve even spoken with them.  Don’t just _tell_ them how you can help them by negotiating a deal; _show_ them the proof by printing a report for their property. Want to learn more about direct marketing as a real estate professional? Check out our free Academy course, _Real Estate Direct Marketing 101_! Share Published by PropStream February 7, 2022",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.261382,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-eb5beeb0-f66f-4aed-8d8d-83c3f72d8266"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "MKxxmJgBsXKxTCaQ2LSu",
      "_score": 2.2604575,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-8ad3e1b3-2398-5d59-82c6-44e6dce18572",
        "nextChunkIds": [
          "chk-f5c5c91e-af08-47ab-b8c3-cd44fed98380",
          "chk-422cea00-6d35-4474-bd86-a22587224bae",
          "chk-23bc5034-d743-4c7e-99ba-aecc561fe320"
        ],
        "pageNumber": 2,
        "docId": "fc-88383f53-75b9-5424-aac5-16a857dc8a83",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "chunkId": "chk-86a6c3e8-808d-4271-87a4-a61e56fb705a",
        "createdOn": "2025-08-11T09:24:03.158Z",
        "sourceUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=6735319218&s=InFmN3I1UXp5NGUrWEthYUJicDduVkpqQzVodTFIUHBvZmpvc1NHayt2OE09Ig%24%24",
        "chunkText": "  the  cloud.1  They  include hardware embedded with software, as well as the  Cisco Digital Network Architecture (DNA) subscription that  provides security, automation, and analytics. Cisco’s Nexus  9000  data  center  switches  are made  for  scalability  and  security  across  both  traditional  and  private  and  public  cloud data centers.    The Routing portfolio connects public and private campus,  data  center,  and  branch  networks.  Cisco  integrated  its  Software­Defined Wide Area Network  (SD­WAN)  into  its  new Cisco 8000 routing portfolio to support the evolution  to  100G  and  400G  connectivity  speeds.1  SD­WAN  is  designed to directly connect branches to the cloud.    The  Wireless  portfolio  includes  indoor  and  outdoor  wireless coverage for the use of applications. Cisco has a  Catalyst  portfolio  of  access  points,  and  they  acquired  Meraki  in 2012  to expand  its portfolio. Meraki products  are all delivered via cloud and help Cisco reach midmarket  customers.1    The Data Center  portfolio  includes  Cisco HyperFlex  and  the Cisco Unified Computing System, which are designed  to extend convergence from data centers to the edge and  multicloud. The portfolio also  includes Cisco  Intersight, a  SaaS management platform for the data center systems.1    Applications    The Applications  segment  consists of  software offerings  that  provide  collaboration,  Internet of  Things  (IoT),  and  analytics  functions  through  the  infrastructure platforms.  Cisco’s  applications  solutions  are  offered  as  software  licenses  and  as­a­service.  We  forecast  applications  to",
        "pageChunks": [
          "chk-6ac8f597-06a0-432b-8086-792454183609",
          "chk-86a6c3e8-808d-4271-87a4-a61e56fb705a"
        ],
        "extractionMethodType": "token",
        "extractionStrategy": "Default Strategy",
        "recordTitle": "Cisco.pdf",
        "sys_content_type": "file",
        "sys_source_name": "Default Directory",
        "recordUrl": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?e=1754905655&n=6861214488&s=ImN4T2c4Y2oxYjRpSmZRWUpZaktkQUdqRk96MkVwbHVGZ01xN1JUTUJWenc9Ig%24%24#page=2",
        "updatedOn": "2025-08-11T09:24:03.158Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "sys_file_type": "pdf",
        "sourceType": "file",
        "downloadable_url": "https://platform.kore.ai/api/getMediaStream/findly/f-5e4426ef-2204-58d4-84db-3da8a008b04c.pdf?n=3438637155&s=IjdsbUpZMlR4bWpwRWpDUytJQmRqREZtclRCRi9USFdsMnNEaVNJTnI5SVU9Ig$$",
        "extractionMethod": "text",
        "sourceName": "Default Directory",
        "previousChunkIds": [
          "chk-8e51ea65-11af-41d8-9c63-5daf5147a58c",
          "chk-e57071e1-3050-4e9a-8f5b-ee7335c95a06",
          "chk-6ac8f597-06a0-432b-8086-792454183609"
        ],
        "chunkQualified": true,
        "score": 2.2604575,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-86a6c3e8-808d-4271-87a4-a61e56fb705a"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "K4lymJgBTpubbDGIcrEp",
      "_score": 2.2593155,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "Wholesale, Fix & Flip or Buy & Hold: Which Strategy Is Best for Me?",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-09d6efc1-3c3c-477c-bd14-88a4d9271957",
        "recordUrl": "https://www.propstream.com/real-estate-investor-blog/wholesale-fix-flip-or-buy-hold-which-strategy-is-best-for-me",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/Imported_Blog_Media/5de954234b9e5a1a939dec53_which-strategy-is-best-for-me.jpg",
        "updatedOn": "2025-08-11T09:24:43.212Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-d798a44a-8e34-4f63-977a-55ca2d493275",
        "createdOn": "2025-08-11T09:24:43.212Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": " the risk and invest in a piece of real estate. No one said that real estate is a risk-free game. The good news is, there are plenty of great tools out there for analyzing the market and planning your investments well. Whether you're in for the long haul or a quick flip, PropStream® has you covered with the data and technology you need to get the job done. ‍ Share Published by PropStream December 5, 2019  REI Tips 08.6.2025 PropStream ### Should I Start an LLC for Real Estate Investing? Market Analysis 07.2.2025 PropStream ### Midwest Update: 5 Business-Friendly Cities with REI Opportunities Market Analysis 06.11.2025 PropStream ### The Latest Foreclosure Wave—What This Means for Investors",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [
          "chk-71ed7571-59aa-4805-ade7-d5b4357bbf4c"
        ],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.2593155,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-d798a44a-8e34-4f63-977a-55ca2d493275"
      }
    },
    {
      "_index": "answer_index",
      "_type": "_doc",
      "_id": "F85ymJgBbBEKqEuldZGO",
      "_score": 2.2574782,
      "_ignored": [
        "chunkText.keyword"
      ],
      "_source": {
        "sourceId": "fs-a26cab87-4419-503d-812f-b0feb62a855c",
        "recordTitle": "The Great Pursuit for a Better Life: What This Means for REIs",
        "nextChunkIds": [],
        "sys_content_type": "web",
        "sys_source_name": "propstream",
        "docId": "fc-f1092952-f973-4174-a7ca-2d5ec0ad0f15",
        "recordUrl": "https://www.propstream.com/real-estate-investor-blog/the-great-pursuit-for-a-better-life-what-this-means-for-reis",
        "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
        "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-GreatPursuitForABetterLife.webp",
        "updatedOn": "2025-08-11T09:24:43.210Z",
        "sourceAcl": [
          "*"
        ],
        "chunkType": "Text",
        "chunkId": "chk-487c4d09-9e5a-45e9-b972-cd1434c466a4",
        "createdOn": "2025-08-11T09:24:43.210Z",
        "sourceUrl": "https://www.propstream.com",
        "chunkText": "Real Estate Investor Blog » Latest Articles Categories    * REI Tips   * Buy and Hold   * Market Analysis   * Definitions   * PropStream for Investors   * Fix and Flip   * Wholesaling   * Tips   * PropStream Tutorials\n\nFeb 28, 2022 • PropStream # The Great Pursuit for a Better Life: What This Means for REIs Where Americans once dreamed of the hustle and bustle of big city living, many are now seeing the draw of more affordable cities in rural areas. Recent trends show that the cities with the best housing markets are no longer The Big Apple or LA. Instead, cities like Tampa, FL, and Charlotte, NC, are at the top of the list for hot markets in the United States! So, why the sudden shift in lifestyle? We took a look at some of the reasons Americans are migrating to less populated areas: ## More Affordable Housing In the more populated cities like NYC or Boston, residents pay a hefty monthly payment for any type of housing. _To put it in perspective,__living in New York City costs 129% more_ _than the national average in the United States!_ Many big-city dwellers are seeing the perks of living in cities where they can get more “bang for their buck” regarding rent and mortgage costs. For example, a top housing market right now is Tampa, FL. Even with rent prices on the rise, a 900 sq. ft apartment in Tampa, FL, costs around $1,762 per month. As a comparison, the average cost for a 700 sq. ft apartment in Manhattan, NY, is $4,140. ## More Time Outside Another trend we’re noticing with the most popular US cities is the temperature. Cities like Tampa, Orlando, and Jacksonville (FL) are sitting at the top of the list for most desirable cities, along with other hotter climates like Phoenix, AZ, and San Antonio, TX. Since the quarantine mandates brought on by the COVID-19 pandemic, many people realize they want to live where there is more to do outdoors! Along with the lower cost of living, the most desirable cities in the United States right now offer relatively warm temperatures year-round. ## More Remote-Friendly Opportunities Mandatory closures created temporary remote working conditions for a variety of companies. For some of these companies, temporary remote work became permanent! Remote work has increased significantly since the start of the pandemic, and this shift is expected to double with around 36.2 million Americans working from home by 2025. With remote work becoming normalized, many workers aren’t required to live in the same city or state as their headquarters, causing more flexibility to live in more affordable locations. ## How Does This Impact Investors? This shift creates more opportunities with fewer financial requirements for a real estate investor (particularly a buy-and-hold investor). This trend is excellent for starting investors who can’t invest millions in big-city real estate! Since the best areas to invest in real estate are currently more affordable, the barrier of entry is lower. With these rising cities experiencing an influx of residents and a lack of housing, this creates the perfect opportunity for investors to snag off-market properties from motivated sellers. Additionally, buy-and-hold investors can capitalize on the rising rent prices in these hot locations. **_Pro Tip:_**_Try using our Heat Map tool to find hot rental markets within a city!_ ## Which Growing Cities Will You Invest In? Maybe Americans want more space for their money, or they want to spend more time outdoors. Regardless of why this trend is happening, rising interest in more affordable cities creates an opportunity for real estate investors to capitalize on. Want to start browsing off-market properties and investing in one of these hot markets? Try a 7-day PropStream free trial today to enjoy our vast library of REI tools! Share Published by PropStream February 28, 2022",
        "sys_file_type": "html",
        "sourceType": "web",
        "pageChunks": [],
        "extractionMethodType": "token",
        "extractionMethod": "text",
        "sourceName": "propstream",
        "previousChunkIds": [],
        "extractionStrategy": "Default Strategy",
        "chunkQualified": true,
        "score": 2.2574782,
        "sentToLLM": true,
        "usedInAnswer": false,
        "chunk_id": "chk-487c4d09-9e5a-45e9-b972-cd1434c466a4"
      }
    }
  ],
  "totalSearchResults": 6
}
export const getRelevantResultsOld = {
  "template": {
    "results": getResultsWebsocket.results,
    "originalQuery": "morgan stanley ",
    "answer_details": {
      "query": "morgan stanley ",
      "requestType": "answer_search",
      "response": {
        "answer": "The question cannot be answered as the required information is not present.",
        "answer_payload": {
          "center_panel": {
            "type": "citation_snippet",
            "data": [
              {
                "snippet_title": "",
                "snippet_content": [
                  {
                    "answer_fragment": "The question cannot be answered as the required information is not present.",
                    "sources": [
                      {
                        "title": "",
                        "url": "",
                        "chunk_id": "",
                        "doc_id": "",
                        "source_id": "",
                        "source_type": "",
                        "image_url": ""
                      }
                    ]
                  }
                ],
                "snippet_type": "generative_model",
                "snippet_model_name": "",
                "meta_info": {},
                "timeTaken": "2505.00ms",
                "message": "Presented Answer",
                "isPresentedAnswer": true,
                "score": "0.0000%"
              }
            ]
          }
        }
      },
      "resultType": "Answer",
      "indexPipelineId": "fip-2a84a493-7669-5e07-bb0c-5a011e946b13",
      "searchIndexId": "sidx-a499d96e-2e24-521a-b69f-35b5c68905f1",
      "searchRequestId": "fsh-93142236-46c6-55b1-930e-e612db4a7fd4",
      "queryPipelineId": "fqp-5e367027-f37b-566a-b0c9-9ad3ccb03d0a"
    },
    "facets": getResultsWebsocket.facets,
      "tabFacet": {
        "fieldName": "sourceType",
        "buckets": [
          {
            "key": "file",
            "name": "Files",
            "chunk_count": 26,
            "doc_count": 1
          },
          {
            "key": "web",
            "name": "Web Results",
            "chunk_count": 16,
            "doc_count": 10
          },
          {
            "key": "word",
            "name": "Word Documents",
            "chunk_count": 12,
            "doc_count": 1
          },
          {
            "key": "excel",
            "name": "Excel Documents",
            "chunk_count": 8,
            "doc_count": 1
          },
          {
            "key": "csv",
            "name": "CSV Documents",
            "chunk_count": 16,
            "doc_count": 1
          }
        ]
      },
    "chunk_result": getResultsWebsocket.chunk_result,
    "totalSearchResults": getResultsWebsocket.totalSearchResults
  },
  "templateType": "search",
  "requestId": "fsh-93142236-46c6-55b1-930e-e612db4a7fd4",
  "queryPipelineId": "fqp-5e367027-f37b-566a-b0c9-9ad3ccb03d0a",
  "indexPipelineId": "fip-2a84a493-7669-5e07-bb0c-5a011e946b13"
}

export const getRelevantResults ={
  "template": {
    "results": {
      "web": {
        "data": [
          {
            "docId": "fc-ab497493-04b1-45b8-8bcf-0eeb5fd3dabf",
            "recordTitle": "PropStream Real Estate Investment Software",
            "recordUrl": "https://www.propstream.com/404#:~:text=Sorry%2C%20the%20page%20you%20were%20looking%20for%20at%20this%20URL%20was%20not%20found",
            "chunkResults": [
              "chk-7b5d9f66-4935-4b34-8198-545407777f36"
            ]
          },
          {
            "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
            "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
            "recordUrl": "https://www.propstream.com/about-us#:~:text=PropStream%20Intelligence%3A%20An%20AI%2Dpowered%20platform%20to%20help%20real%20estate%20professionals%20find%20and%20evaluate%20leads%20through%3A%20Property%20Condition%20Analysis%20%28Photo%20AI%29%3A%20Evaluates%20property%20condition%20from%20MLS%20photos%20Foreclosure%20Factor%20Data%3A%20Predict%20a%20property%27s%20likelihood%20of%20going%20into%20default%20Estimated%20Wholesale%20Value%20Calculation%3A%20Suggests%20optimal%20contract%20prices%20for%20wholesalers",
            "chunkResults": [
              "chk-d6443a91-e8da-4e1b-83b7-e00ffb2c7e42",
              "chk-4bfddb5f-d2db-4d0e-affe-b0c8c59a6bbe",
              "chk-778bd234-786d-4829-b739-51db6e18ce56"
            ]
          },
          {
            "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
            "recordTitle": "PropStream Real Estate Investment Software",
            "recordUrl": "https://www.propstream.com#:~:text=Get%20the%20latest%20news%20and%20information%20from%20PropStream%20to%20power%20your%20business",
            "chunkResults": [
              "chk-e2b3c714-cbfa-4dc4-a96a-56511bb52540",
              "chk-6eeb229e-a020-49d9-bd26-40337f52af2d",
              "chk-85137d42-c854-4d2f-a90f-b11bf5a0ed34"
            ]
          },
          {
            "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
            "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
            "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=While%20you%E2%80%99re%20eager%20to%20get%20started%2C%20you%E2%80%99ll%20find%20it%20helpful%20to%20take%20some%20time%20to%20get%20familiar%20with%20the%20PropStream%20ecosystem%20so%20you%20can%20get%20the%20most%20out%20of%20your%20free%20trial",
            "chunkResults": [
              "chk-2c67052b-3d3b-469f-9d3a-f749efdbd483",
              "chk-4a78524b-e9c0-47ee-8306-1fe1ebd6ce1f",
              "chk-8a2c0da1-c673-41c6-acd4-b3be48a3ca75"
            ]
          }
        ],
        "doc_count": 4
      },
      "json": {
        "data": [
          {
            "docId": "fc-78f33c2d-7d6e-46d1-8090-3ac2a7a44751",
            "recordTitle": "Real Estate complex table",
            "recordUrl": "https://www.propstream.com/real-estate-investor-blog/8-tips-for-long-distance-real-estate-investing",
            "chunkResults": [
              "chk-c039066b-d903-4d63-831b-1c0ea34f7312"
            ]
          }
        ],
        "doc_count": 1
      }
    },
    "originalQuery": "What support options are available in PropStream?",
    "answer_details": {
      "query": "What support options are available in PropStream?",
      "requestType": "answer_search",
      "response": {
        "answer": "PropStream provides expert customer support, so if you have a particular question or need help, try one of the following: Check our resources page for videos or join a Live Webinar, Read about the latest updates from our blog and discover the most useful tools for Real Estate Investors, Call our customer support team toll-free: (877) 204-9040, Email: support@propstream.com, Chat live with support on our platform. Simply click the support button in the left-hand navigation.",
        "isValidAnswer": true,
        "answer_payload": {
          "center_panel": {
            "type": "citation_snippet",
            "data": [
              {
                "snippet_title": "",
                "snippet_content": [
                  {
                    "answer_fragment": "\nPropStream provides expert customer support, so if you have a particular question or need help, try one of the following: Check our resources page for videos or join a Live Webinar, Read about the latest updates from our blog and discover the most useful tools for Real Estate Investors, Call our customer support team toll-free: (877) 204-9040, Email: support@propstream.com, Chat live with support on our platform. Simply click the support button in the left-hand navigation.",
                    "sources": [
                      {
                        "title": "Getting Started with Propstream - 7 Day Free Trial",
                        "url": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=PropStream%20provides%20expert%20customer%20support%2C%20so%20if%20you%20have%20a%20particular%20question%20or%20need%20help%2C%20try%20one%20of%20the%20following%3A%20Check%20our%20resources%20page%20for%20videos%20or%20join%20a%20Live%20Webinar%28https%3A%2F%2Fwww",
                        "chunk_id": "chk-4a78524b-e9c0-47ee-8306-1fe1ebd6ce1f",
                        "doc_id": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
                        "source_id": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
                        "source_type": "web",
                        "image_url": [
                          "https://www.propstream.com/hs-fs/hubfs/propstream-real-estate-data-getting-started-3.webp?width=1200&name=propstream-real-estate-data-getting-started-3.webp"
                        ],
                        "createdOn": "2025-11-18T10:39:15.273Z"
                      }
                    ]
                  }
                ],
                "snippet_type": "generative_model",
                "snippet_model_name": "",
                "meta_info": {
                  "createdOn": "2025-11-18T10:39:15.259Z"
                },
                "timeTaken": "3248.00ms",
                "message": "Presented Answer",
                "isPresentedAnswer": true,
                "score": "0.0000%"
              }
            ]
          }
        }
      },
      "streamingResponse": {},
      "resultType": "Answer",
      "chunk_result": [],
      "indexPipelineId": "fip-ed3c4086-2b0e-5549-8c92-8148472867df",
      "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
      "searchRequestId": "fsh-3a7df8c0-f451-5eff-bb11-b8eff80bd667",
      "queryPipelineId": "fqp-4aa193e6-a5fa-51be-9556-f434eebc3b81"
    },
    "facets": [
      {
        "fieldName": "fileType",
        "name": "File Type",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "doc_created_by_name",
        "name": "Doc Created By Name",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "doc_updated_by_name",
        "name": "Doc Updated By Name",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "status",
        "name": "Status",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "priority",
        "name": "Priority",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "assignee",
        "name": "Assignee",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "assignee_name",
        "name": "Assignee Name",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "project_name",
        "name": "Project Name",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "issueType",
        "name": "Issue Type",
        "buckets": [],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      },
      {
        "fieldName": "sys_file_type",
        "name": "Sys File Type",
        "buckets": [
          {
            "key": "html",
            "chunk_count": 5,
            "doc_count": 0
          },
          {
            "key": "pdf",
            "chunk_count": 1,
            "doc_count": 0
          },
          {
            "key": "json",
            "chunk_count": 1,
            "doc_count": 1
          }
        ],
        "multiselect": false,
        "subtype": "value",
        "sortedBy": "count",
        "fieldDataType": "string"
      }
    ],
    "tabFacet": {
      "fieldName": "sourceType",
      "buckets": [
        {
          "key": "web",
          "name": "Web Results",
          "chunk_count": 90,
          "doc_count": 5
        },
        {
          "key": "file",
          "name": "Files",
          "chunk_count": 1,
          "doc_count": 1
        },
        {
          "key": "json",
          "name": "JSON Connector",
          "chunk_count": 1,
          "doc_count": 1
        },
      ]
    },
    "chunk_result": [
      {
        "_index": "answer_index",
        "_id": "691c4cd329b2a119f717817c",
        "_score": 0.5,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-ab497493-04b1-45b8-8bcf-0eeb5fd3dabf",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-c039066b-d903-4d63-831b-1c0ea34f7312",
          "createdOn": "2025-11-18T10:39:15.259Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": `**Table caption (name and description of table)**  
You can describe your table here or in the context of your page.  
This table is read using the first row as the header for each column.  

| Description | Date | Location | Organizer | Status | Notes |
|------------|------|----------|-----------|--------|-------|
| Academic Senate Meeting | May 25, 2205 | Building 99 Room 1 | Senate Office | Scheduled | Annual planning meeting |
| Commencement Meeting | December 15, 2205 | Building 42 Room 10 | Admin Dept | Completed | Graduation preparation |
| Dean's Council | February 1, 2206 | Building 35 Room 5 | Dean Office | Scheduled | Monthly review |
| Committee on Committees | March 3, 2206 | Building 1 Room 201 | Committee Board | Pending | Agenda to be finalized |
| Lorem ipsum dolor sit amet, [consectetuer adipiscing elit](#). Sed lacus arcu, porta posuere, varius et. | Lorem [ipsum dolor](#) sit amet | Building X | Sample Org | Ongoing | Sample notes |
| [Lorem ipsum dolor](#) | [Lorem ipsum dolor](#) | Building Y | Test Org | Completed | Test entry |`,
          "pageChunks": [],
          "chunkTitle": "Error 404",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "json",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/404#:~:text=Sorry%2C%20the%20page%20you%20were%20looking%20for%20at%20this%20URL%20was%20not%20found",
          "updatedOn": "2025-11-18T10:39:15.259Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "json",
          "sys_file_type": "json",
          "sourceType": "json",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [],
          "chunkQualified": true,
          "score": 0.5,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-c039066b-d903-4d63-831b-1c0ea34f7312"
        },
        "keyword_search_score": 1.2377664,
        "normalized_score": 0.5
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd329b2a119f717817c",
        "_score": 0.5,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-ab497493-04b1-45b8-8bcf-0eeb5fd3dabf",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-7b5d9f66-4935-4b34-8198-545407777f36",
          "createdOn": "2025-11-18T10:39:15.259Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Sorry, the page you were looking for at this URL was not found. In 2007, the first version of PropStream became available to investors. Originally accessible via a CD download, PropStream solved for the need investors had of finding distressed properties without constantly driving around neighborhoods looking for overgrown lawns and other signs of financial distress. Now an investor could locate and research properties across the United States, right from their desktop. In 2018, PropStream launched as an online real estate data provider, further expanding on the notion that we all should have access to the tools to become successful real estate investors. By combining multi-sourced data, powerful tools, and an intuitive interface, PropStream gave investors the power to instantly locate properties and effectively act on opportunities. Since its launch, PropStream has been disrupting the market by empowering real estate investors with the same tools that the professionals have access to, and more. PropStream remains committed to being nimble and innovative, regularly adding new features, data sets, and analytics that help keep our customers ahead of the game. What makes PropStream so successful? It’s our people. Our team of data experts, developers, customer service specialists, real estate analysts, marketing gurus, and management love our jobs and helping our users. Our number one priority is to make sure our customers have the tools they need to grow their businesses.",
          "pageChunks": [],
          "chunkTitle": "Error 404",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/404#:~:text=Sorry%2C%20the%20page%20you%20were%20looking%20for%20at%20this%20URL%20was%20not%20found",
          "updatedOn": "2025-11-18T10:39:15.259Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [],
          "chunkQualified": true,
          "score": 0.5,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-7b5d9f66-4935-4b34-8198-545407777f36"
        },
        "keyword_search_score": 1.2377664,
        "normalized_score": 0.5
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd40161054a",
        "_score": 0.3614159035890956,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-0bfa0857-88b8-467c-b3c6-6ab63cb145fd",
            "chk-0ff095ff-ae5a-4179-94b0-e493a2c06bbc",
            "chk-c75b2bc4-7144-4550-a130-7ac003fa0ef8"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-d6443a91-e8da-4e1b-83b7-e00ffb2c7e42",
          "createdOn": "2025-11-18T10:39:15.279Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "PropStream Intelligence: An AI-powered platform to help real estate professionals find and evaluate leads through: Property Condition Analysis (Photo AI): Evaluates property condition from MLS photos Foreclosure Factor Data: Predict a property's likelihood of going into default Estimated Wholesale Value Calculation: Suggests optimal contract prices for wholesalers",
          "pageChunks": [],
          "chunkTitle": "PropStream Intelligence",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=PropStream%20Intelligence%3A%20An%20AI%2Dpowered%20platform%20to%20help%20real%20estate%20professionals%20find%20and%20evaluate%20leads%20through%3A%20Property%20Condition%20Analysis%20%28Photo%20AI%29%3A%20Evaluates%20property%20condition%20from%20MLS%20photos%20Foreclosure%20Factor%20Data%3A%20Predict%20a%20property%27s%20likelihood%20of%20going%20into%20default%20Estimated%20Wholesale%20Value%20Calculation%3A%20Suggests%20optimal%20contract%20prices%20for%20wholesalers",
          "updatedOn": "2025-11-18T10:39:15.279Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-25aa48ac-41a9-4587-9ad4-e5c8b6637cae",
            "chk-f8fd0c8c-9789-4786-a5dd-8463a77cdabd",
            "chk-a2b50d2b-d57c-4276-b50b-0f20237dc544"
          ],
          "chunkQualified": true,
          "score": 0.3614159035890956,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-d6443a91-e8da-4e1b-83b7-e00ffb2c7e42"
        },
        "keyword_search_score": 1.2188061,
        "normalized_score": 0.3614159035890956
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd401610555",
        "_score": 0.3096947397349985,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-f62a4f5b-eace-443b-a4b2-090c543b8344",
            "chk-39e86d77-4f0a-412a-8c10-49b6ff1398ac"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-4bfddb5f-d2db-4d0e-affe-b0c8c59a6bbe",
          "createdOn": "2025-11-18T10:39:15.281Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "[\"EquiMine® (PropStream's original parent company) is formed\",\"The first version of PropStream is available via a CD-ROM\",\"PropStream launches as an online real estate data provider\",\"PropStream Mobile is released\",\"PropStream is acquired by Stewart Title\",\"Predictive AI\",\"PropStream Intelligence\",\"Looking to the future...\"]",
          "pageChunks": [],
          "chunkTitle": "From Humble Beginnings",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us",
          "updatedOn": "2025-11-18T10:39:15.281Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "headings",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-6d269618-402d-4cee-80b8-eda493cafbd7",
            "chk-065b92d4-2e78-465e-bb22-ba6fef282ebe",
            "chk-e3e8c00c-0102-4d9a-ad7d-908bc8870e26"
          ],
          "chunkQualified": true,
          "score": 0.3096947397349985,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-4bfddb5f-d2db-4d0e-affe-b0c8c59a6bbe"
        },
        "keyword_search_score": 1.2117299,
        "normalized_score": 0.3096947397349985
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e093",
        "_score": 0.2862520319498537,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-ab6a1132-152f-454a-a9dc-e0653e8f15a1",
            "chk-f84652e8-e36b-4abf-bc95-6b68ac4e95be",
            "chk-3593ad86-5e0b-455c-a71f-e8e0a6ce784b"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-e2b3c714-cbfa-4dc4-a96a-56511bb52540",
          "createdOn": "2025-11-18T10:39:15.292Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Get the latest news and information from PropStream to power your business. Join Us for a Three-Day Live Webinar Series: Connect to Close Year-End Power Plays! PropStream Launches New BatchDialer Quick Access in Sidebar Propstream Pros : Ayla Melendez on Consistency & Real Estate Success How to Buy a Condemned House What Is a Notice of Default? Partner Spotlight: Jeremy Davis on Overcoming Adversity & His Legacy PropStream Pros: Clifford Walker on Real Estate, Strategy & Success What Are Off-Market Properties? PropStream’s October Event Lineup: BPCON, Wholesaling Live, and eXpCon PropStream’s Phase II Interface Enhancements: A Smarter Way to Search No Tricks, All Treats! Enjoy Up to 20% Off BatchDialer This October PropStream Pros: Brian Valencia on Getting Motivated for Change",
          "pageChunks": [],
          "chunkTitle": "PropStream Knowledge Hub",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=Get%20the%20latest%20news%20and%20information%20from%20PropStream%20to%20power%20your%20business",
          "updatedOn": "2025-11-18T10:39:15.292Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-85137d42-c854-4d2f-a90f-b11bf5a0ed34",
            "chk-f71f87d3-5e64-416d-88e3-5913cddad72c",
            "chk-2d3b4978-5431-43b5-bbc9-d1e5c69e09da"
          ],
          "chunkQualified": true,
          "score": 0.2862520319498537,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-e2b3c714-cbfa-4dc4-a96a-56511bb52540"
        },
        "keyword_search_score": 1.2085226,
        "normalized_score": 0.2862520319498537
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e08f",
        "_score": 0.22955332187255262,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-85137d42-c854-4d2f-a90f-b11bf5a0ed34",
            "chk-f71f87d3-5e64-416d-88e3-5913cddad72c",
            "chk-2d3b4978-5431-43b5-bbc9-d1e5c69e09da"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-6eeb229e-a020-49d9-bd26-40337f52af2d",
          "createdOn": "2025-11-18T10:39:15.291Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "For real estate investors and agents, staying ahead requires access to accurate data on-the-go. PropStream Mobile is the all-in-one solution, free to download with your PropStream account.",
          "pageChunks": [],
          "chunkTitle": "PropStream Mobile App",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=For%20real%20estate%20investors%20and%20agents%2C%20staying%20ahead%20requires%20access%20to%20accurate%20data%20on%2Dthe%2Dgo",
          "updatedOn": "2025-11-18T10:39:15.291Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-3a4ddd37-051e-4daf-a860-59b41757ea2c",
            "chk-3c4bab17-3815-47cd-840a-45c9892bb6c5",
            "chk-da5b79ad-e2ac-4c89-ac04-38310ab6502d"
          ],
          "chunkQualified": true,
          "score": 0.22955332187255262,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-6eeb229e-a020-49d9-bd26-40337f52af2d"
        },
        "keyword_search_score": 1.2007654,
        "normalized_score": 0.22955332187255262
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd3acf99db4b4cfc634",
        "_score": 0.16619230139517532,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-9b2c3332-7662-4326-97ce-51245d2625b6",
            "chk-95a65f70-52b1-46e8-9d39-e1965d3383e4",
            "chk-978e2199-f016-4c89-b6cb-20d48295c3e1"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/Facebook-1200x628-7-DAY-Free-Trial.jpg",
          "chunkId": "chk-2c67052b-3d3b-469f-9d3a-f749efdbd483",
          "createdOn": "2025-11-18T10:39:15.271Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "While you’re eager to get started, you’ll find it helpful to take some time to get familiar with the PropStream ecosystem so you can get the most out of your free trial. After all, the goal of the 7-day free trial is to try out PropStream and see all the ways it can support your professional goals!",
          "pageChunks": [],
          "chunkTitle": "Here’s Your Guide To Getting Started",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=While%20you%E2%80%99re%20eager%20to%20get%20started%2C%20you%E2%80%99ll%20find%20it%20helpful%20to%20take%20some%20time%20to%20get%20familiar%20with%20the%20PropStream%20ecosystem%20so%20you%20can%20get%20the%20most%20out%20of%20your%20free%20trial",
          "updatedOn": "2025-11-18T10:39:15.271Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hubfs/step_1.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-26327e1f-88b2-4b56-9efa-e5e8d26c3308"
          ],
          "chunkQualified": true,
          "score": 0.16619230139517532,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-2c67052b-3d3b-469f-9d3a-f749efdbd483"
        },
        "keyword_search_score": 1.1920967,
        "normalized_score": 0.16619230139517532
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd401610544",
        "_score": 0.11951812089955463,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-7b413cb5-cd77-48ef-baeb-bb12a5deb4a7",
            "chk-13a52502-e1cf-44a9-82f1-75172958d53c",
            "chk-25aa48ac-41a9-4587-9ad4-e5c8b6637cae"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-778bd234-786d-4829-b739-51db6e18ce56",
          "createdOn": "2025-11-18T10:39:15.278Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Originally accessible via a CD download, PropStream allowed investors to find distressed properties without driving around neighborhoods looking for overgrown lawns and other signs of financial distress. The CD-ROM also eliminated the hassle of visiting the local Public Records Office for property searches. With PropStream, an investor could now locate and research properties across the United States, right from their desktop.",
          "pageChunks": [],
          "chunkTitle": "The first version of PropStream is available via a CD-ROM",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=Originally%20accessible%20via%20a%20CD%20download%2C%20PropStream%20allowed%20investors%20to%20find%20distressed%20properties%20without%20driving%20around%20neighborhoods%20looking%20for%20overgrown%20lawns%20and%20other%20signs%20of%20financial%20distress",
          "updatedOn": "2025-11-18T10:39:15.278Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/Disc%20%E2%80%93%202.jpg?width=1400&height=600&name=Disc%20%E2%80%93%202.jpg",
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/About%20Us%20Timeline%20-%20PropStream%20Online.jpg?width=1400&height=600&name=About%20Us%20Timeline%20-%20PropStream%20Online.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-4617cb75-9a1f-4fb2-8048-4cb8b4fe97de",
            "chk-f1fce6b9-55af-410a-b6cb-5e0d3b32e111",
            "chk-a918a165-4ebb-47a4-8d35-ce0a66e7b552"
          ],
          "chunkQualified": true,
          "score": 0.11951812089955463,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-778bd234-786d-4829-b739-51db6e18ce56"
        },
        "keyword_search_score": 1.185711,
        "normalized_score": 0.11951812089955463
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd401610546",
        "_score": 0.11697160532809413,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-25aa48ac-41a9-4587-9ad4-e5c8b6637cae",
            "chk-f8fd0c8c-9789-4786-a5dd-8463a77cdabd",
            "chk-a2b50d2b-d57c-4276-b50b-0f20237dc544"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-13a52502-e1cf-44a9-82f1-75172958d53c",
          "createdOn": "2025-11-18T10:39:15.278Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "While users loved browsing via our web application, we thought, \"There has to be some way to make this information even more convenient to access.\" Thus, the PropStream Mobile app was born! Busy real estate professionals could now Drive for Dollars, identify leads, search addresses, and more on the go.",
          "pageChunks": [],
          "chunkTitle": "PropStream Mobile is released",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=While%20users%20loved%20browsing%20via%20our%20web%20application%2C%20we%20thought%2C%20%22There%20has%20to%20be%20some%20way%20to%20make%20this%20information%20even%20more%20convenient%20to%20access",
          "updatedOn": "2025-11-18T10:39:15.278Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/About%20Us%20Timeline%20-%20PropStream%20Mobile.jpg?width=1400&height=600&name=About%20Us%20Timeline%20-%20PropStream%20Mobile.jpg",
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/About%20Us%20Timeline%20-%20Stewart%20Title.jpg?width=1400&height=600&name=About%20Us%20Timeline%20-%20Stewart%20Title.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-a918a165-4ebb-47a4-8d35-ce0a66e7b552",
            "chk-778bd234-786d-4829-b739-51db6e18ce56",
            "chk-7b413cb5-cd77-48ef-baeb-bb12a5deb4a7"
          ],
          "chunkQualified": true,
          "score": 0.11697160532809413,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-13a52502-e1cf-44a9-82f1-75172958d53c"
        },
        "keyword_search_score": 1.1853626,
        "normalized_score": 0.11697160532809413
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e090",
        "_score": 0.11371975464571003,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-f71f87d3-5e64-416d-88e3-5913cddad72c",
            "chk-2d3b4978-5431-43b5-bbc9-d1e5c69e09da",
            "chk-e2b3c714-cbfa-4dc4-a96a-56511bb52540"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-85137d42-c854-4d2f-a90f-b11bf5a0ed34",
          "createdOn": "2025-11-18T10:39:15.291Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Customizable, Detailed, Nationwide SearchIncrease efficiency and miss fewer opportunities.",
          "pageChunks": [],
          "chunkTitle": "The Power of PropStream",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=Customizable%2C%20Detailed%2C%20Nationwide%20SearchIncrease%20efficiency%20and%20miss%20fewer%20opportunities",
          "updatedOn": "2025-11-18T10:39:15.291Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-3c4bab17-3815-47cd-840a-45c9892bb6c5",
            "chk-da5b79ad-e2ac-4c89-ac04-38310ab6502d",
            "chk-6eeb229e-a020-49d9-bd26-40337f52af2d"
          ],
          "chunkQualified": true,
          "score": 0.11371975464571003,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-85137d42-c854-4d2f-a90f-b11bf5a0ed34"
        },
        "keyword_search_score": 1.1849177,
        "normalized_score": 0.11371975464571003
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e086",
        "_score": 0.11371975464571003,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-0e0e13f4-d6d9-402c-81cd-58f760bb9dfe",
            "chk-ff2f187e-0df1-4838-9603-9572b4fd4d7a",
            "chk-b3b0cb5c-9a54-4bf0-a0f5-3537078b4173"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-dd8fe994-74dc-4f03-80a8-0fed08b3c9f0",
          "createdOn": "2025-11-18T10:39:15.290Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "PropStream Academy and live webinars make it easy to learn how to find buyers and how to find sellers to build and grow your real estate business further. Whether you're just getting started or looking for advanced strategies, our expert-led training helps you get the most out of PropStream’s tools.",
          "pageChunks": [],
          "chunkTitle": "Learn & Grow with PropStream",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=PropStream%20Academy%20and%20live%20webinars%20make%20it%20easy%20to%20learn%20how%20to%20find%20buyers%20and%20how%20to%20find%20sellers%20to%20build%20and%20grow%20your%20real%20estate%20business%20further",
          "updatedOn": "2025-11-18T10:39:15.290Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-20c8cd6f-d823-46ac-a457-c1c302a78e47",
            "chk-fc176859-022c-480b-b99b-736018fc51b9",
            "chk-513b1547-c1b6-4e0f-a02b-b223e041e000"
          ],
          "chunkQualified": true,
          "score": 0.11371975464571003,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-dd8fe994-74dc-4f03-80a8-0fed08b3c9f0"
        },
        "keyword_search_score": 1.1849177,
        "normalized_score": 0.11371975464571003
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd3acf99db4b4cfc640",
        "_score": 0.09420134137927053,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-19111e88-8389-4493-9597-7e59b692ecd0",
            "chk-609580bc-451a-4195-baec-a819e4167d01"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/Facebook-1200x628-7-DAY-Free-Trial.jpg",
          "chunkId": "chk-4a78524b-e9c0-47ee-8306-1fe1ebd6ce1f",
          "createdOn": "2025-11-18T10:39:15.273Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "PropStream provides expert customer support, so if you have a particular question or need help, try one of the following: Check our resources page for videos or join a Live Webinar(https://www.propstream.com/webinars-training) Read about the latest updates from our blog(/news) and discover the most useful tools for Real Estate Investors(/news/the-most-useful-tools-for-rei) Call our customer support team toll-free: (877) 204-9040(tel:8772049040) Email: support@propstream.com Chat live with support on our platform. Simply click the support button in the left-hand navigation.",
          "pageChunks": [],
          "chunkTitle": "Support For Your 7-day Free Trial",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=PropStream%20provides%20expert%20customer%20support%2C%20so%20if%20you%20have%20a%20particular%20question%20or%20need%20help%2C%20try%20one%20of%20the%20following%3A%20Check%20our%20resources%20page%20for%20videos%20or%20join%20a%20Live%20Webinar%28https%3A%2F%2Fwww",
          "updatedOn": "2025-11-18T10:39:15.273Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/propstream-real-estate-data-getting-started-3.webp?width=1200&name=propstream-real-estate-data-getting-started-3.webp"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-1904e16d-255a-4a16-bdeb-5279c80da008",
            "chk-a8c69732-6d7a-4da1-afe6-04c02138e7ff",
            "chk-b8656373-dcc5-47c6-b8f7-dabb84921294"
          ],
          "chunkQualified": true,
          "score": 0.09420134137927053,
          "sentToLLM": true,
          "usedInAnswer": true,
          "chunk_id": "chk-4a78524b-e9c0-47ee-8306-1fe1ebd6ce1f"
        },
        "keyword_search_score": 1.1822473,
        "normalized_score": 0.09420134137927053
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e082",
        "_score": 0.07509370358675738,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-20c8cd6f-d823-46ac-a457-c1c302a78e47",
            "chk-fc176859-022c-480b-b99b-736018fc51b9",
            "chk-513b1547-c1b6-4e0f-a02b-b223e041e000"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-1faeaa40-5a27-40db-bae6-b7c84d345a86",
          "createdOn": "2025-11-18T10:39:15.289Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Finding the right real estate opportunities is easier and more strategic with PropStream Intelligence. Our AI-powered data provides valuable insights to support your lead generation process.",
          "pageChunks": [],
          "chunkTitle": "AI-Driven Real Estate Data to Unlock Your True Potential",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=Finding%20the%20right%20real%20estate%20opportunities%20is%20easier%20and%20more%20strategic%20with%20PropStream%20Intelligence",
          "updatedOn": "2025-11-18T10:39:15.289Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-7368f1e2-a96c-4958-a687-79753ba5021f"
          ],
          "chunkQualified": true,
          "score": 0.07509370358675738,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-1faeaa40-5a27-40db-bae6-b7c84d345a86"
        },
        "keyword_search_score": 1.1796331,
        "normalized_score": 0.07509370358675738
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd401610542",
        "_score": 0.0728475949900014,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-a918a165-4ebb-47a4-8d35-ce0a66e7b552",
            "chk-778bd234-786d-4829-b739-51db6e18ce56",
            "chk-7b413cb5-cd77-48ef-baeb-bb12a5deb4a7"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-f1fce6b9-55af-410a-b6cb-5e0d3b32e111",
          "createdOn": "2025-11-18T10:39:15.277Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Remote and hybrid working is at the heart of what we do, so we understand that to work as a team, you need to be able to play as a team as well. This is why we bring our team together regularly with themed Zoom meetings, virtual brunches, bowling nights, and more! Additionally, we send interested team members to networking events and conferences, as we want to offer the opportunity for growth, learning new skills, and bonding with other team members. We take great pride in providing our team the opportunity to get out and speak face-to-face with other professionals in the industry while spreading the word about PropStream. Check out future job opportunities to join the PropStream Team today!",
          "pageChunks": [],
          "chunkTitle": "The Team",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=Remote%20and%20hybrid%20working%20is%20at%20the%20heart%20of%20what%20we%20do%2C%20so%20we%20understand%20that%20to%20work%20as%20a%20team%2C%20you%20need%20to%20be%20able%20to%20play%20as%20a%20team%20as%20well",
          "updatedOn": "2025-11-18T10:39:15.277Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/TheTeam%20%E2%80%93%201.jpg?width=540&height=300&name=TheTeam%20%E2%80%93%201.jpg",
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/TheTeam.jpg?width=540&height=300&name=TheTeam.jpg",
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/TheTeam%20%E2%80%93%203.jpg?width=540&height=300&name=TheTeam%20%E2%80%93%203.jpg",
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/TheTeam%20%E2%80%93%202.jpg?width=540&height=300&name=TheTeam%20%E2%80%93%202.jpg",
              "https://www.propstream.com/hs-fs/hubfs/Careers%20Page/TwoColWebPhoto-Careers-PhotoCarousel%20%E2%80%93%204@2x.jpg?width=519&height=300&name=TwoColWebPhoto-Careers-PhotoCarousel%20%E2%80%93%204@2x.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-4ba04301-56dc-44fc-99d7-f3f9f95e5622",
            "chk-fdb11ac1-d65f-41b8-894e-d3cdcfb5dda3",
            "chk-4617cb75-9a1f-4fb2-8048-4cb8b4fe97de"
          ],
          "chunkQualified": true,
          "score": 0.0728475949900014,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-f1fce6b9-55af-410a-b6cb-5e0d3b32e111"
        },
        "keyword_search_score": 1.1793258,
        "normalized_score": 0.0728475949900014
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd31480929568b8e094",
        "_score": 0.06686869218444888,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-f84652e8-e36b-4abf-bc95-6b68ac4e95be",
            "chk-3593ad86-5e0b-455c-a71f-e8e0a6ce784b"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-350b688b-e55c-4588-bdb7-00717a4fa14a",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/featured-image.jpg",
          "chunkId": "chk-ab6a1132-152f-454a-a9dc-e0653e8f15a1",
          "createdOn": "2025-11-18T10:39:15.292Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "The ability to create very curated and custom lists has been helpful to us as we scale so that we can cast a wide net and, at the same time, have smaller targeted campaigns. Nick Kamrada Real Estate Investor, Twenty Seven Properties I initially came to PropStream for its comprehensive datasets and layered filtering, but I stayed for its granular analytics. The ability to combine targeting factors—like absentee and out-of-state owners or downsizing homeowners—with specific property characteristics has been a game-changer. The ability to layer that all together to build more targeted audience lists allows us to be more strategic about marketing to and connecting with potential clients who are more likely to transact. Josh Schoenly Team Leader with eXp Realty and Loan Officer with NEXA Mortgage in Central Pennsylvania We chose PropStream because it’s the best lead generation and marketing compilation product out there. It offers incredible value, and our leadership feels confident it provides real benefits to our participants. Monica Peña Bringing PropStream to Southern Arizona’s MLS of 7,000 Subscribers At Overlook Real Estate, we love to use the Propstream mobile app because it allows us to quickly review properties on the go. This is particularly helpful when driving for dollars, as I can pull my car over, open the app, review the property and then even send a mailer straight from my phone. This is a must-have app that we use daily. The web application is an essential tool for us as well. What I love most",
          "pageChunks": [],
          "chunkTitle": "Trusted Lead Generation Platform for Real Estate Professionals",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "PropStream Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com#:~:text=The%20ability%20to%20create%20very%20curated%20and%20custom%20lists%20has%20been%20helpful%20to%20us%20as%20we%20scale%20so%20that%20we%20can%20cast%20a%20wide%20net%20and%2C%20at%20the%20same%20time%2C%20have%20smaller%20targeted%20campaigns",
          "updatedOn": "2025-11-18T10:39:15.292Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-f71f87d3-5e64-416d-88e3-5913cddad72c",
            "chk-2d3b4978-5431-43b5-bbc9-d1e5c69e09da",
            "chk-e2b3c714-cbfa-4dc4-a96a-56511bb52540"
          ],
          "chunkQualified": true,
          "score": 0.06686869218444888,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-ab6a1132-152f-454a-a9dc-e0653e8f15a1"
        },
        "keyword_search_score": 1.1785078,
        "normalized_score": 0.06686869218444888
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd3acf99db4b4cfc638",
        "_score": 0.05935851781683875,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-084d648b-8df2-478c-86f4-6cadd0e4bb21",
            "chk-020b8e66-f8cc-486a-8068-0b4caae0c151",
            "chk-a1245674-f8a7-40a8-8a28-6bd2675238d9"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/Facebook-1200x628-7-DAY-Free-Trial.jpg",
          "chunkId": "chk-8a2c0da1-c673-41c6-acd4-b3be48a3ca75",
          "createdOn": "2025-11-18T10:39:15.271Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "[\"Find new sellers(/finding-new-sellers-with-propstream-real-estate-software) as an investor/generating-new-listings-as-an-agent\",\"Find buyers as a real estateinvestor(/finding-a-buyer-as-a-real-estate-investor)\",\"Find funding for your real estate investment(/finding-funding-for-your-real-estate-investment)\",\"Generate new listings(/generating-new-listings-as-an-agent) as an agent\",\"Find buyers as alender(/lenders-finding-buyers)\",\"Locate homeowner contact info and property details(/locating-homeowner-contact-information-and-details)\"]",
          "pageChunks": [],
          "chunkTitle": "Step 3:  Use PropStream To...",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=Step%203%3A%20%20Use%20PropStream%20To",
          "updatedOn": "2025-11-18T10:39:15.271Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "list_element",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-9b2c3332-7662-4326-97ce-51245d2625b6",
            "chk-95a65f70-52b1-46e8-9d39-e1965d3383e4",
            "chk-978e2199-f016-4c89-b6cb-20d48295c3e1"
          ],
          "chunkQualified": true,
          "score": 0.05935851781683875,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-8a2c0da1-c673-41c6-acd4-b3be48a3ca75"
        },
        "keyword_search_score": 1.1774803,
        "normalized_score": 0.05935851781683875
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd40161054d",
        "_score": 0.05907272918640249,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-f32af8e6-30f0-4949-8b30-2c0fae6f3e4a",
            "chk-7bcce5e7-144d-4be2-a743-fa4baa0f6ecf",
            "chk-9111c5cc-fb2e-4105-8edd-b75bf13ad399"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-c75b2bc4-7144-4550-a130-7ac003fa0ef8",
          "createdOn": "2025-11-18T10:39:15.279Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "1 in 45 people are on the Autistic Spectrum. To help support advocacy and programs by Autism Speaks, PropStream made a matchable donation and was able to raise over $30K.",
          "pageChunks": [],
          "chunkTitle": "Autism Speaks",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=1%20in%2045%20people%20are%20on%20the%20Autistic%20Spectrum",
          "updatedOn": "2025-11-18T10:39:15.279Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/About%20Us%20Community%20-%20K9s%20For%20Warriors.jpg?width=1200&height=800&name=About%20Us%20Community%20-%20K9s%20For%20Warriors.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-d6443a91-e8da-4e1b-83b7-e00ffb2c7e42",
            "chk-0bfa0857-88b8-467c-b3c6-6ab63cb145fd",
            "chk-0ff095ff-ae5a-4179-94b0-e493a2c06bbc"
          ],
          "chunkQualified": true,
          "score": 0.05907272918640249,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-c75b2bc4-7144-4550-a130-7ac003fa0ef8"
        },
        "keyword_search_score": 1.1774412,
        "normalized_score": 0.05907272918640249
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd328894bd40161054e",
        "_score": 0.054143423499281286,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-7bcce5e7-144d-4be2-a743-fa4baa0f6ecf",
            "chk-9111c5cc-fb2e-4105-8edd-b75bf13ad399",
            "chk-94ad1fdc-fc74-49c0-9b45-a2c96a769b0a"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-24a8fde5-ec5e-40c8-b83a-8e276dc871a7",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "chunkId": "chk-f32af8e6-30f0-4949-8b30-2c0fae6f3e4a",
          "createdOn": "2025-11-18T10:39:15.280Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Veterans who return from active duty can suffer from PTSD. Having a highly trained emotional support animal can help! PropStream launched a social Media Campaign and raised over $10K.",
          "pageChunks": [],
          "chunkTitle": "K9s For Warriors",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "About PropStream, The Number One Real Estate Investment Software",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/about-us#:~:text=Veterans%20who%20return%20from%20active%20duty%20can%20suffer%20from%20PTSD",
          "updatedOn": "2025-11-18T10:39:15.280Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hs-fs/hubfs/About%20Us/About%20Us%20Community%20-%20Skid%20Row.jpg?width=1200&height=800&name=About%20Us%20Community%20-%20Skid%20Row.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-0bfa0857-88b8-467c-b3c6-6ab63cb145fd",
            "chk-0ff095ff-ae5a-4179-94b0-e493a2c06bbc",
            "chk-c75b2bc4-7144-4550-a130-7ac003fa0ef8"
          ],
          "chunkQualified": true,
          "score": 0.054143423499281286,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-f32af8e6-30f0-4949-8b30-2c0fae6f3e4a"
        },
        "keyword_search_score": 1.1767668,
        "normalized_score": 0.054143423499281286
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd3acf99db4b4cfc639",
        "_score": 0.020780707293968963,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-020b8e66-f8cc-486a-8068-0b4caae0c151",
            "chk-a1245674-f8a7-40a8-8a28-6bd2675238d9",
            "chk-f4283c8c-138c-4d94-93aa-f89f65e4ed1a"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/Facebook-1200x628-7-DAY-Free-Trial.jpg",
          "chunkId": "chk-084d648b-8df2-478c-86f4-6cadd0e4bb21",
          "createdOn": "2025-11-18T10:39:15.271Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "Find new sellers(/finding-new-sellers-with-propstream-real-estate-software) as an investor/generating-new-listings-as-an-agent Find buyers as a real estateinvestor(/finding-a-buyer-as-a-real-estate-investor) Find funding for your real estate investment(/finding-funding-for-your-real-estate-investment) Generate new listings(/generating-new-listings-as-an-agent) as an agent Find buyers as alender(/lenders-finding-buyers) Locate homeowner contact info and property details(/locating-homeowner-contact-information-and-details)",
          "pageChunks": [],
          "chunkTitle": "Step 3: Use PropStream To...",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=Find%20new%20sellers%28%2Ffinding%2Dnew%2Dsellers%2Dwith%2Dpropstream%2Dreal%2Destate%2Dsoftware%29%20as%20an%20investor%2Fgenerating%2Dnew%2Dlistings%2Das%2Dan%2Dagent%20Find%20buyers%20as%20a%20real%20estateinvestor%28%2Ffinding%2Da%2Dbuyer%2Das%2Da%2Dreal%2Destate%2Dinvestor%29%20Find%20funding%20for%20your%20real%20estate%20investment%28%2Ffinding%2Dfunding%2Dfor%2Dyour%2Dreal%2Destate%2Dinvestment%29%20Generate%20new%20listings%28%2Fgenerating%2Dnew%2Dlistings%2Das%2Dan%2Dagent%29%20as%20an%20agent%20Find%20buyers%20as%20alender%28%2Flenders%2Dfinding%2Dbuyers%29%20Locate%20homeowner%20contact%20info%20and%20property%20details%28%2Flocating%2Dhomeowner%2Dcontact%2Dinformation%2Dand%2Ddetails%29",
          "updatedOn": "2025-11-18T10:39:15.271Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-95a65f70-52b1-46e8-9d39-e1965d3383e4",
            "chk-978e2199-f016-4c89-b6cb-20d48295c3e1",
            "chk-8a2c0da1-c673-41c6-acd4-b3be48a3ca75"
          ],
          "chunkQualified": true,
          "score": 0.020780707293968963,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-084d648b-8df2-478c-86f4-6cadd0e4bb21"
        },
        "keyword_search_score": 1.1722023,
        "normalized_score": 0.020780707293968963
      },
      {
        "_index": "answer_index",
        "_id": "691c4cd3acf99db4b4cfc636",
        "_score": 0.014854430527780606,
        "_source": {
          "sourceId": "fs-3a27c34b-fc83-5d58-9577-8b0ed93d018c",
          "nextChunkIds": [
            "chk-978e2199-f016-4c89-b6cb-20d48295c3e1",
            "chk-8a2c0da1-c673-41c6-acd4-b3be48a3ca75",
            "chk-084d648b-8df2-478c-86f4-6cadd0e4bb21"
          ],
          "jobGroupId": "fjg-7f61ddcf-df95-5aac-b2f2-16b7bccb5b31",
          "docId": "fc-5b3be967-8b59-41a6-89bb-8f2b92b5c4df",
          "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
          "page_image_url": "https://www.propstream.com/hubfs/Facebook-1200x628-7-DAY-Free-Trial.jpg",
          "chunkId": "chk-95a65f70-52b1-46e8-9d39-e1965d3383e4",
          "createdOn": "2025-11-18T10:39:15.271Z",
          "sourceUrl": "https://www.propstream.com/",
          "chunkText": "We offer a variety of resources to help you become comfortable with PropStream’s many features, including... Watch The Ultimate Guide to Getting Started with PropStream!(https://youtu.be/DKldzA3HA2A) Free resource videos(/propstream-help-video-library?hsLang=en) (check out searching for properties in PropStream(/how-to-search-propstream-best-real-estate-software)!) Glossary of Real Estate Investing Terminology(/real-estate-glossary-of-terms) Social media channels(/links) for the latest news, features, and real estate content Blog(/news)for the latest news and insight (check out our Beginner's Guide(/news/the-beginners-guide-for-propstream)) PropStream Academy(/propstream-academy) for courses that will help you navigate PropStream like a pro",
          "pageChunks": [],
          "chunkTitle": "Step 1: Get a Bird’s Eye View of PropStream and PropStream Resources",
          "extractionMethodType": "general",
          "extractionStrategy": "Strategy1",
          "recordTitle": "Getting Started with Propstream - 7 Day Free Trial",
          "sys_content_type": "web",
          "sys_source_name": "Popstream",
          "recordUrl": "https://www.propstream.com/7-day-free-trial-getting-started#:~:text=We%20offer%20a%20variety%20of%20resources%20to%20help%20you%20become%20comfortable%20with%20PropStream%E2%80%99s%20many%20features%2C%20including",
          "updatedOn": "2025-11-18T10:39:15.271Z",
          "sourceAcl": [
            "*"
          ],
          "chunkType": "paragraph",
          "sys_file_type": "html",
          "sourceType": "web",
          "chunkMeta": {
            "imageUrl": [
              "https://www.propstream.com/hubfs/step_2.jpg"
            ]
          },
          "extractionMethod": "advanced_html_extraction",
          "sourceName": "Popstream",
          "previousChunkIds": [
            "chk-26327e1f-88b2-4b56-9efa-e5e8d26c3308",
            "chk-2c67052b-3d3b-469f-9d3a-f749efdbd483",
            "chk-9b2c3332-7662-4326-97ce-51245d2625b6"
          ],
          "chunkQualified": true,
          "score": 0.014854430527780606,
          "sentToLLM": true,
          "usedInAnswer": false,
          "chunk_id": "chk-95a65f70-52b1-46e8-9d39-e1965d3383e4"
        },
        "keyword_search_score": 1.1713915,
        "normalized_score": 0.014854430527780606
      }
    ]
  },
  "templateType": "search",
  "requestId": "fsh-3a7df8c0-f451-5eff-bb11-b8eff80bd667",
  "queryPipelineId": "fqp-4aa193e6-a5fa-51be-9556-f434eebc3b81",
  "indexPipelineId": "fip-ed3c4086-2b0e-5549-8c92-8148472867df",
  "searchIndexId": "sidx-9148d849-ae36-5d75-be4d-e0bfd74648ed",
  "retrievalResponseTime": 130.80271899979562,
  "llmResponseTime": 3228.9886
}

export const getTotalResultsCount: number = (() => {
  return getResultsWebsocket.totalSearchResults;
})();

export function getSearchResults(payload: any): SearchResult[] {
  const results: Record<string, { data: Array<{ chunkResults: string[] }> }> = payload?.results ?? {};
  const chunkResultMap = new Map<string, any>(
    (payload?.chunk_result ?? []).map((cr: any) => [cr._source?.chunk_id, cr._source])
  );

  const searchResults: SearchResult[] = [];
  for (const bucket of Object.values(results)) {
    for (const dataItem of bucket.data) {
      for (const chunkId of dataItem.chunkResults) {
        const src = chunkResultMap.get(chunkId);
        if (src) {
          searchResults.push({
            id: src.chunk_id,
            snippet: src.chunkText,
            source: {
              title: src.recordTitle,
              type: src.sourceType,
              url: src.recordUrl,
              fileType: src.sys_file_type,
              imageUrls: src.chunkMeta?.imageUrl || []
            },
          });
        }
      }
    }
  }
  return searchResults;
}