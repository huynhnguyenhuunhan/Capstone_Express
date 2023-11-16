import { createToken, decodeToken } from "../config/jwt.js";
import { sequelize } from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";
import { convertToBase } from "./uploadController.js";

const model = initModels(sequelize);

// Sign Up
export const userSignUp = async (req, res) => {
  try {
    const { email, mat_khau, ho_ten, tuoi } = req.body;
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return res.status(400).send("Email đã tồn tại");
    }
    await model.nguoi_dung.create({
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
    });
    return res.status(201).send("Đăng ký thành công");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Login
export const userLogin = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      if (bcrypt.compareSync(mat_khau, checkEmail.mat_khau)) {
        const token = createToken({
          email,
          mat_khau,
        });
        return res.status(201).send(token);
      }
      return res.status(400).send("Mật khẩu không đúng");
    }
    return res.status(400).send("Email không tồn tại");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Get Detail User
export const getDetailUser = async (req, res) => {
  try {
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    return res.status(200).send(userInfo);
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Get List Of Save Images
export const getListImages = async (req, res) => {
  try {
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    const listImages = await model.luu_anh.findAll({
      where: {
        nguoi_dung_id: userInfo.nguoi_dung_id,
      },
      include: ["hinh"],
    });
    return res.status(200).send(listImages);
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Get List Of Make Images
export const getListImagesMake = async (req, res) => {
  try {
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    const listImages = await model.hinh_anh.findAll({
      where: {
        nguoi_dung_id: userInfo.nguoi_dung_id,
      },
    });
    return res.status(200).send(listImages);
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Delete Image By Id_image
export const deleteImage = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const { token } = req.headers;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    const checkImage = await model.hinh_anh.findOne({
      where: {
        nguoi_dung_id: userInfo.nguoi_dung_id,
        hinh_id,
      },
    });
    if (checkImage) {
      await model.hinh_anh.destroy({
        where: {
          hinh_id,
        },
      });
      return res.status(200).send("Xóa thành công");
    }
    return res
      .status(401)
      .send("Bạn không phải là người tạo nên không có quyền xóa");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Update UserInfo
export const updateUserinfo = async (req, res) => {
  try {
    const { token } = req.headers;
    const { ho_ten, tuoi } = req.body;
    const account = decodeToken(token).data;
    const userInfo = await model.nguoi_dung.findOne({
      where: {
        email: account.email,
      },
    });
    const updateUser = {
      ...userInfo,
      ho_ten,
      tuoi,
    };
    await model.nguoi_dung.update(updateUser, {
      where: {
        nguoi_dung_id: userInfo.nguoi_dung_id,
      },
    });
    return res.status(200).send("Cập nhật thành công");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
// Upload Avatar
export const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
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
    await model.nguoi_dung.update(
      {
        ...userInfo,
        anh_dai_dien: await convertToBase(file),
      },
      {
        where: {
          nguoi_dung_id: userInfo.nguoi_dung_id,
        },
      }
    );
    return res.send("Upload ảnh đại diện thành công");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
};
