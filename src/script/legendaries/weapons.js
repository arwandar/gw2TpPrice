import { readFile } from "node:fs/promises";

const generateWeapon = async (number, ext) => {
  let gen = await readFile(
    `./src/script/legendaries/weapon-gen${number}.txt`,
    "utf-8"
  );
  gen = gen.split("\r\n").map((line) => {
    const data = line.split("\t");
    return {
      name: data[0].split(".png ")[1],
      precuName: data[3].split(".png ")[1],
      extension: ext(data[7]),
    };
  });
  return gen;
};

export const getWeapons = async () => [
  ...(await generateWeapon(1, () => "Origins")),
  ...(await generateWeapon(2, (data) =>
    data.includes("Path of Fire") ? "Path of Fire" : "Heart of Thorns"
  )),
  ...(await generateWeapon(3, () => "End of Dragons")),
  ...(await generateWeapon(4, () => "Janthir Wilds")),
];
