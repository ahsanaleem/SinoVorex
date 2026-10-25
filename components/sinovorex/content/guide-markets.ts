import type { Article } from "./types";

/** Wholesale market guides (industry hubs). Figures come from published market and city sources and change over time. */
export const MARKET_GUIDES: Article[] = [
  {
    slug: "yiwu-market-guide",
    title: "Yiwu Market Guide for Buyers: Districts, Tips & Getting There",
    h1: "Yiwu market guide for buyers",
    description: "A buyer's guide to Yiwu International Trade City: what's in each district, MOQs and prices, how to get there from Shanghai and Hangzhou, and how to buy safely.",
    summary: "Yiwu International Trade City in Zhejiang province is the world's largest wholesale market for small commodities: toys, gifts, jewellery, stationery, household goods, decorations and more. It's spread over five districts, opens daily, and is about two hours from Shanghai by high-speed train. Most sellers accept smaller orders than factories, which makes it popular with small businesses and mixed-product buyers.",
    takeaways: [
      "Yiwu is best for small goods and mixed orders, with lower MOQs than most factories.",
      "The market is split into five districts, each with its own product groups.",
      "It's about two hours from Shanghai, or about 30 to 40 minutes from Hangzhou, by high-speed train.",
      "Many booths are traders, so check quality carefully and inspect before you ship.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "What Yiwu is good for" },
      { p: "Yiwu is where buyers go for small, low-cost products, and lots of them. You can fill a container with dozens of different items from dozens of sellers in a few days. That makes it ideal for general traders, discount stores, gift shops and e-commerce sellers testing many products." },
      { p: "It's less suited to custom products, technical goods or very large single-product orders. For those, going to the factory directly usually gives you a better price and more control." },

      { h2: "The five districts" },
      { table: { caption: "A general guide. Product locations shift, so check the market's own directory before you visit.", head: ["District", "Main products"], rows: [
        ["District 1", "Toys, artificial flowers, jewellery, hair accessories, crafts"],
        ["District 2", "Hardware, tools, electrical products, kitchenware, bags, umbrellas, watches"],
        ["District 3", "Stationery, sports goods, cosmetics, glasses, zips and buttons"],
        ["District 4", "Socks, gloves, underwear, belts, scarves, shoes, daily necessities"],
        ["District 5", "Imported goods, bedding, textiles, car accessories, pet products"],
      ] } },

      { h2: "Opening hours and the best time to go" },
      { p: "The market opens every day, roughly from 9 in the morning to 5 in the afternoon, and many booths open gradually after 10. It closes for about a month around Chinese New Year, and it's quieter in the weeks before and after, as sellers and workers travel." },
      { p: "Allow at least two or three days if you're buying across several categories. One district can easily take a full day." },

      { h2: "Getting to Yiwu" },
      { ul: [
        "From Shanghai, high-speed trains from Shanghai Hongqiao station take about one and a half to two hours.",
        "From Hangzhou, the train takes about 30 to 40 minutes.",
        "Yiwu railway station is about 10 km from the International Trade City, around 20 minutes by taxi.",
        "Yiwu also has its own airport with domestic flights.",
      ] },

      { h2: "Prices, MOQs and how buying works" },
      { p: "Many Yiwu sellers will accept orders of a few hundred pieces per item, sometimes less, especially for stock products. Prices are usually quoted per piece or per carton, ex-booth, so packing, transport to the warehouse and export are extra." },
      { p: "Typically you place orders at several booths, pay a deposit, and the goods are delivered to a consolidation warehouse, where they're checked and loaded into one container. Most buyers use a Yiwu agent or a sourcing agent to manage this, because keeping track of dozens of small orders is a lot of work." },

      { h2: "Buying safely in Yiwu" },
      { ul: [
        "Many booths are traders, not factories. That's normal in Yiwu, but quality can vary between batches.",
        "Take photos of each product, the booth number and the seller's card, and write down the agreed price and MOQ.",
        "Get the order details in writing, including packaging and labels.",
        "Have the goods checked before they're loaded. A quick [pre-shipment inspection](/services/quality-inspection) catches wrong items, short counts and damaged packaging.",
        "Check what your market needs, such as safety marks and test reports for toys and electrical goods. Many Yiwu products are made for markets with different rules.",
      ] },

      { h2: "How we help in Yiwu" },
      { p: "We can go to Yiwu with you, translate and keep track of every order, or buy for you from your list. We check the goods as they arrive at the warehouse, [combine them into one shipment](/services/samples-consolidation), and arrange freight. If you're planning a visit, see our [business trips page](/services/china-business-trips)." },
    ],
    faqs: [
      { q: "Can I buy small quantities in Yiwu?", a: "Yes. Yiwu is known for low MOQs. Many sellers accept a few hundred pieces per item, and some less for stock goods." },
      { q: "Is Yiwu open every day?", a: "Yes, most of the year, roughly 9 am to 5 pm. It closes for about a month around Chinese New Year." },
      { q: "Do I need an agent in Yiwu?", a: "Not strictly, but most buyers use one to translate, track orders from many booths, check goods and arrange consolidation and shipping." },
    ],
    related: ["/services/samples-consolidation", "/guides/sourcing-from-china-small-business", "/services/china-business-trips"],
  },

  {
    slug: "guangzhou-fabric-market",
    title: "Guangzhou Fabric Market Guide: Zhongda Market for Buyers",
    h1: "Guangzhou fabric market guide (Zhongda)",
    description: "A buyer's guide to Guangzhou's Zhongda fabric market: what you'll find, MOQs, prices, how to buy fabric and trims, and how to check quality before you ship.",
    summary: "Zhongda Fabric Market in Guangzhou's Haizhu District, next to Sun Yat-sen University, is one of the biggest fabric markets in China. It's a cluster of more than 50 market buildings with over 20,000 shops selling fabrics, lace, trims and garment accessories. It's especially useful for fashion brands and small clothing businesses, because many shops sell by the roll or even by the metre.",
    takeaways: [
      "Zhongda is a cluster of more than 50 market buildings in Haizhu District, Guangzhou.",
      "It's strong for fashion fabrics, trims and accessories, with low MOQs at many shops.",
      "Ask for swatches, then a larger cutting before you order, and check colour in daylight.",
      "Inspect fabric for shade, width, weight and defects before it's shipped or cut.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "What Zhongda is good for" },
      { p: "Zhongda is the place to see a huge range of fabrics in one trip: cotton, linen, silk, chiffon, knits, denim, lace, embroidery and technical fabrics, plus buttons, zips, labels and other trims. It sits close to Guangzhou's garment industry, so it moves quickly with fashion trends." },
      { p: "It suits fashion brands, designers, small clothing manufacturers and buyers who need many different fabrics in modest quantities." },

      { h2: "How the market is laid out" },
      { p: "Zhongda isn't one building but a whole district of markets, spread over several square kilometres. The central buildings, such as the Guangzhou China Fabrics and Accessories Center, have higher-end shops and prices. Surrounding markets often have more affordable options. Shops tend to group by type, so ask at the entrance or follow the signs for the fabric you need." },

      { h2: "MOQs and prices" },
      { p: "Many shops sell from stock by the roll, and some by the metre, which is why Zhongda is popular with small businesses. For custom colours or special finishes, the shop usually orders from a mill, and the minimum rises to hundreds or thousands of metres per colour." },
      { p: "Prices are usually quoted per metre, per yard or per kilogram for knits. Make sure you know which, and check the width, because a cheaper price on a narrower fabric can cost more per garment." },

      { h2: "How to buy fabric at Zhongda" },
      { ol: [
        "Bring reference samples or photos, and know the composition, weight (GSM) and width you need.",
        "Collect swatches from several shops, labelled with the shop's card and the article number.",
        "Compare them in daylight. Colours look very different under market lighting.",
        "Order a larger cutting of your favourites to test washing, shrinkage and colour-fastness.",
        "Agree the price, quantity, delivery date and shade tolerance in writing before paying a deposit.",
      ] },

      { h2: "Checking fabric quality" },
      { p: "Fabric problems are expensive, because they usually show up after cutting and sewing. Before fabric is shipped or cut, check:" },
      { ul: [
        "Shade, against the approved sample and between rolls.",
        "Width and weight (GSM), against what you ordered.",
        "Defects such as holes, slubs, stains and weaving faults. Fabric is often graded on a points system per 100 square yards.",
        "Hand feel, stretch and recovery for knits.",
        "Washing results: shrinkage and colour-fastness.",
      ] },
      { p: "We can check fabric rolls before shipment as part of our [quality inspection service](/services/quality-inspection)." },

      { h2: "Zhongda or the mills?" },
      { p: "For large quantities of one fabric, going to the mill directly is often cheaper, and many mills are in Zhejiang, around [Keqiao](/guides/keqiao-textile-market). Zhongda is better for variety, small quantities and trend fabrics. Many buyers use both: Zhongda for sampling and small runs, mills for bulk." },
    ],
    faqs: [
      { q: "Can I buy fabric by the metre at Zhongda?", a: "At some shops, yes, especially for stock fabrics. Most sell by the roll, and custom orders have much higher minimums." },
      { q: "Is Zhongda good for bulk fabric orders?", a: "It can be, but for large quantities of one fabric, buying direct from a mill is often cheaper. Zhongda is strongest for variety and smaller orders." },
      { q: "How do I check fabric before shipping?", a: "Check shade against the approved sample, width, weight and visible defects on a sample of rolls, and test a cutting for shrinkage and colour-fastness." },
    ],
    related: ["/guides/keqiao-textile-market", "/services/product-sourcing", "/services/quality-inspection"],
  },

  {
    slug: "keqiao-textile-market",
    title: "Keqiao Textile Market Guide: China Textile City, Shaoxing",
    h1: "Keqiao textile market guide (China Textile City)",
    description: "A buyer's guide to China Textile City in Keqiao, Shaoxing: what's sold, how the market is organised, mills nearby, getting there from Hangzhou and buying tips.",
    summary: "China Textile City in Keqiao, Shaoxing, Zhejiang province, is one of the largest textile trading centres in the world. Founded in 1988, it had around 38,000 vendors by 2024, selling fabrics of almost every kind. Thousands of weaving, dyeing and printing mills are in the surrounding area, which makes Keqiao the place to go for bulk fabric at mill prices.",
    takeaways: [
      "China Textile City in Keqiao had around 38,000 vendors by 2024.",
      "It's strongest for bulk fabric, close to thousands of weaving, dyeing and printing mills.",
      "Keqiao is near Hangzhou, and Shaoxing Metro Line 1 connects with Hangzhou's metro.",
      "Keqiao also hosts a major textile expo twice a year.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "What Keqiao is good for" },
      { p: "Where Guangzhou's Zhongda market is about variety and fashion, Keqiao is about volume. It's surrounded by a huge textile industry, from weaving and knitting to dyeing and printing, so many vendors are mills or work directly with them." },
      { p: "It suits garment manufacturers, home textile companies and fabric wholesalers buying large quantities, as well as buyers who want to develop custom fabrics with a mill." },

      { h2: "How the market is organised" },
      { p: "China Textile City is spread across several market areas, each grouped by product type: for example, home textiles such as curtain and blackout fabrics in one area, knitwear and bedding fabrics in another, and denim in another. A first visit can be overwhelming, so plan which areas to see based on the fabrics you need." },

      { h2: "Mills around Keqiao" },
      { p: "The big advantage of Keqiao is that production is nearby. After finding a fabric in the market, you can often visit the mill that makes it the same day. That's where you can see capacity, check how they control shade between dye lots, and negotiate bulk prices." },
      { p: "Our [factory audit checklist](/guides/factory-audit-checklist) works for mills too: check the business licence, the machinery, the dyeing and finishing set-up, and how they record and fix defects." },

      { h2: "Getting to Keqiao" },
      { ul: [
        "Keqiao District is about 20 to 25 km from Hangzhou Xiaoshan International Airport.",
        "Shaoxing Metro Line 1 runs through Keqiao and connects with Hangzhou Metro Line 5.",
        "High-speed trains link Shaoxing with Shanghai and Hangzhou.",
      ] },
      { p: "Keqiao is easy to combine with factory visits in Zhejiang and Jiangsu, including around Suzhou, where we're based. See our [business trips page](/services/china-business-trips)." },

      { h2: "The Keqiao textile expo" },
      { p: "The China Shaoxing Keqiao International Textile Expo is held twice a year and is one of China's main fabric fairs. It's a good time to visit if you want to see new collections and meet many mills in a few days. Check the expo's dates for the year before you plan your trip." },

      { h2: "Buying tips for Keqiao" },
      { ul: [
        "Know your specification: composition, weight, width, construction, finish and colour.",
        "Ask for lab dips or strike-offs for custom colours and prints, and approve them before bulk.",
        "Agree the shade tolerance, and how much variation between dye lots is acceptable.",
        "Ask about MOQs per colour. Bulk mills often need thousands of metres per colour.",
        "Inspect the fabric before shipping, checking shade, width, weight and defects on a sample of rolls.",
      ] },
      { p: "We can help you find mills, follow production in Chinese and inspect the fabric before it ships. Start with our [product sourcing service](/services/product-sourcing)." },
    ],
    faqs: [
      { q: "Is Keqiao better than Guangzhou for fabric?", a: "For bulk orders and working directly with mills, Keqiao is usually better. Guangzhou's Zhongda market is better for variety and smaller quantities." },
      { q: "How far is Keqiao from Hangzhou?", a: "Very close. Keqiao is about 20 to 25 km from Hangzhou Xiaoshan airport, and Shaoxing's metro connects with Hangzhou's." },
      { q: "What MOQ should I expect from Keqiao mills?", a: "For custom colours, often thousands of metres per colour. Stock fabrics in the market can be bought in smaller quantities." },
    ],
    related: ["/guides/guangzhou-fabric-market", "/services/product-sourcing", "/guides/factory-audit-checklist"],
  },
];
