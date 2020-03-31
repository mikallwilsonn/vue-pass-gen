<template>
  <div id="app">
    <div class="container">
        <h2>
          Password Generator
        </h2>

        <div class="result-container">
            <span id="result">
              {{ passwordGenerated }}
            </span>

            <button 
              class="btn" 
              id="clipboard"
              @click.stop="copyToClipboard"
            >
                <ClipboardSVG />
            </button>
        </div>

        <div class="settings">
            <div class="setting">
                <label>
                  Password length
                </label>

                <input 
                  type="number" 
                  id="length" 
                  min='4' 
                  max='20' 
                  value='20' 
                />
            </div>

            <div class="setting">
                <label>
                  Include uppercase letters
                </label> 

                <input 
                  type="checkbox" 
                  id="uppercase" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include lowercase letters
                </label> 

                <input 
                  type="checkbox" 
                  id="lowercase" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include numbers
                </label> 

                <input 
                  type="checkbox" 
                  id="numbers" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include symbols
                </label> 

                <input 
                  type="checkbox" 
                  id="symbols" 
                  checked 
                />
            </div>
        </div>

        <br />
        
        <button 
          class="btn btn-large" 
          id="GenerateButton"
          @click.stop="initGenerate"
        >
            Generate password
        </button>
    </div>
  </div>
</template>

<script>
import ClipboardSVG from './components/ClipboardSVG.vue';

export default {
  name: 'App',
  components: {
    ClipboardSVG
  },
  data: () => ({
    passwordGenerated: ''
  }),
  methods: {
    initGenerate() {
      const resultEl = document.querySelector( '#result' );
      const lengthEl = document.querySelector( '#length' );
      const uppercaseEl = document.querySelector( '#uppercase' );
      const lowercaseEl = document.querySelector( '#lowercase' );
      const numbersEl = document.querySelector( '#numbers' );
      const symbolsEl = document.querySelector( '#symbols' );

      const length = +lengthEl.value;

      const hasLower = lowercaseEl.checked;
      const hasUpper = uppercaseEl.checked;
      const hasNumber = numbersEl.checked;
      const hasSymbol = symbolsEl.checked;

      resultEl.innerText = this.generatePassword( hasLower, hasUpper, hasNumber, hasSymbol, length );
    },
    generatePassword( lower, upper, number, symbol, length ) {
      let password = '';

      const typesCount = lower + upper + number + symbol;

      const typesArray = [ {lower}, {upper}, {number}, {symbol} ]
          .filter( item => Object.values( item )[0] );


      if ( typesCount === 0 ) {
          return '';
      }

      const randomFunction = {
        lower: this.getRandomLower,
        upper: this.getRandomUpper,
        number: this.getRandomNumber,
        symbol: this.getRandomSymbol
      }

      for( let i = 0; i < length; i += typesCount ) {
          typesArray.forEach( type => {
              const functionName = Object.keys( type )[0];

              password += randomFunction[functionName]();
          });
      }

      return this.passwordGenerated = password.slice( 0, length );
    },
    getRandomLower() {
      return String.fromCharCode( Math.floor( Math.random() * 26 ) + 97 );
    },
    getRandomUpper() {
      return String.fromCharCode( Math.floor( Math.random() * 26 ) + 65 );
    },
    getRandomNumber() {
      return String.fromCharCode( Math.floor( Math.random() * 10 ) + 48 );
    },
    getRandomSymbol() {
      const symbols = "!@#$%^&*(){}[]=/,.";

      return symbols[ Math.floor( Math.random() * symbols.length )];
    },
    copyToClipboard() {
      const resultEl = document.querySelector( '#result' );
      const textarea = document.createElement( 'textarea' );
      const password = resultEl.innerText;

      if ( !password ) {
          return;
      }

      textarea.value = password;
      document.body.appendChild( textarea );
      textarea.select();
      document.execCommand( 'copy' );
      textarea.remove();
      alert( 'Password copied to clipboard.' );
    }
  }
}
</script>

<style>
@import url( 'https://fonts.googleapis.com/css?family=Muli&display=swap' );

* { box-sizing: border-box; }

body {
	background: #00b09b;  
	background: linear-gradient( to right, #96c93d, #00b09b ); 
	
	color: #fff;
	display: flex;
	font-family: 'Muli', sans-serif;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
	min-height: 100vh;
}

p { margin: 5px 0; }

h2 {
	margin: 10px 0 20px;
	text-align: center;
	font-size: 3rem;
}

input[ type=checkbox ] { margin-right: 0; }

.container {
	background-color: #0072ff;
	box-shadow: 0px 2px 10px rgba( 255, 255, 255, 0.2 );
	padding: 50px;
	width: 500px;
	max-width: 100%;
	border-radius: 5px;
	box-shadow: 0px 0px 25px 5px rgba( 0, 0, 0, 0.25 );
}

.result-container {
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	font-size: 18px;
	letter-spacing: 1px;
	padding: 12px 10px;
	height: 50px;
	width: 100%;
}

.result-container #result {
  word-wrap: break-word;
	max-width: calc( 100% - 40px );
}

.result-container .btn {
	font-size: 20px;
	position: absolute;
	top: 5px;
	right: 5px;
	height: 40px;
	width: 40px;
}

.btn {
	border: none;
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	padding: 8px 12px;
	background-color: #0072ff;
}

.btn-large {
	display: block;
	width: 100%;
}

.setting {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0;
}

label { font-size: 1.2rem; }

button#GenerateButton {
	margin-top: 5px;
	font-size: 1.25rem;
	background: rgba( 0, 0, 0, 0.75 );
	padding: 15px;
	border-radius: 5px;
	transition: 0.3s;
}

.btn:hover { transform: scale( 1.025 ); }

input[ type=number ] { font-size: 1.2rem; }

@media screen and ( max-width: 400px ) {
	.result-container { font-size: 14px; }
}

</style>
