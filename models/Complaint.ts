import mongoose,{Schema,Document,Model,Types} from "mongoose";

export interface IComplaint extends Document{

  fromRole:"teacher" | "student";

  type:"teacher" | "meal";

  student?:Types.ObjectId;

  teacher?:Types.ObjectId;

  message:string;

  action?:string;

  status:"pending" | "resolved";

}

const ComplaintSchema = new Schema<IComplaint>({

  fromRole:{
    type:String,
    enum:["teacher","student"],
    required:true
  },

  type:{
    type:String,
    enum:["teacher","meal"],
    required:true
  },

  student:{
    type:Schema.Types.ObjectId,
    ref:"Student"
  },

  teacher:{
    type:Schema.Types.ObjectId,
    ref:"Teacher"
  },

  message:{
    type:String,
    required:true
  },

  action:{
    type:String
  },

  status:{
    type:String,
    enum:["pending","resolved"],
    default:"pending"
  }

},{timestamps:true});

const Complaint:Model<IComplaint> =
mongoose.models.Complaint ||
mongoose.model<IComplaint>("Complaint",ComplaintSchema);

export default Complaint;