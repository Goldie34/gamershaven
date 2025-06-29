$(function () {
  // Track thumbnails for gallery cycling
  let galleryImages = $(".thumbnail").toArray();
  let currentIndex = 0;

  // Gallery functionality
  $(".thumbnail").click(function () {
    currentIndex = galleryImages.indexOf(this);
    $("#fullImg").attr("src", $(this).data("full"));
    $("#overlay").fadeIn();
  });

  $(".closeBtn, #overlay").click(function () {
    $("#overlay").fadeOut();
  });

  $("#nextBtn").click(function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const nextSrc = $(galleryImages[currentIndex]).data("full");
    $("#fullImg").attr("src", nextSrc);
  });

  $("#prevBtn").click(function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const prevSrc = $(galleryImages[currentIndex]).data("full");
    $("#fullImg").attr("src", prevSrc);
  });

  // External site overlay
  $(".extLink").click(function (e) {
    e.preventDefault();
    const url = $(this).attr("href");
    $("#siteFrame").attr("src", url);
    $("#siteOverlay").fadeIn();
  });

  $(".closeSite, #siteOverlay").click(function () {
    $("#siteOverlay").fadeOut();
    $("#siteFrame").attr("src", "");
  });

  // jQuery form validation
  $("#contactForm").submit(function (e) {
    e.preventDefault();
    const username = $("#username").val().trim();
    const genre = $("input[name='genre']:checked").val();
    let message = "";

    const validationRules = {
      required: username !== "",
      genreSelected: genre !== undefined
    };

    if (!validationRules.required) {
      message = "<p style='color:red;'>Please enter your Gamer Tag.</p>";
    } else if (!validationRules.genreSelected) {
      message = "<p style='color:red;'>Please select a game genre.</p>";
    } else {
      message = `<p style='color:green;'>Welcome, ${username}! You love ${genre} games.</p>`;
    }

    $("#messageArea").html(message);
  });

  // Navigation menu dropdown using jQuery
  $("nav li").hover(
    function () {
      $(this).children("ul").stop(true, true).slideDown(200);
    },
    function () {
      $(this).children("ul").stop(true, true).slideUp(200);
    }
  );

  // Smooth scroll for nav anchor links
  $('nav a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate({
        scrollTop: target.offset().top - 20
      }, 600);
    }
  });

  // Reveal animations on scroll
  function revealOnScroll() {
    $(".animate-on-scroll").each(function () {
      const elemTop = $(this).offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();
      if (scrollBottom > elemTop + 50) {
        $(this).addClass("visible");
      }
    });
  }

  $(window).on("scroll resize", revealOnScroll);
  $(document).ready(revealOnScroll);
});