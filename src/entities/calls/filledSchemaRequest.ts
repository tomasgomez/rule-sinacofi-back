import { OptionalSchema } from "../schema/interface";
import { User } from "../user/interface";


// Request to filled parameters
export type FilledParametersRequest = {
    user: User,
    schema: OptionalSchema
}