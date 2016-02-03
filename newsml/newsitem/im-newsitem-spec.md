# Infomaker NewsItem spec
*Note: This NewsItem spec concerns Infomakers implementation of NewsItem for Writer (Infomakers web based editor)*

- The XML variant used [IPTC NewsML G2 2.20](https://iptc.org/standards/newsml-g2/)
- Documentation of the newsItem used are found in files `newsitem-text.xml` and `newsitem-picture.xml`
- All articles are represented as `<newsItem>`s with `<itemClass qcode="ninat:text">`. "Internal" images, i.e. images that are stored as part of the customers content, are represented as `<newsItem>`s with `<itemClass qcode="ninat:picture">`
- In the case of OC being the repository and where the articles and images (metadata) are stored as newsItems, mimetypes used are `application/vnd.iptc.g2.newsitem+xml.article` (for articles) and `application/vnd.iptc.g2.newsitem+xml.picture` (for images)