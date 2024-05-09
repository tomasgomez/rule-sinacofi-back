import { OptionValue } from "../../../entities/paremeters/interface";
import { IParameterOptionResponse } from "../entities/manyToMany";


const optionValuesToEntity = (optionValues: IParameterOptionResponse[]): OptionValue[] => {
    return optionValues?.map((values: IParameterOptionResponse) => {
        const optionValue = values.optionValue;
        const opt: OptionValue  = {
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