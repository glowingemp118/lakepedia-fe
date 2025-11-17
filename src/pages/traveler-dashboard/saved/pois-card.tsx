import { Card } from "@/components/ui/card";
import { Heart, Trash } from "lucide-react";
import { toAbsoluteUrl } from "@/lib/helpers";
import { useBoolean } from "@/hooks/use-boolean";
import ConfirmDialog from "@/components/comfirm-dialog/confirm-dialog";

interface PoiCardProps {
  id:string
  image: string;
  title: string;
  description: string;
  onFavorite?: () => void;
  handleDelete: (id: string) => void;
}

export function PoiCard({
  id,
  image,
  title,
  description,
  onFavorite,
  handleDelete
}: PoiCardProps) {

  const confirm = useBoolean();

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="relative">
        <img
          src={toAbsoluteUrl(image)}
          alt={title}
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-105"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-3 right-3 bg-white/70 hover:bg-white p-2 rounded-full shadow-sm transition"
        >
          <Trash size={18} className="text-red-500" onClick={confirm.onTrue} />
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <ConfirmDialog
        open={confirm.value}
        title="Delete POI"
        content="Are you sure you want to delete this pois from your saved list?"
        onClose={confirm.onFalse}
        onConfirm={()=>handleDelete(id)}
      />
    </Card>
  );
}
