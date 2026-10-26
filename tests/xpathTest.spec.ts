//Types of XPath:

// 1. Absolute XPath(Full XPath)
// - It provides the full path from the root of the document to the target Element
// - it starts with a single /, which represents root node
// - Exm : /html/body/header/div/div[2]/dive/input
// 2. Relative XPath(Partial XPath)
// - It is more a flexible way of finding an element. It directly jumps to the element using attributes, without starting from the root.
// - It starts with //, which allows XPath to search anywhere in the document.
// - exm: //*[@name="search"]
//====
//Whihc is preferred : Relative XPath is preferred because it is shorter, easier to maintain, and less likely to break if the webpage structure changes