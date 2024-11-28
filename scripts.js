function generateList() {
    const inputNumber = document.getElementById('input').value;
    if (!inputNumber || isNaN(inputNumber)) {
        alert('Будь ласка, введіть число.');
        return;
    }

    // Форматуємо число до 4 символів
    const formattedNumber = inputNumber.padStart(4, '0');
    
    const qrList = document.getElementById('qrList');
    qrList.innerHTML = ''; // очищення списку перед новою генерацією

    // Генерація 16 QR кодів із CRC
    for (let i = 1; i <= 16; i++) {
        const formattedNumber2 = i.toString().padStart(2, '0');
        const qrText = `TRC_${formattedNumber}_cell${formattedNumber2}`;
        createListItem(qrList, qrText, inputNumber, i);
    }

    // Останній QR код
    const lastQRCodeText = `TRC_${formattedNumber}`;
    createListItem(qrList, lastQRCodeText, inputNumber);

    // Очистка поля вводу після генерації
    document.getElementById('input').value = '';
}

function createListItem(list, text, num1, num2) {
    const listItem = document.createElement('li');
    listItem.textContent = `${num2 || '16+'}`;
    listItem.onclick = () => openModal(text);
    list.appendChild(listItem);
}

function openModal(text) {
    const modal = document.getElementById('qrModal');
    const qrCanvas = document.getElementById('qrCanvas');
    const qrLabel = document.getElementById('qrLabel');

    qrLabel.textContent = text;

    // Генеруємо QR код із заданим текстом і розміром
    QRCode.toCanvas(qrCanvas, text, {
        width: 300 // Розмір QR коду
    }, function (error) {
        if (error) console.error(error);
    });

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
}
