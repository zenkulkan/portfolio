import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["body", "main", "stub"]

  close() {
    this.mainTarget.classList.add("hidden")
    this.stubTarget.classList.remove("hidden")
  }

  restore() {
    this.stubTarget.classList.add("hidden")
    this.mainTarget.classList.remove("hidden")
  }

  minimize() {
    this.bodyTarget.classList.toggle("hidden")
  }

  maximize() {
    const isMaximized = this.mainTarget.dataset.maximized === "true"

    if (isMaximized) {
      // 1. Animate out using native Web Animations
      const animation = this.mainTarget.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.95)' }
      ], { duration: 200, easing: 'ease-in' })

      animation.onfinish = () => {
        this.mainTarget.dataset.maximized = "false"

        // 2. Close native dialog and return the window to normal DOM flow
        if (this.dialog) {
          this.dialog.close()
          this.element.appendChild(this.mainTarget)
        }

        // 3. Restore normal classes and styles
        this.mainTarget.style = ""
        this.mainTarget.classList.add("transition-all", "duration-300")
        this.bodyTarget.style = ""
        document.body.style.overflow = ""
      }

    } else {
      this.mainTarget.dataset.maximized = "true"

      // 1. Create a native HTML5 Dialog element if it doesn't exist.
      if (!this.dialog) {
        this.dialog = document.createElement("dialog")

        // THE FIX: Explicitly add margin: "auto" to override Tailwind's preflight
        Object.assign(this.dialog.style, {
          padding: "0",
          border: "none",
          background: "transparent",
          overflow: "visible",
          maxWidth: "100vw",
          maxHeight: "100vh",
          margin: "auto"
        })

        // Add the dark, blurred backdrop natively
        const style = document.createElement("style")
        style.textContent = `
          dialog::backdrop {
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
          }
        `
        this.dialog.appendChild(style)

        // Click outside the window to close
        this.dialog.addEventListener("click", (e) => {
          if (e.target === this.dialog) this.maximize()
        })

        // Append dialog inside the controller so Stimulus events still work
        this.element.appendChild(this.dialog)
      }

      // 2. Move the window INTO the dialog
      this.dialog.appendChild(this.mainTarget)
      this.mainTarget.classList.remove("transition-all", "duration-300")

      // 3. Size the window for the modal view
      Object.assign(this.mainTarget.style, {
        width: "90vw",
        maxWidth: "1000px",
        height: "85vh",
        margin: "auto",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)"
      })

      Object.assign(this.bodyTarget.style, {
        overflowY: "auto",
        height: "calc(100% - 2.5rem)"
      })

      this.bodyTarget.classList.remove("hidden")

      // 4. Trigger the native Top Layer modal
      this.dialog.showModal()
      document.body.style.overflow = "hidden"

      // 5. Animate in
      this.mainTarget.animate([
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 250, easing: 'ease-out' })
    }
  }
}