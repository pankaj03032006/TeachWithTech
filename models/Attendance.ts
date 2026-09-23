import mongoose,{Schema,Document,Model,Types} from "mongoose";

export interface IAttendance extends Document{

  student:Types.ObjectId;

  teacher:Types.ObjectId;

  subject:string;

  class:string;

  date:Date;

  status:"present" | "absent";

}

const AttendanceSchema = new Schema<IAttendance>(

{

  student:{
    type:Schema.Types.ObjectId,
    ref:"Student",
    required:true
  },

  teacher:{
    type:Schema.Types.ObjectId,
    ref:"Teacher",
    required:true
  },

  subject:{
    type:String,
    required:true
  },

  class:{
    type:String,
    required:true
  },

  date:{
    type:Date,
    required:true
  },

  status:{
    type:String,
    enum:["present","absent"],
    required:true
  }

},

{timestamps:true}

);


/* =========================
   INDEXES
========================= */

/* fast lookup for student attendance history */
AttendanceSchema.index({student:1,date:1});

/* fast lookup for subject attendance */
AttendanceSchema.index({student:1,subject:1,date:1});

/* fast lookup for teacher class attendance */
AttendanceSchema.index({teacher:1,class:1,date:1});

/* prevent duplicate attendance for same student */
AttendanceSchema.index(
  {student:1,class:1,subject:1,date:1},
  {unique:true}
);


const Attendance:Model<IAttendance> =
mongoose.models.Attendance ||
mongoose.model<IAttendance>("Attendance",AttendanceSchema);

export default Attendance;