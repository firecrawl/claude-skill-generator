"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "motion/react";

import Globe from "../hero-input/_svg/Globe";
import Button from "@/components/shared/button/Button";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { SkillGenerationResponse, SkillGenerationResult } from "@/types/skills";

import DownloadIcon from "./_svg/DownloadIcon";
import SparkleIcon from "./_svg/SparkleIcon";
import ChevronIcon from "./_svg/ChevronIcon";
import EndpointIcon from "./_svg/EndpointIcon";

export default function SkillGenerator() {
  const [url, setUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkillGenerationResult | null>(null);
  const [showEndpoints, setShowEndpoints] = useState(false);
  const [showFiles, setShowFiles] = useState(false);

  // Generate skill from documentation URL
  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: SkillGenerationResponse = await response.json();

      if (!data.success || !data.data) {
        setError(data.error || "Failed to generate skill");
        return;
      }

      if (!data.data.hasDocumentation) {
        setError(data.data.message || "No API documentation found");
        return;
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.files || !result.skillFolderName) return;

    const zip = new JSZip();
    const folderName = result.skillFolderName;

    zip.file(`${folderName}/SKILL.md`, result.files.skillMd);
    result.files.references.forEach((ref) => {
      zip.file(`${folderName}/references/${ref.name}`, ref.content);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${folderName}.zip`);
  };

  return (
    <div className="w-full">
      {/* Input Section */}
      <div className="max-w-552 mx-auto w-full relative z-[11] lg:z-[2] rounded-20 lg:-mt-76">
        <div
          className="overlay bg-accent-white"
          style={{
            boxShadow:
              "0px 0px 44px 0px rgba(0, 0, 0, 0.02), 0px 88px 56px -20px rgba(0, 0, 0, 0.03), 0px 56px 56px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 0px 0px 10px #F9F9F9",
          }}
        />

        <label className="p-16 flex gap-8 items-center w-full relative border-b border-black-alpha-5">
          <Globe />
          <input
            className="w-full bg-transparent text-body-input text-accent-black placeholder:text-black-alpha-48"
            placeholder="https://docs.example.com/api"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isGenerating) {
                void handleGenerate();
              }
            }}
            disabled={isGenerating}
          />
        </label>

        <div className="p-10 flex justify-between items-center relative">
          <div className="flex items-center gap-8">
            <SparkleIcon />
            <span className="text-label-medium text-black-alpha-56">
              Generate Claude Code skill from API docs
            </span>
          </div>

          <Button
            className="!p-0"
            size="large"
            variant="primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <div className="py-8 px-16 flex items-center gap-8">
              {isGenerating ? (
                <>
                  <Spinner />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Skill</span>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-552 mx-auto mt-16 p-12 bg-red-50 border border-red-200 rounded-12 text-red-700 text-body-small"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-700 mx-auto mt-32"
          >
            {!result.hasDocumentation ? (
              <div className="text-center p-24 bg-black-alpha-4 rounded-16">
                <p className="text-body-large text-black-alpha-56">
                  {result.message || "No documentation found at this URL."}
                </p>
              </div>
            ) : (
              <div
                className="bg-accent-white rounded-16 overflow-hidden"
                style={{
                  boxShadow:
                    "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 4px 12px -4px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Header */}
                <div className="p-20 border-b border-black-alpha-5">
                  <div className="flex items-start justify-between gap-16">
                    <div className="flex-1">
                      <div className="flex items-center gap-8 mb-8">
                        <span className="px-8 py-2 bg-green-100 text-green-700 text-[11px] font-medium rounded-4">
                          Generated Skill
                        </span>
                      </div>
                      <h2 className="text-heading-small text-accent-black">
                        {result.serviceName} Skill
                      </h2>
                      <p className="text-body-small text-black-alpha-56 mt-6 line-clamp-2">
                        {result.serviceDescription}
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      onClick={handleDownload}
                      className="flex items-center gap-8 shrink-0"
                    >
                      <DownloadIcon />
                      <span>Download Skill</span>
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-12 mt-16">
                    <span className="px-10 py-4 bg-heat-12 text-heat-100 text-[12px]/[16px] font-medium rounded-6">
                      {result.endpoints?.length || 0} endpoint
                      {(result.endpoints?.length || 0) !== 1 ? "s" : ""}
                    </span>
                    <span className="px-10 py-4 bg-black-alpha-4 text-black-alpha-56 text-[12px]/[16px] font-medium rounded-6">
                      {result.files?.references.length || 0} reference file
                      {(result.files?.references.length || 0) !== 1 ? "s" : ""}
                    </span>
                    {result.creditsUsed && (
                      <span className="px-10 py-4 bg-black-alpha-4 text-black-alpha-40 text-[12px]/[16px] rounded-6">
                        {result.creditsUsed} credits used
                      </span>
                    )}
                  </div>
                </div>

                {/* Skill Structure Preview */}
                <div className="p-20 border-b border-black-alpha-5 bg-black-alpha-2">
                  <p className="text-label-small text-black-alpha-40 uppercase tracking-wider mb-12">
                    Skill Structure
                  </p>
                  <pre className="text-[12px]/[20px] font-mono text-black-alpha-72">
                    {`${result.skillFolderName}/
├── SKILL.md           # Instructions on when/how to use
└── references/
${result.files?.references
  .map(
    (r, i) =>
      `    ${i === (result.files?.references.length || 0) - 1 ? "└──" : "├──"} ${r.name}`,
  )
  .join("\n")}`}
                  </pre>
                </div>

                {/* Endpoints Preview */}
                <button
                  onClick={() => setShowEndpoints(!showEndpoints)}
                  className="w-full px-20 py-14 flex items-center justify-between hover:bg-black-alpha-2 transition-colors border-b border-black-alpha-5"
                >
                  <span className="text-label-medium text-black-alpha-72">
                    View Endpoints
                  </span>
                  <ChevronIcon
                    className={cn(
                      "transition-transform duration-200",
                      showEndpoints && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showEndpoints && result.endpoints && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-b border-black-alpha-5"
                    >
                      <div className="divide-y divide-black-alpha-5">
                        {result.endpoints.map((endpoint, index) => (
                          <div
                            key={index}
                            className="px-20 py-14 flex items-start gap-12"
                          >
                            <EndpointIcon />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-8 flex-wrap">
                                <span className="text-label-medium text-accent-black">
                                  {endpoint.name}
                                </span>
                                <span
                                  className={cn(
                                    "px-6 py-1 text-[10px]/[14px] font-medium rounded-4",
                                    endpoint.method === "GET" &&
                                      "bg-green-100 text-green-700",
                                    endpoint.method === "POST" &&
                                      "bg-blue-100 text-blue-700",
                                    endpoint.method === "PUT" &&
                                      "bg-yellow-100 text-yellow-700",
                                    endpoint.method === "DELETE" &&
                                      "bg-red-100 text-red-700",
                                    !["GET", "POST", "PUT", "DELETE"].includes(
                                      endpoint.method,
                                    ) && "bg-gray-100 text-gray-700",
                                  )}
                                >
                                  {endpoint.method}
                                </span>
                                <code className="text-[11px]/[14px] text-black-alpha-48 bg-black-alpha-4 px-6 py-1 rounded-4 font-mono">
                                  {endpoint.path}
                                </code>
                              </div>
                              <p className="text-body-small text-black-alpha-56 mt-4 line-clamp-2">
                                {endpoint.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Preview Files */}
                <button
                  onClick={() => setShowFiles(!showFiles)}
                  className="w-full px-20 py-14 flex items-center justify-between hover:bg-black-alpha-2 transition-colors"
                >
                  <span className="text-label-medium text-black-alpha-72">
                    Preview Generated Files
                  </span>
                  <ChevronIcon
                    className={cn(
                      "transition-transform duration-200",
                      showFiles && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showFiles && result.files && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-20 pt-0 space-y-16">
                        <div>
                          <p className="text-label-small text-black-alpha-40 mb-8">
                            SKILL.md
                          </p>
                          <pre className="p-12 bg-black-alpha-4 rounded-8 overflow-x-auto max-h-200 overflow-y-auto">
                            <code className="text-[11px]/[16px] text-black-alpha-72 font-mono whitespace-pre-wrap">
                              {result.files.skillMd.slice(0, 800)}
                              {result.files.skillMd.length > 800 && "..."}
                            </code>
                          </pre>
                        </div>

                        {result.files.references[0] && (
                          <div>
                            <p className="text-label-small text-black-alpha-40 mb-8">
                              references/{result.files.references[0].name}
                            </p>
                            <pre className="p-12 bg-black-alpha-4 rounded-8 overflow-x-auto max-h-200 overflow-y-auto">
                              <code className="text-[11px]/[16px] text-black-alpha-72 font-mono whitespace-pre-wrap">
                                {result.files.references[0].content.slice(
                                  0,
                                  800,
                                )}
                                {result.files.references[0].content.length >
                                  800 && "..."}
                              </code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
