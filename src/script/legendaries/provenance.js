export const getProvenance = (name) => {
  if (name.includes("obsidienne")) return "PvE";
  if (name.includes("émissaire")) return "HL";
  if (name.includes("triomphant")) return "WvW";
  if (name.includes("glorieu")) return "PvP";

  if (
    [
      "Aurora",
      "Vision",
      "Tenue du champion prismatique",
      "Relique légendaire",
      "Cachet légendaire",
      "Rune légendaire",
      "Orrax conjuré",
    ].includes(name)
  )
    return "PvE";

  if (["Confluence", "Porteguerre"].includes(name)) return "WvW";
  if (["Transcendance", "L'Ascension"].includes(name)) return "PvP";

  if (["Coalescence", "Ad Infinitum"].includes(name)) return "HL";

  console.log(name);

  return "unknown";
};
