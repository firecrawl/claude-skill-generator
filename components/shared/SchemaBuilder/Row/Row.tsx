import React from "react";

import { cn } from "@/lib/utils";

import Drag from "./_svg/Drag";
import Trash from "./_svg/Trash";
import Button from "../../button/Button";
import Combobox from "../../combobox/combobox";
import SchemaBuilderAdd from "../Add/Add";
import Input from "@/components/ui/shadcn/input";
import Tooltip from "@/components/ui/shadcn/tooltip";
import { PJsonSchemaRenderItem } from "../types";
import { AsteriskIcon } from "lucide-react";

interface RenderNodeProps {
  node: PJsonSchemaRenderItem;
  onUpdate: (id: string, updates: Partial<PJsonSchemaRenderItem>) => void;
  onAddChild?: (parentId: string) => void;
  onDelete?: (id: string) => void;
}

const OPTIONS = [
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
  { label: "Object", value: "object" },
  { label: "Array", value: "array" },
];

export const SchemaBuilderRow: React.FC<RenderNodeProps> = ({
  node,
  onUpdate,
  onAddChild,
  onDelete,
}) => {
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(node.id, { name: e.target.value });
  };

  return (
    <div className="flex flex-col gap-12 relative before:inside-border before:border-black-alpha-8 rounded-10 p-6">
      {!node.isTypePicker ? (
        <div className="flex gap-8 justify-between items-center p-6">
          <div className="flex gap-8 items-center flex-1">
            <Button variant="tertiary">
              <Drag />
            </Button>

            <Input
              className="flex-1 max-w-180 !py-6 !px-10"
              placeholder="Field name"
              value={node.name}
              onChange={handleChangeName}
            />

            <Combobox
              className="!w-120"
              options={OPTIONS}
              value={node.type}
              onChange={(value) => onUpdate(node.id, { type: value as any })}
            />
          </div>
          <div className="flex gap-8">
            <Button
              variant="tertiary"
              onClick={() => onUpdate(node.id, { required: !node.required })}
            >
              <div
                className={cn(
                  "transition-all",
                  node.required ? "text-heat-100" : "text-black-alpha-48",
                )}
              >
                <AsteriskIcon />
              </div>
              <Tooltip
                description={
                  node.required ? "Mark as optional" : "Mark as required"
                }
              />
            </Button>

            <Button variant="tertiary" onClick={() => onDelete?.(node.id)}>
              <Trash />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-8 items-center flex-1 pl-8">
            <span className="text-body-small text-black-alpha-64">
              Array of
            </span>

            <Combobox
              className="!w-120"
              options={OPTIONS}
              value={node.type}
              onChange={(value) => onUpdate(node.id, { type: value as any })}
            />
          </div>

          {node.items && (
            <SchemaBuilderRow
              node={node.items}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )}
        </>
      )}

      {node.type === "object" && (
        <div
          className={cn(
            "flex flex-col gap-[inherit] pl-46",
            node.isTypePicker && "contents",
          )}
        >
          {node.children.map((child) => (
            <SchemaBuilderRow
              key={child.id}
              node={child}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}

          <SchemaBuilderAdd onClick={() => onAddChild?.(node.id)} />
        </div>
      )}

      {node.type === "array" && (
        <div className="flex flex-col gap-[inherit] pl-46">
          {node.children.map((child) => (
            <SchemaBuilderRow
              key={child.id}
              node={child}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
