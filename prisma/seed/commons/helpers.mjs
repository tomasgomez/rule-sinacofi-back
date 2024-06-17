export const addPriorityValue = (schema) => {
  return schema.map((field, index) => ({ ...field, "priority": `${index + 1}`}));
};

export const disableFields = (schema = [], except = {}) => {

  return schema.map((field) => ({
    ...field,
    rules: (field.rules || "").includes("disabled") ? field.rules : `${field.rules ? `${field.rules},` : ""}disabled`,
  }))
}

export const setOnlyWatch = (fields) => (
  fields.map((field) => ({...field, fieldtype: field.fieldtype === "select" ? "textField" : field.fieldtype }))
)