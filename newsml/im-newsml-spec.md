# Infomaker NewsML spec
*Note: This NewsML spec concerns Infomakers implementation of NewsML for Writer (Infomakers web based editor)*
The XML variant used [IPTC NewsML G2 2.20](https://iptc.org/standards/newsml-g2/).

## Revision history
* 1.0	Initial revision

## XML outline
All articles are represented as `<newsItem>`s with `<itemClass qcode="ninat:text">`. "Internal" images, i.e. images that are stored as part of the customers content, are represented as `<newsItem>`s with `<itemClass qcode="ninat:picture">`.

## The XML explained
WIP... 