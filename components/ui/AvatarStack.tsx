import Avatar from "./Avatar";

interface AvatarStackProps {
  users: Array<{
    name?: string | null;
    avatarUrl?: string | null;
  }>;
  limit?: number;
  size?: "xs" | "sm" | "md";
}

const spacingClasses = {
  xs: "-ml-1.5",
  sm: "-ml-2",
  md: "-ml-3",
};

export default function AvatarStack({ users, limit = 4, size = "sm" }: AvatarStackProps) {
  const visibleUsers = users.slice(0, limit);
  const remaining = users.length - limit;

  return (
    <div className="flex items-center">
      {visibleUsers.map((user, index) => (
        <div key={index} className={index > 0 ? spacingClasses[size] : ""}>
          <Avatar
            src={user.avatarUrl}
            name={user.name}
            size={size}
            className="ring-2 ring-white dark:ring-slate-900 shadow-sm"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`${spacingClasses[size]} bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center font-bold ring-2 ring-white dark:ring-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm ${
            size === "xs" ? "w-6 h-6 text-[10px]" : size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
          }`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
