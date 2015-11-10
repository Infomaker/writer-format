# Infomaker NewsML spec
*Note: This NewsML spec concerns Infomakers implementation of NewsML for Writer (Infomakers web based editor).*

The XML variant used [IPTC NewsML G2 2.20](https://iptc.org/standards/newsml-g2/).

## Revision history
* 1.0	Initial revision.
* 1.1   Added XML eplained.

## XML outline
All articles are represented as `<newsItem>`s with `<itemClass qcode="ninat:text">`. "Internal" images, i.e. images that are stored as part of the customers content, are represented as `<newsItem>`s with `<itemClass qcode="ninat:picture">`.

## The XML explained
```
<newsItem xmlns="http://iptc.org/std/nar/2006-10-01/" version="1" conformance="power"
    standardversion="2.20" standard="NewsML-G2" guid="1d02738f-7c99-42ba-a6da-3d1b97261523">
    <!-- catalog for ninat:, nprov:, irel:, cpnat:, drol:, etc... -->
    <catalogRef href="http://www.iptc.org/std/catalog/catalog.IPTC-G2-Standards_27.xml"/>
    <catalogRef href="http://infomaker.se/spec/catalog/catalog.infomaker.g2.1_0.xml"/>    
    
    <itemMeta>
        <!-- Identifies the newsItem as an aricle. -->
        <itemClass qcode="ninat:text"/>
        
        <!-- The party (person or organisation) responsible for the management of the Item. -->
        <provider literal="John Doe"/>
        <versionCreated>2015-07-01T14:11:20+02:00</versionCreated>
        <firstCreated>2015-07-01T14:00:02+02:00</firstCreated>
        
        <!-- The publishing status of the Item, its value is "usable" by default. -->
        <pubStatus qcode="stat:withheld"/>

        <!-- An editorial service to which an item is assigned by its provider. -->
        <service qcode="imchn:premium"/>
        <service qcode="imchn:test"/>
        
        <!-- Mandatory. -->
        <title>Proin eget dignissim ipsum</title>
        
        <edNote>Duis eget magna lacus. In sodales lectus vel egestas rhoncus</edNote>

        <!-- 
            The QCodeType prefix of the extensions (itemMetaExtProperty) used
            is "imext:" where im stands for Infomaker.
        -->
        
        <!-- Uniform resource indicator. -->
        <itemMetaExtProperty type="imext:uri" value="x-im://1d02738f-7c99-42ba-a6da-3d1b97261523"/>
        
        <!-- Uniform resource locator. -->
        <itemMetaExtProperty type="imext:url" value="http://example.org/articles/1d02738f-7c99-42ba-a6da-3d1b97261523.xml"/>

        <!-- Publication start date. -->    
        <itemMetaExtProperty type="imext:pubstart" value="2015-07-01T14:27:00+02:00"/>
        
        <!-- Publication stop date. -->
        <itemMetaExtProperty type="imext:pubstop" value="2015-10-05T15:14:13+02:00"/>

        <!-- Article type and type id. -->
        <itemMetaExtProperty type="imext:type" value="Web article"/>
        <itemMetaExtProperty type="imext:typeid" value="285"/>

        <!-- Article subtype and subtype id. -->
        <itemMetaExtProperty type="imext:subtype" value="Article"/>
        <itemMetaExtProperty type="imext:subtypeid" value="1"/>

        <!-- 
            The "links" element contains resources of various kinds that are
            linked to the article. Each link must have a "rel" and a "type".                       
        -->
        <links xmlns="http://www.infomaker.se/newsml/1.0">
            <!-- Related article. -->
            <link title="Quisque pharetra id velit quis commodo" rel="article" type="x-im/article"
                uuid="2175c4bb-fdcc-5a52-bc3b-658562f554cf"/>

            <!-- Creator. -->
            <link title="John Doe" rel="creator" type="x-im/user"
                uuid="9e1653f3-7575-4cb7-9b74-dc4dea63513e">
                <data>
                    <email>john.doe@example.org</email>
                    <altId>58456</altId>
                </data>
            </link>

            <!-- Author. -->
            <link title="Jane Doe" rel="author" type="x-im/user"
                uuid="bad4314c-7e33-11e5-8bcf-feff819cdc9f">
                <data>
                    <email>jane.doe@example.org</email>
                    <altId>456</altId>
                </data>
                <links>
                    <link rel="avatar" type="x-im/image"
                        url="//example.org/byline/images/janedoe.jpg"/>
                </links>
            </link>

            <!-- Main section. -->
            <link title="Sport" rel="section" type="x-im/mainsection">
                <data>
                    <altId>87521</altId>
                </data>
            </link>

            <!-- Other sections. -->
            <link title="Local" rel="section" type="x-im/section">
                <data>
                    <altId>45784</altId>
                </data>
            </link>

            <!-- Category. -->
            <link title="Hedemora" rel="subject" type="x-im/category"
                uuid="d72eb011-1552-4af4-8d15-cd4f8c157a87">
                <data>
                    <fullPath>Allmänt/Dalarna/Hedemora</fullPath>
                </data>
            </link>

            <!-- Topic. -->
            <link title="Volvo" rel="subject" type="x-im/topic"
                uuid="b201e042-555b-11e5-885d-feff819cdc9f">
                <data>
                    <category>CARS</category>
                </data>
            </link>

            <!-- Place. -->
            <link title="Alvesta" rel="subject" type="x-im/place"
                uuid="bce38dda-555b-11e5-885d-feff819cdc9f">
                <data>
                    <positions>
                        <position>
                            <latitude>56.89921039999999</latitude>
                            <longitude>14.556000600000061</longitude>
                        </position>
                    </positions>
                </data>
            </link>
        </links>
    </itemMeta>
    <contentMeta>
        <contentCreated>2015-07-01T14:00:02+02:00</contentCreated>
        <contentModified>2015-07-01T14:11:20+02:00</contentModified>

        <!-- 
            Element contains information regarding the person who has 
            created the article. There can be only one "creator".
            
            Note that "remoteInfo" (if present) should reference to
            a "links/link" with rel="creator" and type="x-im/user".
        -->
        <creator type="cpnat:person">
            <name>John Doe</name>
            <remoteInfo residref="9e1653f3-7575-4cb7-9b74-dc4dea63513e"/>
        </creator>

        <!-- 
            Element represent the person/persons that are found in
            the article´s byline(s).
            
            Note that "remoteInfo" (if present) should reference to
            "links/link" with rel="author" and type="x-im/user".
        -->
        <contributor type="cpnat:person">
            <name>Jane Doe</name>
            <remoteInfo residref="bad4314c-7e33-11e5-8bcf-feff819cdc9f"/>
        </contributor>

        <slugline>Praesent nisl risus, lobortis sed congue at...</slugline>
        <description>Quisque ullamcorper non ligula vel commodo.</description>

        <!-- 
            Element represent "Category".
            
            Note that "remoteInfo" (if present) should reference to
            "links/link" with rel="subject" and type="x-im/category".
        -->
        <subject type="cpnat:abstract">
            <name>Allmänt/Dalarna/Hedemora</name>
            <remoteInfo residref="d72eb011-1552-4af4-8d15-cd4f8c157a87"/>
        </subject>

        <!-- 
            Element represent "Topic" (Tag).
            
            Note that "remoteInfo" (if present) should reference to
            "links/link" with rel="subject" and type="x-im/topic".
        -->
        <subject type="cpnat:object">
            <name>Volvo</name>
            <remoteInfo residref="b201e042-555b-11e5-885d-feff819cdc9f"/>
        </subject>

        <!-- 
            Element represent "Place".
            
            Note that "remoteInfo" (if present) should reference to
            "links/link" with rel="subject" and type="x-im/place".
        -->
        <subject type="cpnat:poi">
            <name>Alvesta</name>
            <remoteInfo residref="bce38dda-555b-11e5-885d-feff819cdc9f"/>
        </subject>

        <!-- Language in content. -->
        <language tag="en"/>

        <!-- Extraced from "contributor":s. -->
        <by>Jane Doe</by>

        <!-- Extracted from content/headline. -->
        <headline>Lorem ipsum dolor sit amet, consectetur adipiscing elit</headline>

        <!-- 
            News prio, lifetime and lifetime end date for article. Valid values
            described below.
            
            imext:prio: 1 - 6 where 1 is lowest priority.            
            
            imext:lifetimename and imext:lifetimecode are stored as pairs
            6H/PT6H
            1D/P1D
            7D/P7D
            30D/P30D
            ∞/0 (infinite)

            imext:lifetimeend: date format yyyy-MM-dd'T'HH:mm:ssZ. null allowed.
        -->        
        <contentMetaExtProperty type="imext:prio" value="1"/>
        <contentMetaExtProperty type="imext:lifetimename" value="6H"/>
        <contentMetaExtProperty type="imext:lifetimecode" value="PT6H"/>        
        <contentMetaExtProperty type="imext:lifetimeend" value="2016-01-31T10:00:00.000+01:00"/>

        <!-- 
            The "metadata" element contains metadata that are included in the article
            but not part of the content itself.
        -->
        <metadata xmlns="http://www.infomaker.se/newsml/1.0">
            <!-- Teaser text for the article. -->
            <object id="8400c74d667e" type="x-im/teaser"
                title="Sed sit amet turpis a purus fringilla">
                <data>
                    <text>Duis eget magna lacus. In sodales lectus vel egestas rhoncus. Fusce
                        ultrices urna vel ante sodales tincidunt. Maecenas at nisl in lorem egestas
                        egestas id sed ipsum. Sed aliquam gravida dolor.</text>
                </data>
                <links>
                    <link rel="image" type="x-im/image"
                        uri="x-im://image/znX8U1CU124n26zu7gb40_jBzSk.jpeg"
                        uuid="c382c937-8511-5d48-9677-55658c2bbb32">
                        <data>
                            <width>1536</width>
                            <height>1024</height>
                        </data>
                    </link>
                </links>
            </object>

            <!-- Related image that is not placed in content. -->
            <object id="46f60ada63fd" type="x-im/image"
                uri="x-im://image/znX8U1CU124n26zu7gb40_jBzSk.jpeg"
                uuid="c382c937-8511-5d48-9677-55658c2bbb32">
                <data>
                    <width>1536</width>
                    <height>1024</height>
                    <text>Maecenas at nisl in lorem egestas egestas.</text>
                </data>
                <links>
                    <link title="Jane Doe" rel="author" type="x-im/user"
                        uuid="bad4314c-7e33-11e5-8bcf-feff819cdc9f"/>
                </links>
            </object>
        </metadata>
    </contentMeta>
    <contentSet>
        <inlineXML>
            <idf xml:lang="en" xmlns="http://www.infomaker.se/idf/1.0">
                <!-- "idf" is documented in separate document -->
            </idf>
        </inlineXML>
    </contentSet>
</newsItem>
```