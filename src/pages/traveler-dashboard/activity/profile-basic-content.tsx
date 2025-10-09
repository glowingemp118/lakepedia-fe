

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Star, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "@/partials/common/rating";
import { RiStarFill } from "@remixicon/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function ProfileActivityContent() {


  const [editingReview, setEditingReview] = useState<number | null>(null);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Awais Malik",
      title: "Beautiful Lake View",
      content: "I had a wonderful experience visiting this lake. Perfect spot for fishing and boating!",
      rating: 5,
      date: "2025-03-25",
    },
    {
      id: 2,
      author: "Awais Malik",
      title: "Good but crowded",
      content: "The view was amazing, but it was a bit too crowded during weekends.",
      rating: 4,
      date: "2025-02-10",
    },
  ]);

  // Handle edit
  const handleEdit = (id: number, newContent: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, content: newContent } : r))
    );
    setEditingReview(null);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };
  const handleShareReview = () => {
    // Implement share functionality here
    alert("Share functionality is not implemented yet.");
  }

  return (
    <div className="space-y-6">

      <AnimatePresence>

        {reviews.map((review) => (

          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-base">{review.title}</h3>

                  <p className="text-xs text-muted-foreground">{review.date}</p>

                </div>

                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setEditingReview(review.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>   Edit Review </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent> Delete Review </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>

              <CardContent>

                {editingReview !== review.id && <Rating rating={review.rating} />}

                {editingReview === review.id ? (

                  <div className="mt-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>

                            <button
                              key={num}
                              type="button"
                              className={`text-xl cursor-pointer ${num <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              onClick={() => {
                                setReviews((prev) =>
                                  prev.map((r) =>
                                    r.id === review.id ? { ...r, rating: num } : r
                                  )
                                );
                              }}
                            >
                              <Star className={`w-5 h-5 ${num <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `} />

                            </button>
                          </TooltipTrigger>
                          <TooltipContent> {num} Star{num > 1 ? 's' : ''} </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                        <Textarea
                          defaultValue={review.content}
                          className="w-full"
                          rows={3}
                          autoFocus
                        />
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            onClick={(e) =>
                              handleEdit(
                                review.id,
                                e.target?.parentElement.previousSibling.value
                              )
                            }
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingReview(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      {review.content}
                    </p>
                )}
                  </CardContent>

            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {
        reviews.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">No reviews yet.</p>
        )
      }
    </div >
  );
}
export { ProfileActivityContent };