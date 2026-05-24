/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () =>
{

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  const siteHeader = document.querySelector(".site-header");

  let lastScroll = 0;

  if (siteHeader)
  {
    window.addEventListener("scroll", () =>
    {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0)
      {
        siteHeader.classList.remove("is-hidden");
        return;
      }

      if (currentScroll > lastScroll && currentScroll > 120)
      {
        siteHeader.classList.add("is-hidden");
      }
      else
      {
        siteHeader.classList.remove("is-hidden");
      }

      lastScroll = currentScroll;
    });
  }



  /* =========================================================
     MOBILE NAV
  ========================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList)
  {
    navToggle.addEventListener("click", () =>
    {
      navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active");
    });
  }



  /* =========================================================
     JOURNEY MODALS
  ========================================================= */

  const modalButtons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".journey-modal");
  const modalCloseButtons = document.querySelectorAll(".journey-modal__close");

  modalButtons.forEach((button) =>
  {
    button.addEventListener("click", () =>
    {
      const modalId = button.dataset.modal;
      const modal = document.getElementById(modalId);

      if (modal)
      {
        modal.classList.add("is-active");
      }
    });
  });

  modalCloseButtons.forEach((button) =>
  {
    button.addEventListener("click", () =>
    {
      const modal = button.closest(".journey-modal");

      if (modal)
      {
        modal.classList.remove("is-active");
      }
    });
  });

  modals.forEach((modal) =>
  {
    modal.addEventListener("click", (event) =>
    {
      if (event.target === modal)
      {
        modal.classList.remove("is-active");
      }
    });
  });



  /* =========================================================
     SERVICES CAROUSEL
  ========================================================= */

  const servicesTrack = document.querySelector(".services-track");
  const serviceCards = document.querySelectorAll(".service-card");
  const navButtons = document.querySelectorAll(".services-nav__button");
  const navIndicator = document.querySelector(".services-nav__indicator");
  const servicesSection = document.querySelector(".services-section");

  let currentIndex = 0;
  const totalSlides = serviceCards.length;

  function updateServicesCarousel(index)
  {
    if (
      !servicesTrack ||
      !navIndicator ||
      serviceCards.length === 0 ||
      navButtons.length === 0
    )
    {
      return;
    }

    currentIndex = index;

    const cardWidth = serviceCards[0].offsetWidth;
    const gap = 34;
    const offset = (cardWidth + gap) * currentIndex;

    servicesTrack.style.transform =
      `translateX(-${offset}px)`;

    navIndicator.style.transform =
      `translateX(${currentIndex * 100}%)`;

    navButtons.forEach((button) =>
      button.classList.remove("is-active")
    );

    serviceCards.forEach((card) =>
      card.classList.remove("is-active")
    );

    if (navButtons[currentIndex])
    {
      navButtons[currentIndex].classList.add("is-active");
    }

    if (serviceCards[currentIndex])
    {
      serviceCards[currentIndex].classList.add("is-active");
    }
  }

  if (servicesTrack && serviceCards.length && navButtons.length && navIndicator)
  {
    navButtons.forEach((button) =>
    {
      button.addEventListener("click", () =>
      {
        const index = Number(button.dataset.index);
        updateServicesCarousel(index);
      });
    });

    serviceCards.forEach((card, index) =>
    {
      card.addEventListener("click", () =>
      {
        if (index === currentIndex)
        {
          let nextIndex = currentIndex + 1;

          if (nextIndex >= totalSlides)
          {
            nextIndex = 0;
          }

          updateServicesCarousel(nextIndex);
        }
        else
        {
          updateServicesCarousel(index);
        }
      });
    });

    let servicesAnimated = false;

    const servicesObserver = new IntersectionObserver((entries) =>
    {
      entries.forEach((entry) =>
      {
        if (entry.isIntersecting && !servicesAnimated)
        {
          servicesAnimated = true;

          servicesTrack.animate(
            [
              { transform: "translateX(0px)" },
              { transform: "translateX(-60px)" },
              { transform: "translateX(0px)" }
            ],
            {
              duration: 1400,
              easing: "ease-in-out"
            }
          );
        }
      });
    },
    {
      threshold: 0.4
    });

    if (servicesSection)
    {
      servicesObserver.observe(servicesSection);
    }
  }



  /* =========================================================
   TOOLS TOGGLE
  ========================================================= */

  const toolCards =
  document.querySelectorAll(".tool-card");

  toolCards.forEach((card) =>
  {
      const button =
      card.querySelector(".tool-toggle");

      const icon =
      card.querySelector(".tool-toggle__icon");

      if(!button || !icon) return;

      button.addEventListener("click", () =>
      {
          card.classList.toggle("active");

          const isActive =
          card.classList.contains("active");

          icon.setAttribute(
              "data-lucide",
              isActive ? "x" : "chevron-down"
          );

          lucide.createIcons();
      });
  });



  /* =========================================================
     PROJECT MODAL GALLERY
  ========================================================= */

  const operaModal = document.getElementById("operaModal");
  const operaModalImage = document.getElementById("operaModalImage");
  const operaModalClose = document.getElementById("operaModalClose");
  const operaPrev = document.getElementById("operaPrev");
  const operaNext = document.getElementById("operaNext");
  const operaTriggers = document.querySelectorAll(".opera-gallery-card__trigger");

  const operaImages = [];
  let currentOperaIndex = 0;

  operaTriggers.forEach((trigger) =>
  {
    if (trigger.dataset.image)
    {
      operaImages.push(trigger.dataset.image);
    }
  });

  function updateOperaImage()
  {
    if (!operaModalImage || operaImages.length === 0) return;

    operaModalImage.src = operaImages[currentOperaIndex];
  }

  function nextOperaImage()
  {
    if (operaImages.length === 0) return;

    currentOperaIndex++;

    if (currentOperaIndex >= operaImages.length)
    {
      currentOperaIndex = 0;
    }

    updateOperaImage();
  }

  function prevOperaImage()
  {
    if (operaImages.length === 0) return;

    currentOperaIndex--;

    if (currentOperaIndex < 0)
    {
      currentOperaIndex = operaImages.length - 1;
    }

    updateOperaImage();
  }

  function closeOperaModal()
  {
    if (!operaModal) return;

    operaModal.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  if (operaModal && operaModalImage && operaTriggers.length)
  {
    operaTriggers.forEach((trigger, index) =>
    {
      trigger.addEventListener("click", () =>
      {
        currentOperaIndex = index;

        updateOperaImage();

        operaModal.classList.add("is-active");

        document.body.style.overflow = "hidden";
      });
    });

    if (operaNext)
    {
      operaNext.addEventListener("click", nextOperaImage);
    }

    if (operaPrev)
    {
      operaPrev.addEventListener("click", prevOperaImage);
    }

    if (operaModalClose)
    {
      operaModalClose.addEventListener("click", closeOperaModal);
    }

    operaModal.addEventListener("click", (event) =>
    {
      if (event.target === operaModal)
      {
        closeOperaModal();
      }
    });
  }



  /* =========================================================
    ACCORDION
  ========================================================= */

  const accordionItems = document.querySelectorAll(
    ".privacy-item, .copyright-item"
  );

  accordionItems.forEach((item) =>
  {
    const button = item.querySelector(
      ".privacy-item__toggle, .copyright-item__toggle"
    );

    if (!button) return;

    button.addEventListener("click", () =>
    {
      item.classList.toggle("is-active");

      const isActive = item.classList.contains("is-active");

      button.innerHTML = isActive
        ? `<i data-lucide="x" class="privacy-item__icon copyright-item__icon"></i>`
        : `<i data-lucide="chevron-down" class="privacy-item__icon copyright-item__icon"></i>`;

      if (window.lucide)
      {
        lucide.createIcons();
      }
    });
  });



  /* =========================================================
     GLOBAL KEYBOARD
  ========================================================= */

  document.addEventListener("keydown", (event) =>
  {
    if (event.key === "Escape")
    {
      modals.forEach((modal) =>
      {
        modal.classList.remove("is-active");
      });

      closeOperaModal();
    }

    if (operaModal && operaModal.classList.contains("is-active"))
    {
      if (event.key === "ArrowRight")
      {
        nextOperaImage();
      }

      if (event.key === "ArrowLeft")
      {
        prevOperaImage();
      }
    }
  });

  /* =========================================================
   COOKIE BANNER
  ========================================================= */

  const cookieBanner =
  document.querySelector(".cookie-banner");

  /* -----------------------------
    CHECK CONSENT /
    *nach Accept alle Banner verschwinden 
  ----------------------------- */

  if(
    localStorage.getItem(
      "onor-cookie-consent"
    ) === "accepted"
  )
  {
    cookieBanner.style.display = "none";
  }


  /* -----------------------------
    CLOSE
  ----------------------------- */

  const cookieClose =
  document.querySelector(".cookie-banner__close");

  if(cookieClose)
  {
      cookieClose.addEventListener("click", () =>
      {
          cookieBanner.style.display = "none";
      });
  }


  /* -----------------------------
    PREFERENCES TOGGLE
  ----------------------------- */

  const preferencesButtons =
  document.querySelectorAll(
  ".cookie-banner__preferences-toggle"
  );

  preferencesButtons.forEach((button) =>
  {
      button.addEventListener("click", () =>
      {
          cookieBanner.classList.toggle("expanded");
      });
  });


  /* -----------------------------
    READ MORE
  ----------------------------- */

  const readMoreButton =
  document.querySelector(
  ".cookie-banner__readmore"
  );

  if(readMoreButton)
  {
      readMoreButton.addEventListener("click", () =>
      {
          cookieBanner.classList.toggle("text-expanded");

          const isExpanded =
          cookieBanner.classList.contains(
          "text-expanded"
          );

          readMoreButton.textContent =
          isExpanded
          ? "Read less"
          : "Read more";
      });
  }


  /* -----------------------------
    SAVE PREFERENCES
  ----------------------------- */

  const saveButton =
  document.querySelector(".cookie-banner__save");

  if(saveButton)
  {
      saveButton.addEventListener("click", () =>
      {
          cookieBanner.classList.remove("expanded");
      });
  }


  /* -----------------------------
    ACCEPT
  ----------------------------- */

  const acceptButton =
  document.querySelector(
    ".cookie-banner .btn-primary"
  );

  if(acceptButton)
  {
    acceptButton.addEventListener("click", () =>
    {
      localStorage.setItem(
        "onor-cookie-consent",
        "accepted"
      );
      cookieBanner.style.display = "none";
    })
  }


  /* =========================================================
     INIT ICONS
  ========================================================= */

  if (window.lucide)
  {
    lucide.createIcons();
  }

  

});