import { Card } from "@/components/ui/card";
import { Heart, Trash } from "lucide-react";
import { toAbsoluteUrl } from "@/lib/helpers";
import { useBoolean } from "@/hooks/use-boolean";
import ConfirmDialog from "@/components/comfirm-dialog/confirm-dialog";

interface BusinessCardProps {
  id: string
  image: string;
  name: string;
  businessType: string;
  servicesOffered: string;
  description: string;
  onFavorite?: () => void;
  handleDelete: (id: string) => void;
}

export function BusinessCard({
  id,
  handleDelete,
  image,
  name,
  businessType,
  servicesOffered,
  description,
  onFavorite,
}: BusinessCardProps) {

  const confirm = useBoolean();

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={toAbsoluteUrl(image)}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
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

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500">
          <strong>Type:</strong> {businessType}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">
          <strong>Services:</strong> {servicesOffered}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <ConfirmDialog
        open={confirm.value}
        title="Delete Business"
        content="Are you sure you want to delete this business from your saved list?"
        onClose={confirm.onFalse}
        onConfirm={() => handleDelete(id)}
      />
    </Card>
  );
}
