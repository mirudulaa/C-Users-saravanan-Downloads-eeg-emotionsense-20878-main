import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Emotion {
  name: string;
  confidence: number;
  color: string;
}

interface EmotionDetectorProps {
  isActive: boolean;
}

export const EmotionDetector = ({ isActive }: EmotionDetectorProps) => {
  const [emotions, setEmotions] = useState<Emotion[]>([
    { name: "Joy", confidence: 0, color: "emotion-joy" },
    { name: "Calm", confidence: 0, color: "emotion-calm" },
    { name: "Sadness", confidence: 0, color: "emotion-sadness" },
    { name: "Anger", confidence: 0, color: "emotion-anger" },
    { name: "Fear", confidence: 0, color: "emotion-fear" },
    { name: "Neutral", confidence: 0, color: "emotion-neutral" },
  ]);

  const [dominantEmotion, setDominantEmotion] = useState<Emotion | null>(null);

  useEffect(() => {
    if (!isActive) {
      setEmotions((prev) =>
        prev.map((e) => ({ ...e, confidence: 0 }))
      );
      setDominantEmotion(null);
      return;
    }

    const interval = setInterval(() => {
      const newEmotions = emotions.map((emotion) => ({
        ...emotion,
        confidence: Math.random() * 100,
      }));

      newEmotions.sort((a, b) => b.confidence - a.confidence);
      setEmotions(newEmotions);
      setDominantEmotion(newEmotions[0]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="space-y-6">
      {dominantEmotion && (
        <Card className="p-6 border-primary/20 bg-gradient-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Detected Emotion
          </h3>
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-${dominantEmotion.color} animate-pulse`}
              style={{ backgroundColor: `hsl(var(--${dominantEmotion.color}))` }}
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground">
                {dominantEmotion.name}
              </h2>
              <p className="text-muted-foreground">
                {dominantEmotion.confidence.toFixed(1)}% confidence
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 border-primary/20 bg-gradient-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          All Emotions
        </h3>
        <div className="space-y-4">
          {emotions.map((emotion, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-medium">{emotion.name}</span>
                <span className="text-muted-foreground">
                  {emotion.confidence.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={emotion.confidence}
                className="h-2"
                style={
                  {
                    "--progress-background": `hsl(var(--${emotion.color}))`,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
