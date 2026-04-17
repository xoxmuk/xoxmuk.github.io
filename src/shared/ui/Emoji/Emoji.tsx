import Image from 'next/image'
import type { EmojiName } from '@/shared/types'
import { EMOJI_SIZE } from '@/shared/constants'

interface EmojiProps {
  /** Name of the emoji — must match a file in /public/emojis/{name}.png */
  name: EmojiName
  /** Display size in px (default: 24) */
  size?: number
  /** Alt text for accessibility */
  alt?: string
  /** Extra Tailwind / CSS classes */
  className?: string
}

/**
 * Custom emoji using next/image for optimised delivery.
 * Add new emoji by dropping a PNG into /public/emojis/ and extending EmojiName.
 */
export const Emoji = ({
  name,
  size = EMOJI_SIZE,
  alt = name,
  className = '',
}: EmojiProps) => (
  <Image
    src={`/emojis/${name}.png`}
    alt={alt}
    width={size}
    height={size}
    className={`inline-block select-none ${className}`}
    draggable={false}
  />
)
