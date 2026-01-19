import { nanoid } from "nanoid";

import { JsonSchema, PJsonSchema, PJsonSchemaItem } from "./types";

export const encryptName = (name: string, id?: string) =>
  `${name}#${id ?? nanoid()}`;
export const decryptName = (name: string) => name.split("#")[0];
export const getNameId = (name: string) => name.split("#")[1];

export const prettifyJsonSchema = (
  jsonSchema: JsonSchema,
  parentId: string | null = null,
  required?: string[],
): PJsonSchema => {
  return Object.entries(jsonSchema.properties).flatMap(([key, value]) => {
    const data: PJsonSchemaItem[] = [
      {
        id: nanoid(),
        name: key,
        type: value.type,
        parentId,
        required: Boolean(required && required.includes(key)),
      },
    ];

    if (value.type === "object") {
      data.push(
        ...prettifyJsonSchema(value as JsonSchema, data[0].id, value.required),
      );
    }

    if (value.type === "array") {
      const typePickerId = nanoid();

      data.push({
        id: typePickerId,
        type: value.items.type,
        isTypePicker: true,
        parentId: data[0].id,
        name: "",
      });

      if (value.items.type === "object") {
        data.push(
          ...prettifyJsonSchema(value.items as JsonSchema, typePickerId),
        );
      }
    }

    return data;
  });
};

export function unprettifyJsonSchema(flat: PJsonSchema): JsonSchema {
  function build(parentId: string | null): JsonSchema {
    const children = flat.filter(
      (item) => item.parentId === parentId && !item.isTypePicker,
    );

    const schema: JsonSchema = {
      type: "object",
      required: [],
      properties: {},
    };

    const required: string[] = [];

    for (const item of children) {
      const { id, name, type, required: isRequired } = item;

      if (type === "object") {
        (schema.properties as Record<string, JsonSchema>)[name] = build(id);
      } else if (type === "array") {
        const picker = flat.find(
          (child) => child.parentId === id && child.isTypePicker,
        );

        const itemsSchema = picker ? build(picker.id) : { type: "object" };
        (schema.properties as Record<string, JsonSchema>)[name] = {
          type: "array",
          items: itemsSchema,
        } as any;
      } else {
        (schema.properties as Record<string, JsonSchema>)[name] = {
          type,
        } as any;
      }

      if (isRequired) {
        required.push(name);
      }
    }

    if (required.length > 0) {
      schema.required = required;
    }

    return schema;
  }

  return build(null);
}
