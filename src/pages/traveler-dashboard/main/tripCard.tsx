import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Pencil, Share2, Users, CalendarDays } from "lucide-react"
import React from "react"

interface TripCardProps {
  id: string
  name: string
  startDate: string
  endDate: string
  participants: string[]
  privacy: "public" | "private" | "team"
}

const privacyMap = {
  public: { color: "bg-green-100 text-green-700", label: "Public" },
  private: { color: "bg-red-100 text-red-700", label: "Private" },
  team: { color: "bg-blue-100 text-blue-700", label: "Team" },
}

const TripCard: React.FC<TripCardProps> = ({
  name,
  startDate,
  endDate,
  participants,
  privacy,
}) => {
  const { color, label } = privacyMap[privacy]

  return (
    <Card className="bg-white rounded-xl border border-gray-200">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          <Badge className={`${color} px-2 py-0.5 rounded text-xs font-normal`}>
            {label}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <CalendarDays className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {startDate} &mdash; {endDate}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex items-center gap-1 mb-2">
          <Users className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-700">{participants.length} participants</span>
        </div>
        <div className="flex gap-1 justify-end">
          <Button size="sm" variant="ghost" className="px-2 py-1">
            <Eye className="w-3 h-3 mr-1" />
            <span className="text-xs">View</span>
          </Button>
          <Button size="sm" variant="ghost" className="px-2 py-1">
            <Pencil className="w-3 h-3 mr-1" />
            <span className="text-xs">Edit</span>
          </Button>
          <Button size="sm" variant="ghost" className="px-2 py-1">
            <Share2 className="w-3 h-3 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>

  )
}

export default TripCard
