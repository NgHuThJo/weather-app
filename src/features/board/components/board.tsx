import { bg_today_large, bg_today_small } from "#frontend/assets/images";
import { Image } from "#frontend/components/primitives/image";

export function Board() {
  return (
    <div>
      <Image
        src={bg_today_small}
        srcSet={`${bg_today_small} 343w, ${bg_today_large} 800w`}
        sizes="(width < 768px) 343px, 800px"
      />
    </div>
  );
}
