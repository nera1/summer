import { visit } from "unist-util-visit";
import { h } from "hastscript";

function AddCopyButton() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "figure") {
        const preTag = node.children.find(
          (child: any) => child.tagName === "pre"
        );
        if (preTag && node.properties && node.properties.codeValue) {
          const codeValue = node.properties.codeValue;
          node.properties.codeValue = undefined;
          const button = h(
            "button",
            {
              type: "button",
              className: "copy-button",
              onclick: `((event)=>{
                const value = \`${codeValue.replace(/`/g, "\\`")}\`;
                navigator.clipboard.writeText(value).then(() => {
                  alert('Code copied to clipboard!');
                }).catch((err) => {
                  console.error('Failed to copy text: ', err);
                });
              })()`,
            },
            [
              h(
                "svg",
                {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                [
                  h("path", {
                    d: "M5 9L5 19H15H17C17 20.1046 16.1046 21 15 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7V9Z",
                    fill: "#dadada",
                  }),
                  h("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M19 5H9L9 15H19V5ZM9 3C7.89543 3 7 3.89543 7 5V15C7 16.1046 7.89543 17 9 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H9Z",
                    fill: "#dadada",
                  }),
                ]
              ),
            ]
          );
          preTag.children.unshift(button);
        }
      }
    });
  };
}

export default AddCopyButton;
