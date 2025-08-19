const signUpButton = document.getElementById('signUpButton')
const signInButton = document.getElementById('signInButton')
const signInForm = document.getElementById('signInForm')
const signUpForm = document.getElementById('signUpForm')

// Quando o botão de cadastro é clicado, esconde o formulário de login e mostra o de cadastro
signUpButton.addEventListener('click', function() {
  signInForm.style.display = 'none'
  signUpForm.style.display = 'block'
})

// Quando o botão é clicado, esconde o formulário de cadastro e mostra o de login
signInButton.addEventListener('click', function() {
  signInForm.style.display = 'block'
  signUpForm.style.display = "none"
})

