import { motion } from 'framer-motion'
import { Map, MapPin } from 'lucide-react'
import TripLakes from './trip-lakes'
import { FC } from 'react'

interface PageProps {
    trip: any
}
const TripOverView: FC<PageProps> = ({ trip }) => {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-1"><Map size={16} /> Destinations</h3>
                <p className="text-gray-700">{trip.destinations.join(', ')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-1"><MapPin size={16} /> Notable Lakes</h3>
                <TripLakes lakes={lakes} />
            </motion.div>
        </>
    )
}

export default TripOverView


const lakes = [
    {
        id: 'L001',
        name: 'Attabad Lake',
        location: 'Hunza Valley, Gilgit-Baltistan',
        imageUrl: 'lake1.jpg',
        description: 'A stunning turquoise lake formed after a landslide in 2010, known for boating and scenic beauty.'
    },
    {
        id: 'L002',
        name: 'Satpara Lake',
        location: 'Skardu, Gilgit-Baltistan',
        imageUrl: 'lake2.jpg',
        description: 'A natural lake providing water to Skardu city, surrounded by mountains and ideal for fishing.'
    },
    {
        id: 'L003',
        name: 'Sheosar Lake',
        location: 'Deosai National Park',
        imageUrl: 'lake3.jpeg',
        description: 'Located in the Deosai Plains, one of the world’s highest lakes offering breathtaking views.'
    }, {
        id: 'L004',
        name: 'Kachura Lakes',
        location: 'Skardu, Gilgit-Baltistan',
        imageUrl: 'lake1.jpg',
        description: 'Comprising Upper and Lower Kachura Lakes, known for their clear waters and surrounding greenery.'
    }
]
