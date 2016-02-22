# Publishing flow
Writer supports the statuses described below.

## Save new article ("Spara ny artikel")
Create and save a new article from scratch - draft. Note that pubStatus is used with an extension to the NewsML standard.

**Values on article after "Spara ny artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="imext:draft"/>
	...
	<!--imext:pubstart (and imext:pubstop) should not be present-->
	<!--<itemMetaExtProperty type="imext:pubstart" value=""/>-->
	...
</itemMeta>
```

**Eligible values in writer after "Spara ny artikel":**
- Klar (`imext:done`)
- Publicera (`stat:usable`)
- Tidspublicera (`stat:withheld`)

## Mark article as done ("Klar")
Article is pending approval (ready to be published). Note that pubStatus is used with an extension to the NewsML standard.

**Values on article after "Klar":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="imext:done"/>
	...
	<!--imext:pubstart (and imext:pubstop) should not be present-->
	<!--<itemMetaExtProperty type="imext:pubstart" value=""/>-->
	...
</itemMeta>
```

**Eligible values in writer after "Spara ny artikel":**
- Utkast (`imext:draft`)
- Publicera (`stat:usable`)
- Tidspublicera (`stat:withheld`)

## Publish article ("Publicera artikel")
Article is published and displayed in writer with a published timestamp, now, i.e. when article got published.

**Values on article after "Publicera artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:usable"/>
	...
	<itemMetaExtProperty type="imext:pubstart" value="{now}"/>
	...
</itemMeta>
```

**Eligible values in writer after "Publicera artikel":**
- Ompublicera
- Avpublicera (`stat:canceled`)

## Re-publish article ("Ompublicera artikel")
Publish an already published article again. imext:pubstart get a new timestamp, now, i.e. when article got re-published.

**Values on article after "Ompublicera artikel":**
``` xml
<itemMeta>
	...
	<pubStatus qcode="stat:usable"/>
	...
	<!-- new timestamp -->
	<itemMetaExtProperty type="imext:pubstart" value="{now}"/>
	...
</itemMeta>
```

**Eligible values in writer after "Ompublicera artikel":**
- Ompublicera
- Avpublicera (`stat:canceled`)

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
	<!--imext:pubstart (and imext:pubstop) should not be present-->
	<!--<itemMetaExtProperty type="imext:pubstart" value=""/>-->
	...
</itemMeta>
```

**Eligible values in writer after "Avpublicera artikel":**
- Utkast (`imext:draft`)
- Klar (`imext:done`)
- Publicera (`stat:usable`)
- Tidspublicera (`stat:withheld`)

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
- Publicera (`stat:usable`)
- Utkast (`imext:draft`)
- Avplublicera (`stat:canceled`)

**Update an article**
In the writer the user has the option to update the article. This will not result in any change of status (`pubStatus`), this only updates the updated date (`versionCreated` and `contentModified`) of the article.




