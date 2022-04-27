import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "eQAvGLWTm3S3okL6ECvYra",  // ID of a project you are using
      token: "Riz8CCHaZdIh1S7CUejlOQ3ZWEgdUJXM2dqmaqXPM8iZoolAJqVJkKfxkzYMeJRdxKIkJPYMl3sZZFdHRHJg"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});