import { Card } from '@/components/ui/card'
import { toAbsoluteUrl } from '@/lib/helpers'
import { Users } from 'lucide-react'
import { FC } from 'react'

interface PageProps {
    trip: any
}
const TripGroupMember:FC<PageProps> = ({ trip }) => {
    return (
        <Card className="p-6 border rounded-2xl shadow-sm">
            <div className='flex justify-between items-center mb-4'>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users size={18} /> Group Members</h3>
                <span className="text-sm text-gray-500">{trip.participants.length} Members</span>
            </div>
            <div className="space-y-3">
                {trip.participants.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                        <img src={toAbsoluteUrl(p.avatarUrl)} alt={p.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TripGroupMember