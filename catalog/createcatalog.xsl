<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:im="http://www.infomaker.se/newsml/1.0"                
                exclude-result-prefixes="xs"
                version="2.0">

    <!--
        XSLT for transforming custom value lists (e.g. globalvaluelist.xml) to
        catalog (cv) files (one per file) and KnowledgeItems (one per value list in
        the file).

        Format of cv and KnowledgeItems according to the NewsML-G2 structure from IPTC.
    -->


    <xsl:template match="/">

        <!--
            As-is, this XSLT is hardcoded for Infomaker global catalogs/Knowledge Items.
            TODO: Use parameters to allow XSLT to handle any type of value list.
        -->

        <xsl:variable name="currentTime" select="current-dateTime()"/>

        <xsl:for-each select="valueLists/valueList">
            <xsl:variable name="id" select="./@alias"/>
            <xsl:variable name="useextensions" select="./@useextensions"/>

            <xsl:if test="$id != ''">

                <!--
                    Result document for KnowledgeItems
                    TODO: As-is hardcoded for Infomaker global values only.
                -->
                <xsl:result-document method="xml" href="im/{$id}/knit_{$id}.xml" encoding="utf-8" indent="yes">

                    <xsl:comment>Knowledge Item for one set of values in owned by Infomaker.</xsl:comment>
                    
                    <xsl:element name="knowledgeItem" namespace="http://iptc.org/std/nar/2006-10-01/">
                        <xsl:attribute name="standard" select="'NewsML-G2'"/>
                        <xsl:attribute name="standardversion" select="'2.18'"/>
                        <xsl:attribute name="conformance" select="'power'"/>
                        <xsl:attribute name="guid" select="concat('im:se:knit:', $id)"/>
                        <xsl:attribute name="version" select="'1'"/>
                        <!--
                        <xsl:attribute name="im" namespace="http://www.infomaker.se/newsml/1.0"/>          
                        -->
                        
                        <xsl:element name="catalogRef" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:attribute name="href" select="'http://www.iptc.org/std/catalog/catalog.IPTC-G2-Standards_27.xml'"/>
                        </xsl:element>
                        
                        <xsl:element name="rightsInfo" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:element name="copyrightHolder" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="uri" select="'http://cv.im.se'"/>
                                <xsl:element name="name" namespace="http://iptc.org/std/nar/2006-10-01/">
                                    <xsl:value-of select="'Infomaker'"/>
                                </xsl:element>
                            </xsl:element>
                            
                            <xsl:element name="usageTerms" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="href" select="'http://creativecommons.org/licenses/by/4.0/'"/>
                                <xsl:value-of select="'The Creative Commons Attribution (CC BY) 4.0 license applies to all Codes.'"/>
                            </xsl:element>
                        </xsl:element>
                        
                        <xsl:element name="itemMeta" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:element name="itemClass" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="qcode" select="'cinat:scheme'"/>
                            </xsl:element>
                            
                            <xsl:element name="provider" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="uri" select="'http://cv.im.se'"/>
                                <xsl:element name="name" namespace="http://iptc.org/std/nar/2006-10-01/">
                                    <xsl:value-of select="'Infomaker'"/>
                                </xsl:element>
                            </xsl:element>
                            
                            <xsl:element name="versionCreated" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:value-of select="$currentTime"/>
                            </xsl:element>
                            
                            <xsl:element name="firstCreated" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:value-of select="$currentTime"/>
                            </xsl:element>
                            
                            <xsl:element name="pubStatus" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="qcode" select="'stat:usable'"/>
                            </xsl:element>
                        </xsl:element>
                        
                        <xsl:element name="contentMeta" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:element name="contentCreated" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:value-of select="$currentTime"/>
                            </xsl:element>
                            
                            <xsl:element name="description" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                <xsl:value-of select="./definition[@xml:lang = 'en-GB']"/>
                            </xsl:element>
                            
                            <xsl:element name="description" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                <xsl:value-of select="./name[@xml:lang = 'en-GB']"/>
                            </xsl:element>
                        </xsl:element>
                        
                        <xsl:element name="conceptSet" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:for-each select="./values/value">
                                <xsl:variable name="valid" select="./@conceptid"/>
                                
                                <xsl:element name="concept" namespace="http://iptc.org/std/nar/2006-10-01/">
                                    <xsl:attribute name="id" select="concat($id, $valid)"/>
                                    <xsl:attribute name="modified" select="$currentTime"/>
                                    
                                    <xsl:element name="conceptId" namespace="http://iptc.org/std/nar/2006-10-01/">
                                        <xsl:choose>
                                            <xsl:when test="$useextensions">
                                                <xsl:attribute name="im:id" select="concat($id, '/', $valid)"/>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:attribute name="qcode" select="concat($id, ':', $valid)"/>
                                            </xsl:otherwise>
                                        </xsl:choose>                                        
                                        <xsl:attribute name="created" select="$currentTime"/>                                                                               
                                    </xsl:element>
                                    
                                    <xsl:element name="type" namespace="http://iptc.org/std/nar/2006-10-01/">
                                        <xsl:attribute name="qcode" select="'cpnat:abstract'"/>                                                                                       
                                    </xsl:element>
                                    
                                    <xsl:element name="name" namespace="http://iptc.org/std/nar/2006-10-01/">
                                        <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                        <xsl:value-of select="./name[@xml:lang = 'en-GB']"/>
                                    </xsl:element>
                                    
                                    <xsl:element name="definition" namespace="http://iptc.org/std/nar/2006-10-01/">
                                        <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                        <xsl:value-of select="./definition[@xml:lang = 'en-GB']"/>
                                    </xsl:element>
                                    
                                    <xsl:if test="./broader" >
                                        <xsl:element name="broader" namespace="http://iptc.org/std/nar/2006-10-01/">
                                            <xsl:attribute name="qcode" select="./broader/text()"/>
                                        </xsl:element>
                                    </xsl:if>
                                </xsl:element>
                            </xsl:for-each>
                        </xsl:element>
                        
                        <xsl:element name="schemeMeta" namespace="http://iptc.org/std/nar/2006-10-01/">
                            <xsl:attribute name="uri" select="concat('http://cv.im.se/', $id)"/>
                            <xsl:attribute name="authority" select="'http://www.infomaker.se'"/>
                            <xsl:attribute name="preferredalias" select="$id"/>
                            
                            <xsl:element name="definition" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                <xsl:value-of select="./definition[@xml:lang = 'en-GB']"/>
                            </xsl:element>
                            
                            <xsl:element name="definition" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                <xsl:value-of select="./name[@xml:lang = 'en-GB']"/>
                            </xsl:element>
                            
                            <xsl:element name="note" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>
                                <xsl:value-of select="'This vocabulary applies Infomaker owned metadata values.'"/>
                            </xsl:element>
                        </xsl:element>
                    </xsl:element>                    

                </xsl:result-document>
            </xsl:if>
        </xsl:for-each>

        <!--
            Result document
        -->
        <xsl:result-document method="xml" href="im/im_catalog.xml" encoding="utf-8" indent="yes">
            <xsl:comment>Catalog file that should be referenced by documents using IMNML. NewsML-G2 is a standard provided by IPTC.</xsl:comment>
            
            <xsl:element name="catalog" namespace="http://iptc.org/std/nar/2006-10-01/">                
                <xsl:attribute name="additionalInfo" select="'http://www.iptc.org/goto?G2cataloginfo'"/>
                                
                <xsl:for-each select="valueLists/valueList">                    
                    <xsl:variable name="id" select="./@alias"/>
                    
                    <xsl:if test="$id != ''">                        
                        <xsl:element name="scheme" namespace="http://iptc.org/std/nar/2006-10-01/">                            
                            <xsl:attribute name="alias" select="$id"/>
                            <xsl:attribute name="uri" select="concat('http://cv.im.se/', $id, '/knit_', $id, '.xml')"/>
                            
                            <xsl:element name="definition" namespace="http://iptc.org/std/nar/2006-10-01/">                                
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>                                
                                <xsl:value-of select="./definition[@xml:lang = 'en-GB']"/>                                
                            </xsl:element>
                            
                            <xsl:element name="name" namespace="http://iptc.org/std/nar/2006-10-01/">
                                <xsl:attribute name="xml:lang" select="'en-GB'"/>                                
                                <xsl:value-of select="./name[@xml:lang = 'en-GB']"/>
                            </xsl:element>
                        </xsl:element>                                                
                    </xsl:if>
                </xsl:for-each>
            </xsl:element>            

        </xsl:result-document>

    </xsl:template>

</xsl:stylesheet>