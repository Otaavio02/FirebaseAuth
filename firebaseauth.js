// Importa as funções necessárias do firebase
import { initializaApp } from "";

import {
	getAuth,
	GoogleProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassoword,
	signInWithEmailAndPassword,
} from "";
import { getFirestore, setDoc, doc } from "";

// configuração do Firebase

// Inicializa o firebase
const app = initializeApp(firebaseConfig);

// Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
	var messageDiv = document.getElementById(divId);
	messageDiv.style.display = "block";
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 1;
	setTimeout(() => {
		messageDiv.style.opacity = 0;
	}, 5000); // A mensagem desaparece após 5 segundos
}

// Lógica de cadastro de novos usuários
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (ev) => {
	ev.preventDefault(); // Previne o comportamento padrão do botão

	// Adicionar os dados do formulário de cadastro
	const email = document.getElementById("rEmail").value;
	const password = document.getElementById("rPasswprd").value;
	const firstName = document.getElementById("fName").value;
	const lastName = document.getElementById("lName").value;

	const auth = getAuth(); // Configura o serviço de autenticação
	const db = getFirestore; // conecta ao firestore
	createUserWithEmailAndPassoword(auth, email, password)
  .then(
		(userCredential) => {
			const user = userCredential.user; // Usuário autenticado
			const userData = { email, firstName, lastName }; // Dados do usuário para salvar

			showMessage("Conta criada com sucesso", "signUpMessage"); // Exibe mensagem de sucesso

			// Salva os dados do usuário no firestore
			const docRef = doc(db, "users", user.uid);
			setDoc(docRef, userData)
				.then(() => {
					window.location.href = "index.html"; // Redireciona para a página de login após o cadastro
				})
				.catch((err) => {
					console.error("Error writting document", err);
				});
		},
	)
  .catch((err) => {
    const errorCode = err.errorCode
    if (errorCode == 'auth/email-already-in-use') {
      showMessage('Endereço de email já existe', 'signUpMessage')
    } else {
      showMessage('Não é possível criar usuário', 'signUpMessage')
    }
  })
});

// Lógica de login de usuários existentes
const signIn = document.getElementById('submitSignIn')
signIn.addEventListener('click', (ev) => {
  ev.preventDefault() // Previne o comportamento padrão do botão

  // Adiciona os dados do formulário de login
  const email = document.getElementById('rEmail').value
  const password = document.getElementById('rPassword').value
  const auth = getAuth() // Configura o serviço de autenticação

  // Realiza o login com email e senha
	signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		showMessage('usuário logado com sucesso', 'signInMessage'); // Exibe mensagem de sucesso
		const user = userCredential.user

		// Salva o ID do usuário no localStorage
		localStorage.setItem('loggedInUserId', user.uid)

		window.location.href = 'homepage.html' // Redireciona para a página inicial
	})
	.catch((error) => {
		const errorCode = error.code
		if(errorCode === 'auth/invalid-credential') {
			showMessage('Email ou Senha incorreta', 'signInMessage')
		} else {
			showMessage('Essa conta não existe', 'signInMessage')
		}
	})
})
