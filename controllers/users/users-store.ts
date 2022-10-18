import { encryptPassword } from "../../helpers/encrypt";
import { models } from "../../models/user-model";
import { IUser, messageDB } from "../../interfaces/user-interface";
import { generateJWT } from "../../utils/jwt";

export const createUserStore = async (body: { [index: string]: any }) => {
  try {
    const { User } = models;
    const { email } = body;
    const isUniqueEmail = await User.findOne({ email });
    if (!isUniqueEmail) {
      const encryptData = encryptPassword(body);
      const user = new User<IUser>(encryptData);
      const responseDB = await user.save();
      //generate JWT
      if (responseDB) {
        const { _id: uid, name, rol } = responseDB;
        const token = await generateJWT({ uid, name, rol });
        return { responseDB, token };
      }
      return responseDB;
    } else {
      const messageErrorDB: messageDB = { message: "" };
      messageErrorDB.message = "Something go wrong trying to create the user";
      return messageErrorDB;
    }
  } catch (error: any) {
    console.error("[createUserStoreFail]: ", error.message);
    return "Something go wrong trying to create the user";
  }
};
