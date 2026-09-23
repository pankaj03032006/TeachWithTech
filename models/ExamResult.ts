import mongoose,{Schema,Document,Model,Types} from "mongoose";

export interface IExamResult extends Document{

  student:Types.ObjectId;

  teacher:Types.ObjectId;

  subject:string;

  class:string;

  examType:string;

  marks:number;

  maxMarks:number;

  percentage:number;

  grade:string;

  examDate:Date;

}

const ExamResultSchema = new Schema<IExamResult>({

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

  examType:{
    type:String,
    required:true
  },

  marks:{
    type:Number,
    required:true
  },

  maxMarks:{
    type:Number,
    required:true
  },

  percentage:{
    type:Number
  },

  grade:{
    type:String
  },

  examDate:{
    type:Date,
    default:Date.now
  }

},{timestamps:true});


/* auto calculate percentage + grade */

ExamResultSchema.pre("save",function(){

  const doc = this as IExamResult;

  doc.percentage = (doc.marks/doc.maxMarks)*100;

  if(doc.percentage>=90) doc.grade="A+";
  else if(doc.percentage>=80) doc.grade="A";
  else if(doc.percentage>=70) doc.grade="B";
  else if(doc.percentage>=60) doc.grade="C";
  else if(doc.percentage>=50) doc.grade="D";
  else doc.grade="F";


});


ExamResultSchema.index({student:1,examType:1});
ExamResultSchema.index({student:1,subject:1});
ExamResultSchema.index(
  {student:1,subject:1,examType:1},
  {unique:true}
);

const ExamResult:Model<IExamResult> =
mongoose.models.ExamResult ||
mongoose.model<IExamResult>("ExamResult",ExamResultSchema);

export default ExamResult;