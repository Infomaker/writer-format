# Publishing flow
The supported (in writer) publishing flow depends on a couple of elements in the newsItem which are described in this spec.

## Save new article ("Spara ny artikel")
Create and save a new article from scratch.

**Values on article after "Spara ny artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:withheld"/>
	...
	<itemMetaExtProperty type="imext:pubstart" value=""/>
	...
</itemMeta>
```

**Eligible values in writer after "Spara ny artikel":**
- Publicera
- Tidspublicera

## Publish article ("Publicera artikel")
Article is published and displayed in writer with a published timestamp.

**Values on article after "Publicera artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:usable"/>
	...
	<itemMetaExtProperty type="imext:pubstart" value="2015-12-07T15:03:42+00:00"/>
	...
</itemMeta>
```

**Eligible values in writer after "Publicera artikel":**
- Uppdatera
- Ompublicera
- Avpublicera

## Update article ("Uppdatera artikel")
Update an already published article.

**Values on article after "Uppdatera artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:usable"/>
	...
	<signal qcode=“sig:update”/>
	...
	<!-- timestamp remains untouched -->
	<itemMetaExtProperty type="imext:pubstart" value="2015-12-07T15:03:42+00:00"/>
	...
</itemMeta>
```

**Eligible values in writer after "Uppdatera artikel":**
- Uppdatera
- Ompublicera
- Avpublicera

## Re-publish article ("Ompublicera artikel")
Publish an already published article again.

**Values on article after "Ompublicera artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:usable"/>
	...
	<signal qcode=“sig:update”/>
	...
	<signal qcode=”replace:major”/>
	...
	<!-- timestamp remains untouched -->
	<itemMetaExtProperty type="imext:pubstart" value="2015-12-07T15:03:42+00:00"/>
	...
</itemMeta>
```

**Eligible values in writer after "Ompublicera artikel":**
- Uppdatera
- Ompublicera
- Avpublicera

## Un-publish article ("Avpublicera artikel")
Un-publish a published article.

**Values on article after "Avpublicera artikel":**
``` xml
<itemMeta>
	...
	<!-- 
		note: there might be better to set stat:withheld
		and use stat:canceled for "delete" article instead. 
	-->
	<pubStatus qcode="stat:canceled"/>
	...
	<!-- any signal elements are removed -->
	...
	<itemMetaExtProperty type="imext:pubstart" value=""/>
	...
</itemMeta>
```

**Eligible values in writer after "Avpublicera artikel":**
- Publicera
- Tidspublicera

## Time controlled publishing ("Tidspublicera artikel")
Save a non-published article with a future publish and un-publish timestamp.

**Values on article after "Tidspublicera artikel":**
``` xml
<itemMeta>
	...	
	<pubStatus qcode="stat:withheld"/>	
	...
	<embargoed/>
	...
	<itemMetaExtProperty type="imext:pubstart" value="{future date}"/>
	<itemMetaExtProperty type="imext:pubstop" value="{future date} > itemext:pubstart OR empty"/>
	...
</itemMeta>
```

**Eligible values in writer after "Tidspublicera artikel":**
- Publicera
- Uppdatera
- Tidspublicera




