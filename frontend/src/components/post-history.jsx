import { useState } from "react";
import { useUser } from "../lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "lucide-react";

export default function PostHistory() {
  const [posts] = useState([
    {
      id: "1",
      platform: "Instagram",
      content: "Check out our latest product launch!  #NewProduct #Innovation",
      scheduledDate: "2024-03-15 10:00 AM",
      status: "Published",
      engagement: {
        likes: 1234,
        comments: 89,
        shares: 45,
      },
    },
    {
      id: "2",
      platform: "Twitter",
      content:
        "Excited to announce our partnership with @TechCorp! Big things coming soon.",
      scheduledDate: "2024-03-18 2:00 PM",
      status: "Scheduled",
    },
    {
      id: "3",
      platform: "Facebook",
      content:
        "Behind the scenes look at our creative process. Stay tuned for more!",
      scheduledDate: "2024-03-12 9:00 AM",
      status: "Published",
      engagement: {
        likes: 892,
        comments: 56,
        shares: 23,
      },
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram":
        return "📷";
      case "Twitter":
        return "🐦";
      case "Facebook":
        return "👥";
      default:
        return "📱";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post History</h1>
        <p className="text-gray-500 mt-1">
          View all your published and scheduled posts
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getPlatformIcon(post.platform)}
                  </span>
                  <div>
                    <CardTitle className="text-lg">{post.platform}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {post.scheduledDate}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{post.content}</p>

              {post.engagement && (
                <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{post.engagement.likes.toLocaleString()} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {post.engagement.comments.toLocaleString()} comments
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span>
                      {post.engagement.shares.toLocaleString()} shares
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
