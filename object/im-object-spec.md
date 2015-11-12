# Infomaker object spec
The idf (infomaker data format) is used to represent the content part (`inlineXML`) of a newsItem. For further information about the idf format please see [object.xsd](https://github.com/Infomaker/writer-format/tree/master/object/object.xsd).

## Revision history
* 1.0	Initial revision.

## The XML (text) explained
```xml
<!-- 
    For more information about <object...>, see object.xsd.
-->
<!-- 
    Attribute @id is mandatory.
    Allowed child elements of <object...> are <data> and <links>.
-->
<object id="46f60ada63fd" type="x-im/image" uri="x-im://image/znX8U1CU124n26zu7gb40_jBzSk.jpeg"
    uuid="c382c937-8511-5d48-9677-55658c2bbb32">
    <!-- Child elements of <data> can be any element including nested hierarchies. -->
    <data>
        <width>1536</width>
        <height>1024</height>
        <text>Maecenas at nisl in lorem egestas egestas.</text>
    </data>

    <!-- Allowed child elements of <links> are restricted to <link>. -->    
    <links>    
        <link title="Jane Doe" rel="author" type="x-im/user"
            uuid="bad4314c-7e33-11e5-8bcf-feff819cdc9f"/>
    </links>
</object>
```