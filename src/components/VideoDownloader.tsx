import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720p");
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setDownloading(true);
    setProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          toast.success("Download completed!");
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Note: This is just a frontend mockup
    // Real implementation would need a backend service
    toast.info("This is a demo. Backend service needed for actual downloads.");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">YouTube Video Downloader</h1>
      
      <form onSubmit={handleDownload} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full p-2 rounded-md border border-input bg-background"
          >
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
            <option value="360p">360p</option>
          </select>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={downloading || !url}
        >
          {downloading ? "Downloading..." : "Download Video"}
        </Button>

        {downloading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Downloading: {progress}%
            </p>
          </div>
        )}
      </form>

      <Alert>
        <AlertDescription>
          Note: This is a demo interface. To implement actual video downloading functionality,
          you'll need to connect this to a backend service that handles YouTube video processing
          while complying with YouTube's terms of service.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default VideoDownloader;