import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { toAbsoluteUrl } from "@/lib/helpers";

interface BusinessCardProps {
    image: string;
    title: string;
    description: string;
    onFavorite?: () => void;
}

export function ActivityCard({
    image,
    title,
    description,
    onFavorite,
}: BusinessCardProps) {
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
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>
        </Card>
    );
}
