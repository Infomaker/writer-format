# Infomaker ConceptItem spec
*Note: This ConceptItem spec concerns Infomakers implementation of ConceptItem for Writer (Infomakers web based editor)*

- The XML variant used [IPTC NewsML G2 2.26](https://iptc.org/standards/newsml-g2/)
- Documentation of the newsItem used are found in files `conceptitem-*.xml`
- All concepts are represented as `<conceptItem>`s with `<itemClass qcode="cinat:concept"/>`
- In the case of OC being the repository and where the concepts are stored as ConceptItems, mimetype used is `application/vnd.iptc.g2.conceptitem+xml`.

`x-im/category`  
NewsML: cpnat:abstract  
Används för kategori/avdelning  
Exempel: Nyheter, Sport, Mat & Dryck  

`x-im/topic`  
NewsML: cpnat:object  
Används för alla taggar som inte kan definieras som en person, organisation eller event. Kan med fördel översättas kundspecifikt till Ämne, Nyckelord, Tagg eller liknande 
Exempel: Polisbil, Klimatet, Åtal, ADHD 
	
`x-im/person`  
cpnat:person  
Används för taggar för personer  
Exempel: Carl Bildt, Astrid Lindgren  

`x-im/organisation`  
NewsML: cpnat:organisation  
Används för organisationer  
Exempel: EU, Frölunda Indians, Utrikesdepartementet  

`x-im/content-profile`  
NewsML: cpnat:object  
Används för funktionstaggar som kan styra publiceringen  
Exempel:  

`x-im/place`  
NewsML: cpnat:poi  
Används för positioner och områden  
Exempel: Borås, Västra götaland, Sverige  

`x-im/event`  
NewsML: cpnat:event  
Används för händelser  
Exempel: EU-toppmötet i Göteborg 2017  

`x-im/author`  
NewsML: cpnat:person  
Används för författare och fotografer  
Exempel: Nils Olsson, Stina Andersson  

`x-im/story`  
NewsML: imnat:story  
Används för att knyta ihop artikelserier  
Exempel: #meto-upproret, Trumps USA, SHL 17/18  

`x-im/section`
TODO:

`x-im/channel`
TODO:
