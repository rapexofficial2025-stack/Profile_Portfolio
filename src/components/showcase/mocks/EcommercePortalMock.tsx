import Image from "next/image";
import { asset } from "@/lib/asset";

export function EcommercePortalMock() {
  return (
    <div className="relative min-h-full bg-[#f7f8fc]">
      <div className="relative aspect-1456/1086 w-full min-w-180">
        <Image
          src={asset("/images/projects/full-stack-web-development/business-portal-commerce/web-portal.webp")}
          alt="Ecommerce merchant portal showing product management, order queue, inventory and promotions"
          fill
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-contain object-top"
          priority
        />
      </div>
    </div>
  );
}
