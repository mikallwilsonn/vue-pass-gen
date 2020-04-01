<template>
  <div id="app">
    <div class="container">
        <h2>
          Password Generator
        </h2>

        <h3>
          Created by <a href="https://github.com/mikallwilsonn" target="_blank" rel="noopener noreferrer">Michael R. Wilson</a>
        </h3>

        <div class="result-container">
            <span id="result">
              {{ passwordGenerated }}
            </span>

            <button 
              class="btn" 
              id="clipboard"
              @click.stop="copyToClipboard"
              disabled="true"
            >
                <ClipboardSVG />
            </button>
        </div>

        <div class="settings">
            <div class="setting">
                <label>
                  Password Length <small>( default/max 20 )</small>
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
                  Include Uppercase Letters?
                </label> 

                <input 
                  type="checkbox" 
                  id="uppercase" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include Lowercase Letters?
                </label> 

                <input 
                  type="checkbox" 
                  id="lowercase" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include Numbers?
                </label> 

                <input 
                  type="checkbox" 
                  id="numbers" 
                  checked 
                />
            </div>

            <div class="setting">
                <label>
                  Include Symbols?
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
            {{ generateButtonText }}
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
    passwordGenerated: '',
    generateButtonText: 'Generate Password'
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

      const clipboardBTN = document.querySelector( '#clipboard' );
      if ( !clipboardBTN.classList.contains( 'show' )) {
        clipboardBTN.classList.add( 'show' );
        clipboardBTN.disabled = false;
      }

      this.generateButtonText = 'Generate Another Password';

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
      
      this.$toasted.show( 
        'Password copied to clipboard', 
        {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 3000
        }
      )
    }
  }
}
</script>

<style>
</style>
