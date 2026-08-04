// import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   static targets = ["job"]

//   focus(event) {
//     // Get the skill list from the hovered element (e.g., "Ruby, PostgreSQL")
//     const keywordsString = event.currentTarget.dataset.keywords
//     if (!keywordsString) return

//     // Convert into an array of lowercase search terms
//     const keywords = keywordsString.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 1)

//     this.jobTargets.forEach(job => {
//       const jobText = job.innerText.toLowerCase()
//       // Check if the job card contains any of the skill keywords
//       const hasMatch = keywords.some(keyword => jobText.includes(keyword))

//       if (hasMatch) {
//         // Spotlight the matching job
//         job.classList.add("ring-2", "ring-red-500", "shadow-xl", "bg-red-50/30", "scale-[1.01]")
//         job.classList.remove("opacity-40", "grayscale-[30%]")
//       } else {
//         // Fade out the non-matching jobs
//         job.classList.add("opacity-40", "grayscale-[30%]")
//         job.classList.remove("ring-2", "ring-red-500", "shadow-xl", "bg-red-50/30", "scale-[1.01]")
//       }
//     })
//   }

//   reset() {
//     // Remove all highlight and fade classes when the mouse leaves
//     this.jobTargets.forEach(job => {
//       job.classList.remove("ring-2", "ring-red-500", "shadow-xl", "bg-red-50/30", "scale-[1.01]", "opacity-40", "grayscale-[30%]")
//     })
//   }
// }