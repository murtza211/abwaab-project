// ==========================================
// منصة أبواب التعليمية - ملف JavaScript
// ==========================================

// حفظ الملاحظات في التخزين المحلي
function saveNotes() {
    const notesText = document.getElementById('notesTextarea').value;
    
    if (notesText.trim() === '') {
        alert('⚠️ الرجاء كتابة بعض الملاحظات قبل الحفظ!');
        return;
    }

    // حفظ الملاحظات في localStorage
    localStorage.setItem('todayNotes', notesText);
    localStorage.setItem('notesTimestamp', new Date().toLocaleString('ar-SA'));

    // إظهار رسالة نجاح
    showNotification('✅ تم حفظ الملاحظات بنجاح!', 'success');
}

// مسح الملاحظات
function clearNotes() {
    const notesTextarea = document.getElementById('notesTextarea');
    
    if (notesTextarea.value.trim() === '') {
        alert('📭 لا توجد ملاحظات لمسحها!');
        return;
    }

    if (confirm('هل تريد حقاً مسح جميع الملاحظات؟')) {
        notesTextarea.value = '';
        localStorage.removeItem('todayNotes');
        localStorage.removeItem('notesTimestamp');
        showNotification('🗑️ تم مسح الملاحظات بنجاح!', 'info');
    }
}

// تحميل الملاحظات المحفوظة عند تحميل الصفحة
function loadNotes() {
    const savedNotes = localStorage.getItem('todayNotes');
    const timestamp = localStorage.getItem('notesTimestamp');

    if (savedNotes) {
        document.getElementById('notesTextarea').value = savedNotes;
        
        if (timestamp) {
            console.log(`📚 آخر حفظ: ${timestamp}`);
        }
    }
}

// دالة عرض الإشعارات
function showNotification(message, type) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 16px;
    `;

    // تحديد اللون حسب نوع الإشعار
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#3b82f6';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إضافة تأثيرات الحركة CSS للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    /* تحسين سلوك اللينكات */
    a {
        transition: color 0.3s ease;
    }

    a:hover {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// الحفظ التلقائي للملاحظات كل 30 ثانية
let autoSaveInterval;

document.addEventListener('DOMContentLoaded', function() {
    // تحميل الملاحظات المحفوظة
    loadNotes();

    // إضافة مستمع لحفظ الملاحظات تلقائياً
    const notesTextarea = document.getElementById('notesTextarea');
    
    notesTextarea.addEventListener('input', function() {
        clearInterval(autoSaveInterval);
        autoSaveInterval = setTimeout(function() {
            if (notesTextarea.value.trim() !== '') {
                localStorage.setItem('todayNotes', notesTextarea.value);
                localStorage.setItem('notesTimestamp', new Date().toLocaleString('ar-SA'));
                showNotification('💾 تم حفظ الملاحظات تلقائياً', 'info');
            }
        }, 30000); // حفظ تلقائي بعد 30 ثانية من التوقف عن الكتابة
    });

    // إضافة رسالة ترحيب في Console
    console.log('%c🎓 مرحباً بك في منصة أبواب التعليمية!', 'font-size: 18px; color: #2563eb; font-weight: bold;');
    console.log('%cابدأ مذاكرتك الآن واستمتع بالتعليم المتميز', 'font-size: 14px; color: #0f766e;');
});

// إضافة وظيفة للتحكم بالوقت والساعة (اختياري)
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    console.log(`⏰ الوقت الحالي: ${hours}:${minutes}:${seconds}`);
}

// تحديث الساعة كل ثانية
setInterval(updateClock, 1000);

// معالجة النقر على روابط الدروس
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('course-btn')) {
        const courseName = e.target.parentElement.querySelector('h3').textContent;
        showNotification(`🎯 انتقل إلى دروس ${courseName}`, 'info');
    }
});

// تحسين تجربة المستخدم بإضافة تأثيرات عند التمرير
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    });
});

// معالج تقرير الأخطاء (اختياري)
window.addEventListener('error', function(e) {
    console.error('❌ حدث خطأ:', e.message);
});

// رسالة مرحبة عند فتح الموقع
window.addEventListener('load', function() {
    console.log('%c✨ تم تحميل الموقع بنجاح!', 'font-size: 16px; color: #10b981; font-weight: bold;');
});
