"use client";

import { useState } from "react";
import { Star, ThumbsUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProjectRating {
  average: number;
  total: number;
  distribution: { stars: number; count: number }[];
}

interface Props {
  projectSlug: string;
  initialRating?: ProjectRating;
}

const DEFAULT_RATING: ProjectRating = {
  average: 4.8,
  total: 12,
  distribution: [
    { stars: 5, count: 9 },
    { stars: 4, count: 2 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};

export function ProjectRatingWidget({ projectSlug, initialRating }: Props) {
  const [rating, setRating] = useState(initialRating || DEFAULT_RATING);
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const submitRating = async () => {
    if (userRating === 0) {
      toast.error("اختر عدد النجوم أولاً");
      return;
    }
    setBusy(true);
    // Simulate API call (in production, save to DB)
    await new Promise((r) => setTimeout(r, 600));

    // Update rating locally
    const newTotal = rating.total + 1;
    const newSum = rating.average * rating.total + userRating;
    const newAverage = newSum / newTotal;
    const newDist = [...rating.distribution];
    const idx = newDist.findIndex((d) => d.stars === userRating);
    if (idx >= 0) newDist[idx].count += 1;

    setRating({
      average: Math.round(newAverage * 10) / 10,
      total: newTotal,
      distribution: newDist,
    });
    setSubmitted(true);
    setBusy(false);
    toast.success("شكراً لتقييمك! ⭐");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-accent fill-accent" />
        تقييم المشروع
      </h3>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Average score */}
        <div className="text-center sm:border-l sm:pl-6">
          <p className="font-display text-5xl font-extrabold text-primary">
            {rating.average.toFixed(1)}
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`h-5 w-5 ${
                  n <= Math.round(rating.average)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            بناءً على {rating.total} تقييم
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-1.5">
          {rating.distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-muted-foreground">{d.stars}</span>
              <Star className="h-3 w-3 text-accent fill-accent" />
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${rating.total > 0 ? (d.count / rating.total) * 100 : 0}%` }}
                />
              </div>
              <span className="w-6 text-left text-muted-foreground">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User rating input */}
      {!submitted ? (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm font-bold mb-2">قيّم هذا المشروع:</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setUserRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1 transition-transform hover:scale-110"
                  aria-label={`${n} نجوم`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      n <= (hover || userRating)
                        ? "text-accent fill-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={submitRating}
              disabled={busy || userRating === 0}
              className="mr-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ThumbsUp className="h-3.5 w-3.5" />}
              إرسال
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/20 p-3">
            <Star className="h-5 w-5 text-accent fill-accent shrink-0" />
            <p className="text-sm font-bold text-foreground">
              شكراً! تم تسجيل تقييمك ({userRating} نجوم)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
