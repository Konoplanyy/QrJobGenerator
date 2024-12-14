
function toggleMenu() {
    const menu = document.querySelector('.expandable-menu');
    const button = document.getElementById('mainButton');
    menu.classList.toggle('menu-active');
    button.textContent = menu.classList.contains('menu-active') ? '-' : '+';
}

function generateList() {
    const inputNumber = document.getElementById('input').value;
    if (!inputNumber || isNaN(inputNumber)) {
        alert('Будь ласка, введіть число.');
        return;
    }

    const formattedNumber = inputNumber.padStart(4, '0');
    const qrListLabel = document.getElementById('qrListLabel');
    qrListLabel.innerHTML = `${inputNumber}`;

    const qrList = document.getElementById('qrList');
    qrList.innerHTML = '';

    for (let i = 1; i <= 16; i++) {
        const formattedNumber2 = i.toString().padStart(2, '0');
        const qrText = `TRC_${formattedNumber}_cell${formattedNumber2}`;
        createListItem(qrList, qrText, inputNumber, i);
    }

    const lastQRCodeText = `TRC_${formattedNumber}`;
    createListItem(qrList, lastQRCodeText, inputNumber);

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

    QRCode.toCanvas(qrCanvas, text, {
        width: 300
    }, function (error) {
        if (error) console.error(error);
    });

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
}