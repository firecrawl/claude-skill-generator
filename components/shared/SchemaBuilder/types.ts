export type JsonSchema = {
  required: string[];
  type: "object";
  properties: Record<string, JsonSchemaProperty>;
};

export type JsonSchemaProperty =
  JsonSchemaProperties[keyof JsonSchemaProperties];

export type JsonSchemaProperties = {
  Object: {
    type: "object";
    required: string[];
    properties: Record<string, JsonSchemaProperty>;
  };
  String: {
    type: "string";
  };
  Number: {
    type: "number";
  };
  Boolean: {
    type: "boolean";
  };
  Array: {
    type: "array";
    items: JsonSchemaProperty;
  };
};

export type PJsonSchema = PJsonSchemaItem[];

export type PJsonSchemaItem = {
  id: string;
  name: string;
  required?: boolean;
  type: PJsonSchemaType;
  parentId: string | null;
  isTypePicker?: boolean;
};

export type PJsonSchemaRenderItem = PJsonSchemaItem & {
  path: string;
  children: PJsonSchemaRenderItem[];
  items?: PJsonSchemaRenderItem;
};

export type PJsonSchemaType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object";
