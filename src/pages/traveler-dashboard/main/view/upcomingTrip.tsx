
import TripCard from '../tripCard';

const mockTrips = [
  {
    id: '1',
    name: 'Fishing Trip to Lake Tahoe',
    startDate: '2025-10-01',
    endDate: '2025-10-05',
    participants: ['Alice', 'Bob'],
    privacy: 'public' as const,
  },
  {
    id: '2',
    name: 'Family Vacation',
    startDate: '2025-11-12',
    endDate: '2025-11-20',
    participants: ['John', 'Mary', 'Sara'],
    privacy: 'private' as const,
  },
];

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-12 gap-4 border  md:p-4 p-1 ">
      {mockTrips.map((trip) => (
        <div className="md:col-span-4   col-xl-4" key={trip.id}>
          <TripCard {...trip} />
        </div>
      ))}
    </div>
  );
}
