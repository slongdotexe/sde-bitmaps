import { getModelForClass } from "@typegoose/typegoose";

import { UserClass } from "../classes/Users";

const UsersModel = getModelForClass(UserClass);

export { UsersModel };
