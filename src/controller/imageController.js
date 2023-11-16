import { decodeToken } from "../config/jwt.js";
import { sequelize } from "../models/connect.js";
import initModels from "../models/init-models.js";
import { convertToBase, optimizeImage } from "./uploadController.js";

const model = initModels(sequelize);

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

// Get Images
export const getImage = async (_, res) => {
  try {
    const data = await model.hinh_anh.findAll();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Search Image By Name
export const searchImage = async (req, res) => {
  try {
    let { search_name } = req.query;
    let data = await model.hinh_anh.findAll();
    data = data.filter((image) => {
      search_name = removeVietnameseTones(search_name).toLowerCase();
      let ten_hinh = removeVietnameseTones(image.ten_hinh).toLowerCase();
      return ten_hinh.includes(search_name);
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Get Detail Image and User upload
export const getDetailImage = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    const data = await model.hinh_anh.findOne({
      where: {
        hinh_id,
      },
      include: ["nguoi_dung"],
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Get comment by image_id
export const getCommentImage = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    const data = await model.binh_luan.findAll({
      where: {
        hinh_id,
      },
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Get information about whether this image has been saved yet
export const getImageSave = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    const checkSaveImage = await model.luu_anh.findOne({
      where: {
        nguoi_dung_id: userInfo.nguoi_dung_id,
        hinh_id: hinh_id,
      },
    });
    if (checkSaveImage) {
      return res.status(200).send("Bạn đã lưu ảnh này");
    }
    return res.status(200).send("Bạn chưa lưu ảnh này");
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Save comment of user for image
export const saveComment = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const { noi_dung } = req.body;
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    await model.binh_luan.create({
      nguoi_dung_id: userInfo.nguoi_dung_id,
      hinh_id,
      ngay_binh_luan: currentDate,
      noi_dung,
    });
    return res.status(201).send("Thêm bình luận thành công");
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
// Upload image
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const { mo_ta } = req.body;
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    if (file.size > 500000) {
      optimizeImage(file);
    }
    await model.hinh_anh.create({
      ten_hinh: file.filename,
      duong_dan: await convertToBase(file),
      mo_ta,
      nguoi_dung_id: userInfo.nguoi_dung_id,
    });
    return res.status(201).send("Thêm ảnh thành công");
  } catch (error) {
    return res.status(404).send("NOT FOUND");
  }
};
