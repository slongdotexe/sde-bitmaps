import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: { collection: "Users" },
  options: { allowMixed: Severity.ERROR },
})
class UserClass extends TimeStamps {
  @prop({ required: true })
  name!: string;
}

export { UserClass };
