function createHex() {
  let hexCode1 = "";
  const hexValues1 = "0123456789abcdef";

  for (var i = 0; i < 6; i++) {
    hexCode1 += hexValues1.charAt(
      Math.floor(Math.random() * hexValues1.length)
    );
  }
  return hexCode1;
}

function generateCSS() {
  const deg = Math.floor(Math.random() * 360);

  const gradient =
    "linear-gradient(" +
    deg +
    "deg, " +
    "#" +
    createHex() +
    ", " +
    "#" +
    createHex() +
    ")";
  return gradient;
}

export default function RandomCategoryIcon() {
  return (
    <div
      style={{
        background: generateCSS(),
        width: 16,
        height: 16,
        borderRadius: "50%",
      }}
    ></div>
  );
}
