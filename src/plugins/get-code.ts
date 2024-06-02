import { visit } from "unist-util-visit";

function GetCode() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre") {
        const code = node.children.find(
          (child: any) => child.tagName === "code"
        );
        if (code) {
          node.properties.codeValue = code.children[0].value;
        }
      }
    });
  };
}

export default GetCode;
