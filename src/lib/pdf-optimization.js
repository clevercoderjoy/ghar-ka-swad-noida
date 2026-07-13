export const getPDFSupport = () => {
  if (typeof window === "undefined") {
    return {
      supportsBlob: false,
      supportsStreaming: false,
      supportsProgressEvents: false,
    };
  }

  return {
    supportsBlob: typeof Blob !== "undefined",
    supportsStreaming: typeof ReadableStream !== "undefined",
    supportsProgressEvents: "onprogress" in XMLHttpRequest.prototype,
  };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const calculateDownloadTime = (fileSize, connectionSpeed = 5) => {
  const bytes = fileSize;
  const megabytes = bytes / (1024 * 1024);
  const megabits = megabytes * 8;
  const seconds = megabits / connectionSpeed;

  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.round(seconds / 60);
  return `${minutes}m`;
};

export const downloadPDFWithOptimization = async (
  url,
  filename,
  onProgress,
  onError
) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Unable to read response body");
    }

    const chunks = [];
    let loaded = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      loaded += value.length;

      if (onProgress && total > 0) {
        const progress = Math.round((loaded / total) * 100);
        onProgress(progress, loaded, total);
      }
    }

    const blob = new Blob(chunks, { type: "application/pdf" });

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    if (onError) {
      onError(err);
    } else {
      throw err;
    }
  }
};

export const downloadPDFSimple = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener noreferrer";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
};

export const prefetchPDFMetadata = async (url) => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    if (!response.ok) {
      return null;
    }

    const size = response.headers.get("content-length");
    const type = response.headers.get("content-type") || "application/pdf";
    const fileSizeBytes = size ? parseInt(size, 10) : 0;

    return {
      size: fileSizeBytes,
      type,
      available: true,
      estimatedTime: calculateDownloadTime(fileSizeBytes),
    };
  } catch {
    return null;
  }
};

export const setCachePDFOptimization = () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(() => {
      console.log("Service Worker ready for PDF caching");
    });
  }
};
