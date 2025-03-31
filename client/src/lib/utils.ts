import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function handleFormSubmit(data: Record<string, string>, url: string) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}

export const downloadResume = () => {
  // This would typically download a file from the server
  // For now, we'll just log a message since we don't have the actual resume file
  console.log("Resume download initiated");
  
  // In a real implementation, this would be:
  // window.open('/api/resume/download', '_blank');
  alert("Resume download functionality would be implemented here with a real file.");
};
