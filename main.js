(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var overlay = document.querySelector(".nav-overlay");
  var toTop = document.querySelector(".to-top");
  var subButtons = document.querySelectorAll(".has-sub > button");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    if (overlay) overlay.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      setNav(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNav(false);
  });

  subButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var parent = button.closest(".has-sub");
      var expanded = button.getAttribute("aria-expanded") === "true";
      subButtons.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        other.closest(".has-sub").classList.remove("is-open");
      });
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      parent.classList.toggle("is-open", !expanded);
    });
  });

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 480);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      setNav(false);
    });
  });

  function clearFieldState(field) {
    if (!field) return;
    field.removeAttribute("aria-invalid");
    var fieldWrap = field.closest(".field");
    if (fieldWrap) {
      fieldWrap.removeAttribute("data-error");
    }
  }

  function setFieldState(field, isInvalid) {
    if (!field) return;
    field.setAttribute("aria-invalid", isInvalid ? "true" : "false");
  }

  function setFormStatus(form, message, isError) {
    if (!form) return;
    var status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  document.querySelectorAll("form[data-mailto-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var invalid = false;
      var bodyLines = [];
      var fields = Array.from(form.elements);

      fields.forEach(function (field) {
        clearFieldState(field);

        if (!field.name || field.disabled) return;
        if (field.type === "submit" || field.type === "button") return;

        var value = field.type === "checkbox" ? field.checked : String(field.value || "").trim();

        if (field.type === "checkbox") {
          if (!field.checked) {
            invalid = true;
            setFieldState(field, true);
          }
          return;
        }

        if (!value) {
          invalid = true;
          setFieldState(field, true);
          return;
        }

        if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          invalid = true;
          setFieldState(field, true);
          return;
        }

        bodyLines.push(field.name.replace(/_/g, " ").replace(/\b\w/g, function (letter) {
          return letter.toUpperCase();
        }) + ": " + value);
      });

      if (invalid) {
        setFormStatus(form, "Please complete all required fields before sending your message.", true);
        return;
      }

      var recipient = form.dataset.recipient || "greenhillnps@gmail.com";
      var subject = form.dataset.emailSubject || "Website enquiry";
      var body = bodyLines.join("\n\n");
      var mailtoUrl = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      window.location.href = mailtoUrl;
      setFormStatus(form, "Your email app should open with the message ready to send. If it does not, email greenhillnps@gmail.com directly.", false);
      form.reset();
    });
  });

  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = '<div class="lightbox__content"><button class="lightbox__close" type="button" aria-label="Close image view">×</button><img src="" alt=""><span class="lightbox__caption"></span></div>';
  document.body.appendChild(lightbox);

  var lightboxImage = lightbox.querySelector("img");
  var lightboxCaption = lightbox.querySelector(".lightbox__caption");
  var lightboxClose = lightbox.querySelector(".lightbox__close");

  document.querySelectorAll('[data-lightbox]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (!link.href) return;
      lightboxImage.src = link.href;
      lightboxCaption.textContent = link.getAttribute("data-title") || "Gallery image";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
