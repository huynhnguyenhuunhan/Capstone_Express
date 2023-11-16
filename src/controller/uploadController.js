import multer, { diskStorage } from "multer";
import fs from "fs";
import compress_images from "compress-images";

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/image",
    filename: (_, file, callback) =>
      callback(null, new Date().getTime() + "_" + file.originalname),
  }),
});

export const convertToBase = async (file) => {
  let data = fs.readFileSync(process.cwd() + "/public/image/" + file.filename);
  let base64 =
    `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64");
  return base64;
};

export const optimizeImage = async (file) => {
  compress_images(
    process.cwd() + "/public/image/" + file.filename,
    process.cwd() + "/public/file/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
    { png: { engine: "pngquant", command: ["--quality=20-30", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {}
  );
};
