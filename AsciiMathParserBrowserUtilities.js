/*

Copyright (c) 2011-2012, The University of Edinburgh
All Rights Reserved

This file is part of AsciiMathParser.js

AsciiMathParser.js is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as published by the
Free Software Foundation; either version 3 of the License, or (at your
option) any later version.

AsciiMathParser.js is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License (at
http://www.gnu.org/licences/lgpl.html) for more details.

You should have received a copy of the GNU Lesser General Public License
along with AsciiMathParser. If not, see <http://www.gnu.org/licenses/lgpl.html>.

AsciiMathParserBrowserUtilities.js
==================================

This contains some helper functions that might be useful if you
want to use AsciiMathParser.js in a browser.

Dependencies:

AsciiMathParser.js

*/

AsciiMathParserBrowserUtilities = {

    createXmlDocument: function() {
        var doc;
        if (document.implementation && document.implementation.createDocument) {
            /* Gecko, Webkit, Opera */
            doc = document.implementation.createDocument("", "", null);
        }
        else {
            try {
                /* Internet Explorer */
                doc = new ActiveXObject("Microsoft.XMLDOM");
            }
            catch (e) {
                throw new Error("I don't know how to create a DOM Document in this browser");
            }
        }
        return doc;
    },

    serializeXmlNode: function(node) {
        var xml;
        try {
            /* Gecko, Webkit, Opera */
            var serializer = new XMLSerializer();
            xml = serializer.serializeToString(node);
        }
        catch (e) {
            try {
                /* Internet Explorer */
                xml = node.xml;
            }
            catch (e) {
                throw new Error("I don't know how to serialize XML in this browser");
            }
        }
        return xml;
    },

    indentMathmlString: function(str) {
        var indent = arguments[1] || 2;
        var newline = arguments[2] || "\n";

        /* This goes for a simple "split on <" approach, which is fine if the input
         * is assumed to be well-formed XML. It will fall apart otherwise!
         */
        var result = "";
        var doIndent = function(level) {
            result += newline;
            for (var j=0; j<indent * level; j++) {
                result += ' ';
            }
        };
        var parts = str.split("<");
        var inTextElement = false;
        var currentIndentLevel = 0;
        for (i=1; i<parts.length; i++) { /* (Starting at 1 since 0 is "bit before <math>" which is empty) */
            var part = parts[i];
            if (part.charAt(0)=='/') { /* </element> */
                if (!inTextElement) { /* </mrow> et al goes on newline */
                    doIndent(currentIndentLevel);
                }
                result += '<' + part;
                currentIndentLevel--;
                inTextElement = false;
            }
            else { /* <element>content? */
                if (i>1) { /* Top-level <math> doesn't need indented */
                    doIndent(++currentIndentLevel);
                }
                result += '<' + part;
                inTextElement = (part.indexOf(">") < part.length);
            }
        }
        return result;
    }
}
