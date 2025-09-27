import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  align?: 'left' | 'center' | 'right';
  wrap?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export default function BlogImage({
                                    src,
                                    alt,
                                    width = 800,
                                    height = 400,
                                    caption,
                                    size = 'medium',
                                    align = 'center',
                                    wrap = false,
                                    rounded = true,
                                    shadow = true
                                  }: BlogImageProps) {
  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'w-96',
    full: 'w-full'
  };

  // For non-wrapping (block) images - use span with block display
  if (!wrap) {
    const blockAlignClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto'
    };

    return (
      <span className={`block my-8 ${blockAlignClasses[align]}`}>
        <span className={`block ${sizeClasses[size]} ${blockAlignClasses[align]}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`
              w-full h-auto
              ${rounded ? 'rounded-lg' : ''}
              ${shadow ? 'shadow-lg hover:shadow-xl' : ''}
              transition-all duration-300 hover:scale-105
            `}
            priority={false}
          />
          {caption && (
            <span className="block text-sm text-muted-foreground text-center mt-2 italic">
              {caption}
            </span>
          )}
        </span>
      </span>
    );
  }

  // For wrapping (floating) images - use span with float
  const floatClasses = {
    left: 'float-left mr-4 mb-2',
    center: 'block mx-auto mb-4', // Center can't float
    right: 'float-right ml-4 mb-2'
  };

  return (
    <span className={`${sizeClasses[size]} ${floatClasses[align]}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          w-full h-auto
          ${rounded ? 'rounded-lg' : ''}
          ${shadow ? 'shadow-lg hover:shadow-xl' : ''}
          transition-all duration-300 hover:scale-105
        `}
        priority={false}
      />
      {caption && (
        <span className="block text-sm text-muted-foreground text-center mt-2 italic">
          {caption}
        </span>
      )}
    </span>
  );
}
