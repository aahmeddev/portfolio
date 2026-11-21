import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  size?: "small" | "medium" | "large" | "full";
  align?: "left" | "center" | "right";
  wrap?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export default function BlogImage({
  src,
  alt,
  width = 1000,
  height = 560,
  caption,
  size = "large",
  align = "center",
  wrap = false,
  rounded = true,
  shadow = true,
}: BlogImageProps) {
  const sizeClasses = {
    small: "max-w-sm w-full",
    medium: "max-w-xl w-full",
    large: "max-w-3xl w-full",
    full: "w-full",
  };

  if (!wrap) {
    const blockAlignClasses = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
    };

    return (
      <span className={`block my-7 ${blockAlignClasses[align]}`}>
        <span
          className={`block ${sizeClasses[size]} ${blockAlignClasses[align]} rounded-xl border border-border bg-white dark:bg-slate-950/85 p-2.5 ${
            shadow ? "shadow-sm" : ""
          }`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto object-contain ${rounded ? "rounded-lg" : ""}`}
            priority={false}
          />
          {caption && (
            <span className="block text-xs sm:text-sm text-muted-foreground text-center mt-2.5">
              {caption}
            </span>
          )}
        </span>
      </span>
    );
  }

  const floatClasses = {
    left: "float-left mr-4 mb-2",
    center: "block mx-auto mb-4",
    right: "float-right ml-4 mb-2",
  };

  return (
    <span className={`${sizeClasses[size]} ${floatClasses[align]}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto object-contain ${rounded ? "rounded-lg" : ""}`}
        priority={false}
      />
      {caption && (
        <span className="block text-xs sm:text-sm text-muted-foreground text-center mt-2">
          {caption}
        </span>
      )}
    </span>
  );
}
