import { DefaultCalls } from "../../entities/calls/interface";
import { ITypeUsecase } from "../../usecases/type/usecase";

// Define the Rule API interface

interface TypeAPI extends DefaultCalls {
    usecase: ITypeUsecase;
}

export { TypeAPI };