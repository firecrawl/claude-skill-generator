"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Button from "@/components/ui/shadcn/button";
import SchemaIcon from "./_svg/SchemaIcon";
import Modal from "../Modal";
import ModalTitle from "../Title/Title";
import Segments from "@/components/app/(home)/sections/segments/Segments";
import SchemaBuilder from "@/components/shared/SchemaBuilder/SchemaBuilder";
import { ModalClose } from "../ModalProvider/ModalProvider";
import { Playground } from "@/components/shared/Playground/Context/Context";
import { FormatType } from "@/components/shared/Playground/Context/types";
import Textarea from "@/components/ui/shadcn/textarea";
import { TbPrompt } from "react-icons/tb";

export default function ModalJsonSchema(props) {
  const [schema, setSchema] = useState("schema");
  const form = Playground.useForm();
  const jsonPrompt =
    (Playground.useWatch({ name: "jsonPrompt" }) as string) ?? "";

  // Ensure JSON output is enabled whenever the schema modal opens
  useEffect(() => {
    const currentFormats = form.getValues("formats") || [];
    if (!currentFormats.includes(FormatType.Json)) {
      const updatedFormats = [...currentFormats, FormatType.Json];
      form.setValue("formats", updatedFormats);
    }
  }, []);

  return (
    <Modal {...props}>
      <ModalTitle title="JSON" />

      <div className="p-4 pt-0">
        <div className="px-10">
          <div className="flex items-center gap-12 py-16 px-10">
            <TbPrompt />
            <div className="text-label-medium text-black-alpha-72 flex-1">
              Prompt
            </div>
          </div>
          <Textarea
            maxLength={500}
            placeholder="Extract the company mission from the page."
            rows={3}
            value={jsonPrompt}
            onChange={(e) => form.setValue("jsonPrompt", e.target.value)}
          />
          <div className="text-label-x-small text-black-alpha-40 mt-4">
            This guides the JSON extraction alongside the schema.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-12 py-16 px-10">
          <SchemaIcon />
          <div className="text-label-medium text-black-alpha-72 flex-1">
            Schema
          </div>
          <Segments
            activeItem={schema}
            className="w-284"
            items={[
              { label: "Schema", value: "schema" },
              { label: "JSON", value: "json" },
            ]}
            setActiveItem={(item) =>
              setSchema(item === "json" ? "json" : "schema")
            }
          />
        </div>
      </div>

      {schema === "json" ? (
        <div className="p-10 pt-0">
          <div className="relative schema-editor h-400">
            <SchemaEditorDynamic />
          </div>
        </div>
      ) : (
        <SchemaBuilder />
      )}

      <div className="p-14 border-t border-border-faint flex justify-end">
        <ModalClose>
          <Button
            variant="secondary"
            onClick={() => {
              const currentFormats = form.getValues("formats") || [];
              if (!currentFormats.includes(FormatType.Json)) {
                const updatedFormats = [...currentFormats, FormatType.Json];
                form.setValue("formats", updatedFormats);
              }
            }}
          >
            Save options
          </Button>
        </ModalClose>
      </div>
    </Modal>
  );
}

const SchemaEditorDynamic = dynamic(
  () => import("@/components/shared/SchemaEditor/SchemaEditor"),
  {
    ssr: false,
  },
);
