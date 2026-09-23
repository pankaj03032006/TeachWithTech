import mongoose,{Schema,Document,Model,Types} from "mongoose";

export interface IDBT extends Document{

  student:Types.ObjectId;

  type:string;

  amount:number;

  transactionId:string;

  status:"pending" | "credited";

  date:Date;

}

const DBTSchema = new Schema<IDBT>({

  student:{
    type:Schema.Types.ObjectId,
    ref:"Student"
  },

  type:{
    type:String
  },

  amount:{
    type:Number
  },

  transactionId:{
    type:String
  },

  status:{
    type:String,
    enum:["pending","credited"],
    default:"pending"
  },

  date:{
    type:Date,
    default:Date.now
  }

});

const DBT:Model<IDBT> =
mongoose.models.DBT ||
mongoose.model<IDBT>("DBT",DBTSchema);

export default DBT;