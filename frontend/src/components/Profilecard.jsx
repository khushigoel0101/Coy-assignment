
import { MapPin, Sparkles } from "lucide-react";

function ProfileCard({ profile }) {
  return (
    <div className="relative mx-auto h-[min(560px,calc(100dvh-250px))] min-h-[390px] w-full max-w-[390px] overflow-hidden rounded-[26px] bg-[#e8e5dc] shadow-xl md:h-[540px] md:rounded-[28px]">

      {/* Profile Image */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Image Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />

      {/* Profile Details */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white sm:p-6">

        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Sparkles size={12} className="mr-1 inline" />
            Discover
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}, {profile.age}
        </h2>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
          <MapPin size={15} />
          {profile.city}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-white/90">
          {profile.bio}
        </p>

        <div className="mt-3 flex max-h-20 flex-wrap gap-2 overflow-y-auto">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs backdrop-blur-md"
            >
              {interest}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProfileCard;
