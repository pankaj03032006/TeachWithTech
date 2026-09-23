import mongoose,{Schema,Document,Model,Types} from "mongoose";

export interface ISchedule extends Document {
  teacher: Types.ObjectId
  class: string
  subject: string
  day: string
  startTime: string
  endTime: string

  room?: string
  topic?: string
  instructions?: string
  isActive?: boolean
}
const ScheduleSchema = new Schema<ISchedule>({
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },

  class: String,

  subject: String,

  day: String,

  startTime: String,

  endTime: String,

  room: String,

  topic: String,

  instructions: String,

  isActive: {
    type: Boolean,
    default: true
  }

},{timestamps:true})

const Schedule:Model<ISchedule> =
mongoose.models.Schedule ||
mongoose.model<ISchedule>("Schedule",ScheduleSchema);

export default Schedule;