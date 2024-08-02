## Search Results template



###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "search",
        "graph_answer": {
            "payload": {
                "center_panel": {
                    "data": [
                        {
                            "snippet_title": "*What are the types of Mutual Funds?*",
                            "snippet_content": " \n Equity Funds- Equity Funds primarily invest in equity shares. Minimum 65% in equity shares is mandatory for Equity funds. They carry the principal objective of capital appreciation of the investment over a medium to long-term investment horizon. The size of an equity fund is determined by a market capitalization, while the investment style, reflected in the fund's stock holdings, is also used to categorize equity *mutual funds*. Debt Funds- Debt Funds invest in fixed-income securities like bonds, securities and treasury bills – Fixed Maturity Plans (FMPs), Gilt Fund, Liquid Funds, Short Term Plans, Long Term Bonds and Monthly Income Plans among others – with fixed interest rate and maturity date. Hybrid / Balanced Funds- Hybrid funds invest in both debt instruments and equities to achieve maximum diversification. They are ideal for medium- to long-term investors willing to take moderate risks. Gold Funds- Gold funds invest directly or indirectly invest in",
                            "url": "https://www.bank.com/personal%2Dbanking/investment/mutual%2Dfund#faqs",
                            "score": "86.8314%",
                            "source": "Mutual Fund Investment Plans |  Bank",
                            "snippet_type": "extractive_model",
                            "timeTaken": "1.5ms",
                            "message": "Presented Answer",
                            "isPresentedAnswer": true
                        }
                    ],
                    "type": "paragraph_snippet"
                }
            }
        },
        "results": {
            "web": {
                "data": [
                    {
                        "contentId": "fc-15a53674-631f-4ba3-8fa9-5653494866c6",
                        "sys_content_type": "web",
                        "score": 240.63908,
                        "keywords": [],
                        "config": {
                            "pinIndex": -1,
                            "boost": 1,
                            "visible": true
                        },
                        "addedResult": false,
                        "customization": {},
                        "score_debug": {},
                        "page_url": "https://www.bank.com/personal-banking/investment/mutual-fund",
                        "sys_source_name": " BANK",
                        "page_title": "Mutual Fund Investment Plans |  Bank",
                        "page_image_url": "http://www.bank.com/content/dam/bank/images/n1/IDFC-logo-website.svg",
                        "sys_racl": [
                            "*"
                        ],
                        "createdOn": "2023-03-01T06:07:23.559000",
                        "page_preview": " Bank provides different <span class=\"highlightText\">types</span> of <span class=\"highlightText\">mutual</span> <span class=\"highlightText\">funds</span> such as sip investment, tax saving elss equity <span class=\"highlightText\">funds</span>, etc. Invest in MF online &amp; get better returns!"
                    },
                    {
                        "contentId": "fc-5391ca59-a44b-49fc-8b4a-eabc39068011",
                        "sys_content_type": "web",
                        "score": 99.10434,
                        "keywords": [],
                        "config": {
                            "pinIndex": -1,
                            "boost": 1,
                            "visible": true
                        },
                        "addedResult": false,
                        "customization": {},
                        "score_debug": {},
                        "page_url": "https://www.bank.com/financial-calculators/sip-calculator",
                        "sys_source_name": "BANK",
                        "page_title": "SIP Calculator- Calculate SIP Investments Online |  Bank",
                        "page_image_url": "http://www.bank.com/content/dam/bank/images/n1/IDFC-logo-website.svg",
                        "sys_racl": ["*"],
                        "createdOn": "2023-03-01T06:05:09.348000",
                        "page_preview": "<span class=\"highlightText\">Mutual</span> <span class=\"highlightText\">Fund</span> SIP calculator is a tool that helps individuals get an estimation of the returns on their monthly SIP investment. Calculate your SIP investments here!"
                    }
                ],
            }
        },
    }
};

print(JSON.stringify(message));
```
