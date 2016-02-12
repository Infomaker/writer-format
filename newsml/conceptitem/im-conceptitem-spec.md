# Infomaker ConceptItem spec
*Note: This ConceptItem spec concerns Infomakers implementation of ConceptItem for Writer (Infomakers web based editor)*

- The XML variant used [IPTC NewsML G2 2.20](https://iptc.org/standards/newsml-g2/)
- Documentation of the newsItem used are found in files `conceptitem-*.xml`
- All concepts are represented as `<conceptItem>`s with `<itemClass qcode="cinat:concept"/>`
- In the case of OC being the repository and where the concepts are stored as ConceptItems, mimetype used is `application/vnd.iptc.g2.conceptitem+xml`.