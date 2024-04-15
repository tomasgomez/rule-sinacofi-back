import { IProperty } from "./interface";

class Property implements IProperty {
    name: string;
    columns: number;
    rows: number;
    multiple: boolean;
    multiline: boolean;
    options: string[];

    constructor(name: string, columns: number, rows: number, multiple: boolean, options: string[], multiline: boolean) {
        this.name = name;
        this.columns = columns;
        this.rows = rows;
        this.multiple = multiple;
        this.options = options;
        this.multiline = multiline;
    }
}