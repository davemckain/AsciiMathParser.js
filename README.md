Introduction
============

AsciiMathParser.js is a cut-down, modified and encapsulated version of Peter
Jipsen's ASCIIMathML.js v2.1 code that contains only the logic for parsing
ASCIIMath math expressions into MathML, building a DOM &lt;math&gt; Element.

As a result, the ASCIIMath parsing code is no longer tied to a browser, making
it easier to use in other contexts (e.g. on the server) or to integrate into
your own code.

Doing this had always seemed like a good idea to me - if you're interested
you can read more about my rationale at:

(http://davemckain.blogspot.co.uk/2011/03/asciimathparserjs-released.html)

Download and Contact
====================

This code may be downloaded from (https://github.com/davemckain/AsciiMathParser.js)

You can contact me at david.mckain \[at\] ed \[dot\] ac \[dot\] uk

License
=======

Peter Jipsen's original ASCIIMathML.js code is LGPL licensed, so I've preserved
that here.

Usage
=====

1. Obtain a DOM Document
------------------------

First of all, you need to get yourself an XML DOM Document Object. If you're in
a browser, you can do this yourself quite easily. I've also provided a utility
file called `AsciiMathParserBrowserUtilities.js` that contains a method to make
this even easier for you:

    var document = AsciiMathParserBrowserUtilities.createXmlDocument();

(This should work in most modern browsers. If it doesn't, let me know and I'll fix it!)

If you're using this code in a non-browser environment, you may have access to
a reasaonable DOM implementation that you can use. If not you may have to build your
own. One thing that certainly works is using a Java `org.w3c.dom.Document` object
and calling this code via the Rhino JavaScript engine. (In this case, I suggest you
use my `asciimath-parser` Java code to simplify this for you.)

2. Create a parser
------------------

Make sure you first pull in `AsciiMathParser.js`, which contains all
of the parsing code. Then:

    var asciiMathParser = new AsciiMathParser(document);

creates a new ASCIIMathML parser that will use the DOM document you
provide to build the resulting MathML elements

Note: An instance of AsciiMathParser() is _not_ safe to use by multiple threads.

3. Parse snippets of ASCIIMath input
------------------------------------

You can now use your parser to parse ASCIIMath input strings, which will
return a MathML &lt;math&gt; DOM Element Object:

    var mathElement = asciiMathParser.parseAsciiMathInput("ax^2 + bx + c");

You can call this method as many times as you like.

4. Do something fabulous with your MathML
-----------------------------------------

You're hopefully now planning to do something exciting with the resulting
MathML objects. If you think the DOM is too complicated and would rather have
an XML string, then the `AsciiMathParserBrowserUtilities.js` utility class has
a couple of functions which might be useful:

  var mathmlString = AsciiMathParserBrowserUtilities.serializeXmlNode(mathElement);
  var nicerMathmlString = AsciiMathParserBrowserUtilities.indentMathmlString(mathmlString);

That's pretty much all there is to say. Enjoy!
