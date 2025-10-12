import { useUser } from "../lib/user-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-gray-500">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Username
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {user.username}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  User ID
                </label>
                <p className="text-gray-900">{user.id}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-gray-900">{user.email || "Not provided"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Role
                </label>
                <div className="mt-1">
                  {/* <Badge variant="secondary">{user.role}</Badge> */}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Joined Date
                </label>
                <p className="text-gray-900">{user.joinedDate || "Unknown"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
