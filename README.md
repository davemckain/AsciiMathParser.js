# Introduction

AsciiMathParser.js is a cut-down, modified and encapsulated version of Peter
Jipsen's ASCIIMathML.js v2.1 code that contains only the logic for parsing
ASCIIMath math expressions into MathML.

This decouples the ASCIIMath parsing code so that is no longer tied to being
run in a browser, opening it up for developers to use it in lots of interesting
ways, such as:

* Integrating ASCIIMath input syntax with a different browser display engine, such as MathJax.
* Using ASCIIMath outside the browser.
* Unit testing the ASCIIMath parser.

# Warning

This code was developed in 2010/2011 and hasn't been updated since then. 

# Download

This code may be downloaded from https://github.com/davemckain/AsciiMathParser.js/blob/master/AsciiMathParser.js

# Demo

There's a trivial static HTML demo page included here: see **demo.html**.

# Usage

## 1. Obtain a DOM Document

First of all, you need to get yourself an XML DOM Document Object. If you're in
a browser, you can do this yourself quite easily. I've also provided a utility
file called `AsciiMathParserBrowserUtilities.js` that contains a method to make
this even easier for you:
```
var document = AsciiMathParserBrowserUtilities.createXmlDocument();
```

NOTE: This should work in most modern browsers (as of 2010-ish), including
Firefox, Internet Explorer, Chrome, Safari and Opera. I originally tried to
make sure it works with Microsoft's slightly lacking DOM implementation in
Internet Explorer at but haven't been able to check many versions of MSXML
and this hasn't been tested for a long time now!)

If you're using this code in a non-browser environment, you may have access to
a reasonable DOM implementation that you can use. If not you may have to build your
own. One thing that certainly works is using a Java `org.w3c.dom.Document` object
and calling this code via the Rhino JavaScript engine. (In this particular
case, I suggest you use my `asciimath-parser` Java code to simplify this for
you.)

## 2. Create a parser

Make sure you first pull in `AsciiMathParser.js`, which contains all
of the parsing code. Then:
```
var asciiMathParser = new AsciiMathParser(document);
```
creates a new ASCIIMathML parser that will use the DOM document you
provide to build the resulting MathML elements

Note: An instance of AsciiMathParser() is _not_ safe to use by multiple threads.

## 3. Parse snippets of ASCIIMath input

You can now use your parser to parse ASCIIMath input strings, which will
return a MathML &lt;math&gt; DOM Element Object:

```
var mathElement = asciiMathParser.parseAsciiMathInput("ax^2 + bx + c");
```

You can call this method as many times as you like. You may pass an optional
second argument to pass additional options to the compiler. If present, this
argument should be a Java object containing some of the following values:

* `displayMode (true|false)`: if true, a `display="block"` attribute will be added
to the resulting <math> element.
* `addSourceAnnotation (true|false)`: If true, a MathML `<annotation
encoding="ASCIIMathInput">` element will be added to the resulting MathML that
contains the original ASCIIMath input.

## 4. Do something fabulous with your MathML

You're hopefully now planning to do something exciting with the resulting
MathML objects. If you think the DOM is too complicated and would rather have
an XML string, then the `AsciiMathParserBrowserUtilities.js` utility class has
a couple of functions which might be useful:
```
var mathmlString = AsciiMathParserBrowserUtilities.serializeXmlNode(mathElement);
var nicerMathmlString = AsciiMathParserBrowserUtilities.indentMathmlString(mathmlString);
```
That's pretty much all there is to it. Enjoy, maybe.

# Limitations

* This code only parses ASCIIMath input syntax. There is currently no support for
its LaTeX input syntax, or its SVG/graphics features.

* The MathML generated doesn't include any of the extra attributes and
styling that ASCIIMathML adds. You can add these yourself if needed by
manipulating the resulting MathML Element.

# License

Peter Jipsen's original ASCIIMathML.js v2.1 code is LGPL 2.1 licensed,
so I've preserved that here.

# Author

You can contact me at david \[dot\] mckain \[at\] ed \[dot\] ac \[dot\] uk
