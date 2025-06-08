window.addEventListener('DOMContentLoaded', () => {
    // ========== Smooth Scroll for Navigation ========== //
    const navButtons = document.querySelectorAll('#navButtons .navButton');
    navButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const targetId = button.getAttribute('href'); // e.g. "#about"
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            // Smooth scroll to that section
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  
    // ========== Sidebar / Menu Logic (If still needed) ========== //
    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
  
    const menuToggle = document.body.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper?.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
      });
    }
  
    // Closes responsive menu when a scroll trigger link is clicked
    const scrollTriggerList = [].slice.call(
      document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger')
    );
    scrollTriggerList.forEach(scrollTrigger => {
      scrollTrigger.addEventListener('click', () => {
        sidebarWrapper?.classList.remove('active');
        menuToggle?.classList.remove('active');
        _toggleMenuIcon();
      });
    });
  
    function _toggleMenuIcon() {
      const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
      const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
      if (menuToggleBars) {
        menuToggleBars.classList.remove('fa-bars');
        menuToggleBars.classList.add('fa-xmark');
      }
      if (menuToggleTimes) {
        menuToggleTimes.classList.remove('fa-xmark');
        menuToggleTimes.classList.add('fa-bars');
      }
    }
  
    // ========== Scroll to top button appear (If used) ========== //
    document.addEventListener('scroll', () => {
      const scrollToTop = document.body.querySelector('.scroll-to-top');
      if (!scrollToTop) return;
  
      if (document.documentElement.scrollTop > 100) {
        if (!scrollToTopVisible) {
          fadeIn(scrollToTop);
          scrollToTopVisible = true;
        }
      } else {
        if (scrollToTopVisible) {
          fadeOut(scrollToTop);
          scrollToTopVisible = false;
        }
      }
    });
  
    function fadeOut(el) {
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = 'none';
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }
  
    function fadeIn(el, display) {
      el.style.opacity = 0;
      el.style.display = display || 'block';
      (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += 0.1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
        }
      })();
    }
  
    // ========== Skills Card Hover (Optional) ========== //
    const skillsContainers = document.querySelectorAll('.skills-container');
    skillsContainers.forEach(skillsContainer => {
      skillsContainer.addEventListener('mouseover', () => {
        skillsContainer.classList.add('spread');
      });
      skillsContainer.addEventListener('mouseout', () => {
        skillsContainer.classList.remove('spread');
      });
    });
  });
  
  // ========== Smoothly Toggle an Info Card ========== //
  function showDescription(id) {
    const desc = document.getElementById(id);
    if (!desc) return;
  
    // If it's open, fade it out
    if (desc.style.display === 'block') {
      fadeOutDescription(desc);
    } else {
      // Otherwise, fade it in
      fadeInDescription(desc);
    }
  }
  
  // Simple fade-out for a hidden info card
  function fadeOutDescription(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  
  // Simple fade-in for a hidden info card
  function fadeInDescription(el) {
    el.style.display = 'block';
    el.style.opacity = 0;
    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
