import type { FC, SVGProps } from "react";

import BedIcon from "@/public/svgs/listings/furnitures/bed-icon.svg";
import BeddingIcon from "@/public/svgs/listings/furnitures/bedding-icon.svg";
import ClosetIcon from "@/public/svgs/listings/furnitures/closet-icon.svg";
import CoffeeIcon from "@/public/svgs/listings/furnitures/coffee-icon.svg";
import CookIcon from "@/public/svgs/listings/furnitures/cook-icon.svg";
import DeskIcon from "@/public/svgs/listings/furnitures/desk-icon.svg";
import DishIcon from "@/public/svgs/listings/furnitures/dish-icon.svg";
import MicrowaveIcon from "@/public/svgs/listings/furnitures/microwave-icon.svg";
import RefrigeratorIcon from "@/public/svgs/listings/furnitures/refrigerator-icon.svg";
import SofaIcon from "@/public/svgs/listings/furnitures/sofa-icon.svg";
import GasStoveIcon from "@/public/svgs/listings/furnitures/stove-icon.svg";
import TvIcon from "@/public/svgs/listings/furnitures/tv-icon.svg";
import VacuumIcon from "@/public/svgs/listings/furnitures/vacuum-icon.svg";
import WifiIcon from "@/public/svgs/listings/furnitures/wifi-icon.svg";

export const furnitureIconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  "침대 프레임": BedIcon,
  침구류: BeddingIcon,
  옷장: ClosetIcon,
  커피테이블: CoffeeIcon,
  조리도구: CookIcon,
  책상: DeskIcon,
  식기류: DishIcon,
  전자렌지: MicrowaveIcon,
  냉장고: RefrigeratorIcon,
  소파: SofaIcon,
  가스렌지: GasStoveIcon,
  TV: TvIcon,
  청소기: VacuumIcon,
  Wifi: WifiIcon,
};
