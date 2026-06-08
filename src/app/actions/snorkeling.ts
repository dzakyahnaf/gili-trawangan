"use server";

import * as activityActions from "./activity";

export async function getSnorkelingPackages() {
  return activityActions.getActivities("snorkeling");
}

export async function getSnorkelingPackageBySlug(slug: string) {
  return activityActions.getActivityBySlug(slug, "snorkeling");
}

export async function getSnorkelingPackageById(id: string) {
  return activityActions.getActivityById(id);
}

export async function createSnorkelingPackage(formData: FormData) {
  return activityActions.createActivity("snorkeling", formData);
}

export async function updateSnorkelingPackage(id: string, formData: FormData) {
  return activityActions.updateActivity(id, "snorkeling", formData);
}

export async function deleteSnorkelingPackage(id: string) {
  return activityActions.deleteActivity(id, "snorkeling");
}
