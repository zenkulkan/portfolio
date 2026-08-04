import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item"]

  connect() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible classes, remove hidden classes
          entry.target.classList.add("opacity-100", "translate-y-0")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      })
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px"
    })

    this.itemTargets.forEach(target => {
      // Set initial hidden state
      target.classList.add("opacity-0", "translate-y-10", "transition", "duration-700", "ease-out")
      this.observer.observe(target)
    })
  }

  disconnect() {
    if (this.observer) this.observer.disconnect()
  }
}