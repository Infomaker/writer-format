# Infomaker idf spec
The idf (infomaker data format) is used to represent the content part (`inlineXML`) of a newsItem. For further information about the idf format please see [idf.xsd](https://github.com/Infomaker/writer-format/blob/master/idf/idf.xsd).

## Revision history
* 1.2   Removed wrapping "element" for block "object". Added namespace to "object"
* 1.1   Added comments.
* 1.0	Initial revision.

## The XML explained
```xml
<!-- 
    For more information about <idf...>, see idf.xsd.
-->
<idf xml:lang="sv" xmlns="http://www.infomaker.se/idf/1.0">
    <!-- Mandatory, i.e. at least one <group...> is expected -->
    <group type="header">
        <!-- 
            Attributes @id and @type are mandatory. Attribute @format is currently not used.
            Allowed children of <element> are <p...> and <object...>.
        -->
        <element id="d0dbf67d385e" type="headline" format="html">
            <!-- xml:space="preserve" is mandatory for <p...>. -->
            <p xml:space="preserve">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </element>
        <element id="8a5ef068ef17" type="dateline" format="html">
            <p xml:space="preserve">New York</p>
        </element>
    </group>
    <group type="body">
        <element id="fafbedf02da1" type="body" format="html">
            <p xml:space="preserve">Mauris eleifend, orci nec volutpat efficitur,
                <!-- 
                    <object...> is described https://github.com/Infomaker/writer-format/tree/master/object.
                    <object...> can occur as an inline element or as a block element.
                -->
                            <object id="59097ae592c7" type="x-im/youtube" url="https://www.youtube.com/watch?v=2H4rJ7iw7W0" title="Maecenas at nisl">
                                <data>
                                    <autoStart>true</autoStart>
                                </data>
                            </object> massa nibh congue libero, sed vehicula libero dui eget neque.</p>
            <p xml:space="preserve">In hac habitasse platea dictumst.</p>
        </element>
        <!-- 
            <object...> as a block element. Note that attribute @type of 
            <element...> should be "object" in this case and that @id of
            <element...> and <object...> should be the same. There can be
            only one <object...> inside an <element...> with @type="object".
        -->
        <object xmlns="http://www.infomaker.se/object/1.0" id="dcc7c5fcf709" type="x-im/image" uuid="f845d7b8-40cb-545a-8069-36e21ff00908">
            <links>
                <link rel="self" type="x-im/image"
                    url="//s3.example-img.se/znX8U1C123JLDjlksdfgb40_jIka.jpeg"
                    uuid="f845d7b8-40cb-545a-8069-36e21ff00908">
                    <data>
                        <caption>Vivamus luctus eros.</caption>
                            <width>1536</width>
                            <height>1024</height>
                    </data>
                    <links>
                        <link rel="author" type="x-im/user" uuid="bad4314c-7e33-11e5-8bcf-feff819cdc9f" title="Jane Doe"/>
                    </links>
                </link>
                <link rel="2x1" type="x-im/softcrop">
                    <data>
                        <x>45</x>
                        <y>80</y>
                        <width>2900</width>
                        <height>1400</height>
                    </data>
                </link>
                <link rel="3x2" type="x-im/softcrop">
                    <data>
                        <x>80</x>
                        <y>5</y>
                        <width>2700</width>
                        <height>1800</height>
                    </data>
                </link>
            </links>
        </object>        
        <element id="c93fe9cfad5d" type="body" format="html">
            <p xml:space="preserve">Aenean ullamcorper faucibus felis suscipit faucibus. Cras eu leo lectus.</p>
        </element>
    </group>
</idf>
```