import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingProps {
  className?: string;
  rating: number;
  round?: number;
  [x: string]: any;
}

export function Rating({ className, rating, round, ...other }: RatingProps) {
  return (
    <div className={cn('flex gap-1', className)} {...other}>
      {[...Array(5)].map((_, index) => {
        const isFull = index < rating;
        const isHalf = index === rating && round && round >= 0.3; // treat 0.3–0.7 as half star

        return (
          <div key={index} className="relative w-5 h-5">
            {isFull ? (
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ) : isHalf ? (
              <div className="relative w-5 h-5">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute left-0 top-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                <Star className="w-5 h-5 text-gray-300 absolute left-0 top-0" />
              </div>
            ) : (
              <Star className="w-5 h-5 text-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}
