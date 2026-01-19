"use client";

import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";

import { Playground } from "../Playground/Context/Context";

import SchemaBuilderAdd from "./Add/Add";
import { SchemaBuilderRow } from "./Row/Row";
import { PJsonSchema, PJsonSchemaItem, PJsonSchemaRenderItem } from "./types";
import { prettifyJsonSchema, unprettifyJsonSchema } from "./utils";

export default function SchemaBuilder({
  isExtract = false,
}: {
  isExtract?: boolean;
}) {
  const form = Playground.useForm();

  const [schema, setSchema] = useState<PJsonSchema>(
    prettifyJsonSchema(
      isExtract ? form.watch("extractSchema") : form.watch("jsonSchema"),
    ),
  );

  const tree = useMemo(() => buildRenderTree(schema), [schema]);

  useEffect(() => {
    if (isExtract) {
      form.setValue("extractSchema", unprettifyJsonSchema(schema));
    } else {
      form.setValue("jsonSchema", unprettifyJsonSchema(schema));
    }
  }, [schema]);

  const handleUpdate = (id: string, updates: Partial<PJsonSchemaItem>) => {
    if ("type" in updates) {
      if (updates.type === "array") {
        const currentTypePicker = schema.find(
          (item) => item.parentId === id && item.isTypePicker,
        );

        if (!currentTypePicker) {
          setSchema((prev) => [
            ...prev.filter((item) => item.parentId !== id),
            {
              id: nanoid(),
              name: "",
              type: "string",
              parentId: id,
              isTypePicker: true,
            },
          ]);
        }
      } else {
        const currentItem = schema.find((item) => item.id === id);

        if (currentItem?.type === "array") {
          setSchema((prev) =>
            prev.filter(
              (item) =>
                !(item.parentId === currentItem.id && item.isTypePicker),
            ),
          );
        }
      }
    }

    setSchema((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const handleAddChild = (parentId?: string) => {
    setSchema((prev) => [
      ...prev,
      {
        id: nanoid(),
        name: "",
        type: "string",
        parentId: parentId ?? null,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    const currentItem = schema.find((item) => item.id === id);

    if (!currentItem || !["object", "array"].includes(currentItem.type)) {
      setSchema((prev) => prev.filter((item) => item.id !== id));

      return;
    }

    // If object or array, delete all descendants as well
    const collectDescendants = (
      targetId: string,
      items: PJsonSchema,
      acc: Set<string>,
    ) => {
      acc.add(targetId);
      items.forEach((item) => {
        if (item.parentId === targetId) {
          collectDescendants(item.id, items, acc);
        }
      });
    };

    const idsToDelete = new Set<string>();
    collectDescendants(id, schema, idsToDelete);

    setSchema((prev) => prev.filter((item) => !idsToDelete.has(item.id)));
  };

  return (
    <div className="p-10 pt-0">
      <div className="flex flex-col gap-12 relative before:inside-border before:border-black-alpha-8 rounded-16 p-6">
        {tree.map((node) => (
          <SchemaBuilderRow
            key={node.id}
            node={node}
            onAddChild={handleAddChild}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}

        <SchemaBuilderAdd onClick={() => handleAddChild()} />
      </div>
    </div>
  );
}

export function buildRenderTree(
  flat: PJsonSchema,
  parentId: string | null = null,
  pathPrefix = "",
): PJsonSchemaRenderItem[] {
  const children = flat.filter((item) => item.parentId === parentId);

  return children.map((item, index) => {
    const basePath = pathPrefix ? `${pathPrefix}.items.${index}` : `${index}`;
    const path = basePath;

    let children: PJsonSchemaRenderItem[] = [];
    let items: PJsonSchemaRenderItem | undefined;

    if (item.type === "object") {
      children = buildRenderTree(flat, item.id, path);
    }

    if (item.type === "array") {
      children = buildRenderTree(flat, item.id, path);
    }

    return {
      ...item,
      path,
      children,
      items,
    };
  });
}
