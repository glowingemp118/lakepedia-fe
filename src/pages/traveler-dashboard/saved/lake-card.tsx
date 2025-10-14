import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { toAbsoluteUrl } from "@/lib/helpers";

interface LakeCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  country: string;
  area: string;
  year: string;
  onFavorite?: () => void;
}

export function LakeCard({
  image,
  title,
  description,
  location,
  country,
  area,
  year,
  onFavorite,
}: LakeCardProps) {
  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={toAbsoluteUrl(image)}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-3 right-3 bg-white/70 hover:bg-white p-2 rounded-full shadow-sm transition"
        >
          <Heart size={18} className="text-red-500" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          <Badge variant="secondary">{year}</Badge>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>Area:</strong> {area}
          </p>
        </div>
      </div>
    </Card>
  );
}
