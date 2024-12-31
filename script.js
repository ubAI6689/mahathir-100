function updateCountdown() {
    const targetDate = new Date('July 10, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days.toString().padStart(3, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');

    if (difference < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown').innerHTML = '<h2>The Centennial Celebration Has Begun!</h2>';
    }
}

const countdown = setInterval(updateCountdown, 1000);
updateCountdown();