const welcomeScreen = document.getElementById('welcome-screen');
const continueBtn = document.getElementById('continue-btn');

// قراءة البيانات من ملف sen.json
fetch('./sen.json')
    .then(response => response.json())
    .then(config => {
        const botToken = config.botToken;
        const chatId = config.chatId;

        continueBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;

            if (username.trim() === "") {
                alert("يرجى إدخال اسمك للمتابعة.");
                return;
            }

            // إرسال الاسم إلى البوت
            const message = `
اجاك زائر جديد 🆕:
- 👥 اسم الزائر: ${username}
- 🟢 التاريخ: ${new Date().toLocaleString()}
            `;
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });

            // إخفاء شاشة الترحيب
            welcomeScreen.style.display = 'none';
        });

        const scrollToTopButton = document.getElementById('scrollToTop');

        // إظهار الزر عند التمرير للأسفل
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        // التمرير إلى الأعلى عند النقر
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    })
    .catch(error => {
        console.error("حدث خطأ أثناء قراءة ملف الإعدادات:", error);
    });