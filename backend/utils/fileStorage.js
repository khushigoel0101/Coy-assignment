
import fs from "fs";
import path from "path";

export const readJSON = (filePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
};

export const writeJSON = (filePath, data) => {
  const temporaryPath = `${filePath}.tmp`;

  fs.writeFileSync(
    temporaryPath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  fs.renameSync(temporaryPath, filePath);
};
