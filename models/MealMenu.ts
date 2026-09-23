import mongoose,{Schema,Document,Model} from "mongoose";

export interface IMealMenu extends Document{

  day:string;
  menu:string;

}

const MealMenuSchema = new Schema<IMealMenu>({

  day:{
    type:String,
    required:true,
    unique:true
  },

  menu:{
    type:String,
    required:true
  }

});

const MealMenu:Model<IMealMenu> =
mongoose.models.MealMenu ||
mongoose.model<IMealMenu>("MealMenu",MealMenuSchema);

export default MealMenu;