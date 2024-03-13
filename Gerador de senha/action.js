const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const length = document.getElementById('length');
const generatePass = document.getElementById('generatePass');
const copyPass = document.getElementById('copyPass');
const gerada = document.getElementById('gerada');
const forcadasenha = document.getElementById('forcadasenha');

function generatePassword() {
  const charset = getCharset();
  const passwordLength = parseInt(length.value, 10);
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomNumber);
  }
  gerada.value = password;
  updatePasswordStrength();
}

function getCharset() {
  let charset = '';
  if (lowercase.checked) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (uppercase.checked) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (numbers.checked) {
    charset += '0123456789';
  }
  if (symbols.checked) {
    charset += '!@#$%^&*()-+<>?';
  }
  return charset;
}

function updatePasswordStrength() {
  const password = gerada.value;
  let score = 0;
  if (password.length >= 8) {
    score += 2;
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 2;
  }
  if (/[0-9]/.test(password)) {
    score += 2;
  }
  if (/[!@#$%^&*()-+<>?]/.test(password)) {
    score += 2;
  }
  forcadasenha.textContent = Math.min(score, 10); // Limitando o valor máximo a 10
  const bar = document.querySelector('.password-strength-bar');
  if (bar) {
    bar.className = 'password-strength-bar';
    if (score <= 3) {
      bar.classList.add('weak');
    } else if (score <= 6) {
      bar.classList.add('medium');
    } else {
      bar.classList.add('strong');
    }
  }
}

function copyToClipboard() {
  const password = gerada.value;
  navigator.clipboard.writeText(password);
  alert('Senha copiada para a área de transferência!');
}

generatePass.addEventListener('click', generatePassword);
copyPass.addEventListener('click', copyToClipboard);

length.addEventListener('input', function() {
  document.getElementById('lengthValue').textContent = length.value;
  updatePasswordStrength();
});

lowercase.addEventListener('change', updatePasswordStrength);
uppercase.addEventListener('change', updatePasswordStrength);
numbers.addEventListener('change', updatePasswordStrength);
symbols.addEventListener('change', updatePasswordStrength);

updatePasswordStrength();
