import { SpriteTypes } from "types";

interface IconProps {
  id: SpriteTypes | string;
  w: number;
  h: number;
  className?: string;
}

export default function Icon({ id, w, h, className }: IconProps) {
  return (
    <div className={className || ""}>
      <svg width={w} height={h}>
        <use href={`/sprite.svg#${id}`} />
      </svg>
    </div>
  );
}
