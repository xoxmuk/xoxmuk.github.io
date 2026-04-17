import Image from 'next/image'
import type { AvatarSize } from '@/shared/types'

const sizeMap: Record<AvatarSize, number> = {
  sm:  32,
  md:  48,
  lg:  64,
  xl:  96,
  '2xl': 128,
}

const ringMap: Record<AvatarSize, string> = {
  sm:   'ring-1',
  md:   'ring-2',
  lg:   'ring-2',
  xl:   'ring-[3px]',
  '2xl':'ring-4',
}

interface AvatarProps {
  src: string
  alt: string
  /** Size variant (default: md) */
  size?: AvatarSize
  /** Show ring border (default: true) */
  ring?: boolean
  /** Extra Tailwind / CSS classes */
  className?: string
}

/**
 * Optimised avatar using next/image.
 * Place avatar images in /public/avatars/.
 */
export const Avatar = ({
  src,
  alt,
  size = 'md',
  ring = true,
  className = '',
}: AvatarProps) => {
  const px = sizeMap[size]

  return (
    <div
      className={`
        relative shrink-0 rounded-full overflow-hidden
        ${ring ? `${ringMap[size]} ring-white dark:ring-neutral-800 ring-offset-2` : ''}
        ${className}
      `}
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${px}px`}
        className="object-cover"
        priority
      />
    </div>
  )
}
