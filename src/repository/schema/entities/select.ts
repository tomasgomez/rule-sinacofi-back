

/*
    This function is used to set select values.
    @param optionValues: readonly string[]
    @returns Record<T, boolean>
    where S: type of the params to be selected
    where T: Prisma type of the params selected
*/

const setSelectValues = <S, T extends keyof S>(select: readonly string[]): Record<T, boolean> => {
    return select.reduce<Record<T, boolean>>((acc, value) => {
        acc[value as T] = true;  
        return acc;
    }, {} as Record<T, boolean>);
  };


export { setSelectValues };