import { useState } from "react";
import { useUser } from "../lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useMutation } from "@tanstack/react-query";

import api from "../hooks/axios";
import { Input } from "./ui/input";
import { useNavigate } from "react-router";

export default function NewPost() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // form fields
  const [platform, setPlatform] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [content, setContent] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [shares, setShares] = useState("");
  const [comments, setComments] = useState("");
  const [remarks, setRemarks] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/kol/add-post", payload);
      return data;
    },
    onSuccess: () => {
      // toast.success("Post created successfully!");
      navigate("/post-history");
    },
    onError: (error) => {
      console.error(error);
      // toast.error("Failed to create post. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      postUrl,
      views: String(views) || "",
      likes: String(likes) || "",
      shares: String(shares) || "",
      comments,
      remarks,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-500 mt-1">Add a new post to your dashboard</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Post Information" : "Post Metrics & Remarks"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Basic Info */}
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform} required>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">📷 Instagram</SelectItem>
                      <SelectItem value="twitter">🐦 Twitter</SelectItem>
                      <SelectItem value="facebook">👥 Facebook</SelectItem>
                      <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                      <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postUrl">Post URL</Label>
                  <Input
                    id="postUrl"
                    placeholder="Enter post URL"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="views">Views</Label>
                    <Input
                      id="views"
                      type="number"
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="likes">Likes</Label>
                    <Input
                      id="likes"
                      type="number"
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shares">Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="comments">Comments</Label>
                    <Input
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Optional remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Creating..." : "Create Post"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
