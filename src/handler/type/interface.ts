import { ICalls } from "../../entities/calls/interface";
import { ITypeUsecase } from "../../usecases/type/usecase";

// Define the Rule API interface

interface ITypeAPI extends ICalls {
    usecase: ITypeUsecase;
}

export { ITypeAPI };