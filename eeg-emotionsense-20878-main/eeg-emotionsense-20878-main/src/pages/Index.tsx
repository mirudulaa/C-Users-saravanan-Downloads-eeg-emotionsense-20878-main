import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EEGWaveform } from "@/components/EEGWaveform";
import { EmotionDetector } from "@/components/EmotionDetector";
import { StatsPanel } from "@/components/StatsPanel";
import { Brain, Upload, Play, Pause, Info } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`File "${file.name}" loaded successfully`);
      setIsAnalyzing(true);
    }
  };

  const toggleAnalysis = () => {
    if (!isAnalyzing) {
      toast.info("Starting real-time EEG analysis...");
    } else {
      toast.info("Analysis paused");
    }
    setIsAnalyzing(!isAnalyzing);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-primary/20 bg-gradient-neural">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background/10 backdrop-blur-sm rounded-lg">
                <Brain className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  NeuroSense AI
                </h1>
                <p className="text-sm text-foreground/80">
                  EEG Emotion Detection System
                </p>
              </div>
            </div>
            <Button
              onClick={toggleAnalysis}
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isAnalyzing ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause Analysis
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <StatsPanel isActive={isAnalyzing} />

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* EEG Visualization */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6 border-primary/20 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Live EEG Signal
                </h2>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isAnalyzing ? "bg-emotion-calm animate-pulse" : "bg-muted"
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {isAnalyzing ? "Recording" : "Idle"}
                  </span>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <EEGWaveform isActive={isAnalyzing} />
              </div>
            </Card>

            {/* Upload Section */}
            <Card className="p-6 border-primary/20 bg-gradient-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Upload EEG Data
              </h3>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground mb-2">
                  Drop your EEG file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports .edf, .bdf, .csv formats
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".edf,.bdf,.csv"
                  onChange={handleFileUpload}
                />
                <Button
                  onClick={() => document.getElementById("file-upload")?.click()}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Select File
                </Button>
              </div>
            </Card>

            {/* How It Works */}
            <Card className="p-6 border-primary/20 bg-gradient-card">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">
                  How It Works
                </h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      EEG Signal Acquisition
                    </h4>
                    <p>
                      Brain activity is captured through electroencephalography sensors placed on the scalp, measuring electrical patterns across multiple channels.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      Deep Learning Processing
                    </h4>
                    <p>
                      Our CNN-LSTM neural network analyzes frequency bands and temporal patterns to extract emotional features from the raw EEG data.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      Emotion Classification
                    </h4>
                    <p>
                      The model classifies emotions with high accuracy, providing real-time insights into the subject's emotional state with confidence scores.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Emotion Detection Panel */}
          <div className="lg:col-span-1">
            <EmotionDetector isActive={isAnalyzing} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
