"use client";

import { useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useRef } from "react";

/**
 * A side-effect component that automatically synchronizes the user's
 * profile from their Convex Auth identity upon authentication.
 */
export default function ProfileSync() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const upsertProfile = useMutation(api.profiles.upsertMyProfileFromAuth);
  const synced = useRef(false);

  useEffect(() => {
    // If authenticated and not already synced in this session, trigger the upsert.
    if (!isLoading && isAuthenticated && !synced.current) {
      synced.current = true;
      void upsertProfile().catch((error) => {
        console.error("Failed to sync profile:", error);
        synced.current = false;
      });
    }
    
    // Reset the sync flag if they sign out.
    if (!isLoading && !isAuthenticated) {
      synced.current = false;
    }
  }, [isAuthenticated, isLoading, upsertProfile]);

  return null;
}
