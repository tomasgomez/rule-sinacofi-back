import { IOptionValue } from "../../../entities/paremeters/interface";
import { IParameterOptionResponse } from "../entities/manyToMany";


const optionValuesToEntity = (optionValues: IParameterOptionResponse[]): IOptionValue[] => {
    return optionValues?.map((values: IParameterOptionResponse) => {
        const optionValue = values.optionValue;
        const opt: IOptionValue  = {
        name: optionValue.name,
        type: optionValue.type,
        description: optionValue.description,
        value: optionValue.value,
        label: optionValue.label,
        createdAt: optionValue.createdAt,
        updatedAt: optionValue.updatedAt   
    }
    return opt;
})
}

export { optionValuesToEntity };