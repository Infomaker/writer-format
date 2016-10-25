# Infomaker NewsItem spec
*Note: This NewsItem spec concerns Infomakers implementation of NewsItem for Newspilot Writer (Infomakers web based editor)*

- The XML variant used [IPTC NewsML G2 2.20](https://iptc.org/standards/newsml-g2/)
- Documentation of the newsItem used are found in files `newsitem-text.xml`, `newsitem-picture.xml` and `newsitem-pdf.xml`
- In the case of OC being the repository and where the articles and images (metadata) are stored as newsItems, mimetypes used are `application/vnd.iptc.g2.newsitem+xml.article` (for articles), `application/vnd.iptc.g2.newsitem+xml.picture` (for images) and `application/vnd.iptc.g2.newsitem+xml.graphic (for pdf etc.)`
