(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 50,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Modal Video - Wait for components to load
    setTimeout(function() {
        console.log('[VideoModal] Initializing video handlers...');
        
        // Simplified modal-video handling
        $('.btn-play').on('click', function(){
           const src = $(this).data('src');
           console.log('[VideoModal] Click ->', src);
           $('#videoSource').attr('src', src);
           const vid = $('#video')[0];
           if (vid) {
               vid.load();
           } else {
               console.error('[VideoModal] Video element not found!');
           }
        });

        $('#videoModal').on('shown.bs.modal', function(){
           const vid = $('#video')[0];
           if (vid) {
               console.log('[VideoModal] modal open, current src:', vid.currentSrc);
               // ensure muted for autoplay policy
               vid.muted = true;
               // Attempt play, fallback to user gesture
               vid.play().catch(err=>console.warn('[VideoModal] play blocked', err));
           } else {
               console.error('[VideoModal] Video element not found in modal!');
           }
        });

        $('#videoModal').on('hide.bs.modal', function(){
           const vid = $('#video')[0];
           if (vid) {
               vid.pause();
               vid.currentTime = 0;
           }
        });
        
        console.log('[VideoModal] Handlers bound. Found', $('.btn-play').length, 'play buttons');
    }, 1000); // Wait 1 second for components to load




})(jQuery);

// WhatsApp Bot API Configuration
const WHATSAPP_CONFIG = {
    // CallMeBot API (Free)
    callMeBotPhone: '972529435949', // Your WhatsApp number
    callMeBotApiKey: '6442335', // Your real API key from CallMeBot
};

// Automated WhatsApp Bot Function
async function sendToWhatsAppBot() {
    // Get form values
    const name = document.getElementById('userName').value.trim();
    const childGender = document.getElementById('childGender').value;
    const phone = document.getElementById('userPhone').value.trim();
    const childAge = document.getElementById('childAge').value;
    const userState = document.getElementById('userState').value.trim();
    const message = document.getElementById('userMessage').value.trim();
    
    // Validate required fields
    if (!name || !childGender || !phone || !childAge || !userState) {
        showAlert('الرجاء ملء جميع الحقول المطلوبة (الاسم، جنس الطفل، رقم الهاتف، عمر الطفل، المنطقة)', 'error');
        return;
    }
    
    // Validate age
    const age = parseInt(childAge);
    if (isNaN(age) || age < 6 || age > 16) {
        showAlert('عمر الطفل يجب أن يكون بين 6 و 16 سنة فقط', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    // Create WhatsApp message
    let whatsappMessage = `🌟 طلب حجز جلسة تجريبية 🌟\n\n`;
    whatsappMessage += `👤 الاسم: ${name}\n`;
    whatsappMessage += `👶 جنس الطفل: ${childGender}\n`;
    whatsappMessage += `📞 رقم الهاتف: ${phone}\n`;
    whatsappMessage += `📍 المنطقة/المحافظة: ${userState}\n`;
    
    whatsappMessage += `🧒 عمر الطفل: ${childAge} سنة\n`;
    
    if (message) {
        whatsappMessage += `💬 ملاحظات إضافية:\n${message}\n`;
    }
    
    whatsappMessage += `\n🎓 English Way Kids - تعليم الإنجليزية للأطفال\n`;
    whatsappMessage += `⏰ وقت الإرسال: ${new Date().toLocaleString('ar')}`;
    
    try {
        // Send via CallMeBot API (Free)
        const success = await sendViaCallMeBot(whatsappMessage);
        
        if (success) {
            showAlert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', 'success');
            closeModal();
            resetForm();
        } else {
            showAlert('حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى أو التواصل معنا مباشرة.', 'error');
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        showAlert('حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى.', 'error');
    } finally {
        showLoading(false);
    }
}

// CallMeBot API (Free WhatsApp Bot)
async function sendViaCallMeBot(message) {
    try {
        const apiKey = WHATSAPP_CONFIG.callMeBotApiKey;
        const phone = WHATSAPP_CONFIG.callMeBotPhone;
        
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
            console.log('CallMeBot API key not configured');
            return false;
        }
        
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors' // Handle CORS issues
        });
        
        return true; // Assume success due to no-cors mode
    } catch (error) {
        console.error('CallMeBot API error:', error);
        return false;
    }
}

// UI Helper Functions
function showLoading(show) {
    const button = document.querySelector('#contactModal .btn-success');
    if (button) {
        if (show) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
            button.disabled = true;
        } else {
            button.innerHTML = '<i class="fab fa-whatsapp me-2"></i>إرسال عبر واتساب';
            button.disabled = false;
        }
    }
}

function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    if (modal) {
        modal.hide();
    }
}

function resetForm() {
    document.getElementById('whatsappContactForm').reset();
}

// Legacy function for backwards compatibility
function sendToWhatsApp() {
    sendToWhatsAppBot();
}

