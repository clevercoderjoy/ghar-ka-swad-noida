import React, { useCallback, useRef, useEffect, useState, memo } from "react";
import { ExternalLink, Loader2, AlertCircle } from "lucide-react";
import {
  downloadPDFWithOptimization,
  downloadPDFSimple,
  getPDFSupport,
} from "@/lib/pdf-optimization";

/**
 * Download progress indicator component
 */
const DownloadProgress = memo(
  ({
    isDownloading,
    progress,
    error,
  }) => {
    if (!isDownloading && !error) return null;

    return (
      <div className="absolute top-full right-0 mt-2 z-50 w-48">
        {error ? (
          <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg backdrop-blur-md shadow-xl">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 bg-black/60 border border-white/20 px-4 py-3 rounded-lg backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs font-medium text-white">
                Downloading PDF...
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-white/70 text-right">{progress}%</span>
          </div>
        )}
      </div>
    );
  }
);

DownloadProgress.displayName = "DownloadProgress";

/**
 * Broucher - A11y, animated, supports PDF optimization with progress tracking
 */
export const Broucher = ({
  href,
  label = "Download Broucher",
  className = "",
  download = false,
  downloadName = "download",
  variant = "default",
  onMouseEnter,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadError, setDownloadError] = useState(null);
  const downloadRef = useRef(null);

  // Check PDF support on mount
  useEffect(() => {
    const support = getPDFSupport();
    if (!support.supportsBlob) {
      console.warn("PDF optimization not fully supported in this browser");
    }
  }, []);

  /**
   * Handle optimized PDF download
   */
  const handleDownload = useCallback(
    async (e) => {
      e.preventDefault();
      setIsDownloading(true);
      setDownloadProgress(0);
      setDownloadError(null);
      downloadRef.current = new AbortController();

      try {
        const pdfSupport = getPDFSupport();

        if (pdfSupport.supportsStreaming && pdfSupport.supportsProgressEvents) {
          // Use optimized streaming download with progress tracking
          await downloadPDFWithOptimization(
            href,
            downloadName,
            (progress) => {
              setDownloadProgress(progress);
            },
            (error) => {
              setDownloadError(error.message);
              setIsDownloading(false);
            }
          );
        } else {
          // Fallback to simple download
          downloadPDFSimple(href, downloadName);
        }

        // Success - reset after short delay
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
        }, 500);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Download failed";
        setDownloadError(errorMessage);
        setIsDownloading(false);
      }
    },
    [href, downloadName]
  );

  // If download mode, render button with progress tracking
  if (download) {
    return (
      <div className="relative" onMouseEnter={onMouseEnter}>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={
            variant === "nav"
              ? `relative z-20 flex items-center w-auto h-10 justify-between rounded-full px-3 py-2 text-sm font-medium text-white focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`
              : `group relative flex items-center w-auto h-10 justify-between rounded-full border border-primary/25 bg-primary/8 backdrop-blur-xl px-3 py-2 text-sm font-medium text-white focus:ring-0 focus:outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(252,128,25,0.08),inset_0_1px_1px_rgba(252,128,25,0.12)] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${className}`
          }
          aria-label={label}
          aria-busy={isDownloading}
          type="button"
        >
          {/* hover bubble */}
          {variant !== "nav" && (
            <div className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {downloadProgress}%
              </>
            ) : (
              <>
                {label}
                <ExternalLink
                  className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </>
            )}
          </span>
        </button>
        <DownloadProgress
          isDownloading={isDownloading}
          progress={downloadProgress}
          error={downloadError}
        />
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      className={`flex items-center w-auto h-10 justify-between rounded-full border border-[#FC8019]/60 bg-white/10 backdrop-blur-md px-3 py-2 text-sm font-medium text-white hover:bg-white/20 focus:ring-0 focus:outline-none transition-all duration-300 shadow-2xl group ${className}`}
      aria-label={label}
      tabIndex={0}
    >
      <span className="flex items-center gap-2">
        {label}
        <ExternalLink
          className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
};

export default Broucher;
