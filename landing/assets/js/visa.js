      document.addEventListener("DOMContentLoaded", () => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.14 }
        );

        document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

        const counters = document.querySelectorAll("[data-count]");
        const counterObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const element = entry.target;
              const target = Number(element.getAttribute("data-count"));
              let current = 0;
              const step = Math.max(1, Math.ceil(target / 30));

              const tick = () => {
                current = Math.min(target, current + step);
                element.textContent = current;
                if (current < target) requestAnimationFrame(tick);
              };

              tick();
              counterObserver.unobserve(element);
            });
          },
          { threshold: 0.6 }
        );

        counters.forEach((counter) => counterObserver.observe(counter));

        const emailButton = document.getElementById("email-cta");
        if (emailButton) {
          const pageTitle = document.title.trim();
          const mailtoSubject = encodeURIComponent(`ArabicBusiness: ${pageTitle}`);
          const mailtoBody = encodeURIComponent(
            `رسالة جديدة من الموقع:\n\n` +
              `الصفحة: ${pageTitle}\n` +
              `نوع الطلب: استفسار بخصوص برنامج العمل في أوروبا\n\n` +
              `نص الرسالة:\nأرغب في معرفة تفاصيل أكثر حول هذا البرنامج وخطوات الاستفادة منه.`
          );

          emailButton.href = `mailto:steps.studio.info@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        }

        const videoPlayer = document.getElementById("main-video-player");
        const videoPlaceholder = document.getElementById("video-player-placeholder");
        const videoMeta = document.getElementById("video-player-meta");
        const videoTriggers = document.querySelectorAll(".video-trigger");

        videoTriggers.forEach((trigger) => {
          trigger.addEventListener("click", () => {
            const url = trigger.getAttribute("data-video-url");
            const title = trigger.getAttribute("data-video-title");
            const desc = trigger.getAttribute("data-video-desc");

            videoTriggers.forEach((btn) => btn.classList.remove("active"));
            trigger.classList.add("active");

            if (videoPlayer && url) {
              videoPlayer.src = url;
              videoPlayer.style.display = "block";
            }

            if (videoPlaceholder) {
              videoPlaceholder.style.display = "none";
            }

            if (videoMeta) {
              videoMeta.innerHTML = `<strong>${title}</strong><br>${desc}`;
            }

            document.getElementById("visa-videos")?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        });
      });