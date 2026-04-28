import { useState } from "react";
import { ImageIcon } from "lucide-react";

export function ImageAsset({
  src,
  alt,
  label,
  className = "",
  overlay = false
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`image-fallback ${overlay ? "image-fallback--overlay" : ""} ${className}`}>
        <ImageIcon size={26} />
        <span>{label || "Add image here"}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}

