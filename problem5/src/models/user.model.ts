import * as mongoose from 'mongoose'

interface IUser {
    name: string;
    age: number;
}

interface UserDoc extends mongoose.Document {
    name: string;
    age: number;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        type: Number
    }
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
  }
  
const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema)

User.build({
    name: 'some name',
    age: 0
})
  
export { User }
