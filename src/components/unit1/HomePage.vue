<template>
  <div>
    <div class="unit1">
      <div class="test">
        <div class="solving_test">
          <div class="solving_test_trans">
            <h1>Unit 1</h1>
            <p>"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
          </div>
        </div>
      </div>
  
      <div class="test_starter">
        <div class="footer_unit1"> &copy; Powered by NCD International</div>
      </div>
      
      <div class="topic">
        <h1>Hello</h1>
        <p>am/are/is my/your</p>
      </div>
      <div class="input-fields">
        <span class="type_your_name" @click="focusOnInput">Type your name</span>
        <input type="text" @focus="nameFocuser" @focusout="nameFocuserOut" class="name_input" v-model="student_name">
      </div>
      <div class="languages">
        Select your preffered language:
        <div class="flags">
          <div class="uzbek" @click="selectLanguage" data-language = "uzbek"></div>
          <div class="russian" data-language = "russian" @click="selectLanguage"></div>
        </div>        
      </div>
      <div class="start_button" @click="test_starter">
        START
      </div>

    </div>
    <div class="homepage_mobile">
      <div class="main-image">
        <div class="solving_test_trans">
            <h1>Unit 1</h1>
            <p>"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
        </div>
      </div>
      <div class="topic">
          <h1>Hello</h1>
          <p>am/are/is my/your</p>
      </div>
      <div class="input-fields">
        <span class="type_your_name" @click="focusOnInput">Type your name</span>
        <input type="text" @focus="nameFocuser" @focusout="nameFocuserOut" class="name_input" v-model="student_name">
      </div>
      <div class="languages">
        Select your preffered language:
        <div class="flags">
          <div class="uzbek" @click="selectLanguage" data-language = "uzbek"></div>
          <div class="russian" data-language = "russian" @click="selectLanguage"></div>
        </div>        
      </div>
      <div class="start_button" @click="test_starter">
        START
      </div>
      <div class="footer_unit1"> &copy; Powered by NCD International</div>
    </div>
      <router-view></router-view>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      student_name: "",
      selectedLanguage: ""
    }
  },
  methods: {
    nameFocuser () {
      const elements = document.querySelectorAll('.type_your_name')
      Array.from(elements).forEach(element => {
        if ($(window).width() > 1000) {
          element.style.fontSize = "15px"
          element.style.top = "-5px"          
        }
        else {
          element.style.fontSize = "1.5vw";
          element.style.top = "-0.5vw"
        }
      })
    },
    nameFocuserOut (event) {
      const elements = document.querySelectorAll('.type_your_name')
      if (event.target.value == "" || event.target.value == null) {
        Array.from(elements).forEach(element => {
          if($(window).width() > 1000) {
          element.style.fontSize = "18px"
          element.style.top = "20px"
          }
          else {
            element.style.fontSize = "1.8vw";
            element.style.top = "2vw"
          }
        })
      }
    },
    focusOnInput () {
      const nameInput = document.querySelectorAll('.name_input')
      // element.focus()
      Array.from(nameInput).forEach(element => {
        element.focus()
      })
    },
    selectLanguage(event) {
      if (event.target.dataset.language == "uzbek") {
        this.selectedLanguage = "uzbek"
      }
      else if (event.target.dataset.language == "russian") {
        this.selectedLanguage = "russian"
      }
    },
    test_starter () {
      if (this.student_name == "") {
        swal("Oops!", "Please, write your name!", "error");
      }
      else if (this.selectedLanguage == "") {
        swal("Oops!", "Please, select your language!", "error");
      }
      else {
        this.$router.push({name: 'Unit1_grammar_video'})
      }
    }
  },
  watch: {
    selectedLanguage: function (value) {
      if (value == "uzbek") {
        document.querySelector('.uzbek').classList.add("uzb_activated")
        try {
          document.querySelector('.russian').classList.remove("rus_activated")
        } catch (error) {
          
        }
      }
      else {
        document.querySelector('.russian').classList.add("rus_activated")
                try {
          document.querySelector('.uzbek').classList.remove("uzb_activated")
        } catch (error) {
          
        }
      }

    }
  }
}
</script>

<style scoped>

  .unit1 {
    margin: 50px auto;
    max-width: 1000px;
    height: 650px;
    box-shadow: 0 0 10px lightblue;
  }

  .test {
    position: absolute;
    z-index: 1;
    height: 400px;
    overflow: hidden
  }

  .solving_test {
    background:  url('./children/images/TestSolving.jpg') center no-repeat;
    width: 1000px;
    height: 500px;
  }

  .test_starter {
    position: absolute;
    z-index: 2;
    top: 450px;
    background-color: #3e75c7;
    height: 300px;
    width: 1000px;
  }

  .solving_test_trans {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(62, 117, 199, 0.4);
    text-align: center;
    padding-top: 150px;
    color: #fff;
  }

  .solving_test h1 {
    font-size: 5em;
    font-weight: bold;
  }

 .solving_test_trans p {
    font-size: 20px;
    width: 600px;
    margin: 0 auto;
  }

  .footer_unit1 {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    background-color: #305895;
    text-align: center;
    color: #fff;
    padding-top: 5px;
  }

  .topic {
    position: relative;
    z-index: 2;
    border-radius: 50%;
    background-color: rgba(52, 28, 189, 0.9);
    width: 180px;
    height: 180px;
    text-align: center;
    color: white;
    padding-top: 40px;
    top: 300px;
    left: 800px
  }

  .input-fields  {
    position: relative;
    top: 260px;
    z-index: 100;
    width: 300px;
    left: 300px;
  }

  .input-fields input {
    width: 400px;
    background-color: #3e75c7;
    border: none;
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  .type_your_name {
    position: relative;
    z-index: 3;
    top: 20px;
    color: white;
    font-size: 18px;
    transition: all .3s ease;
  }
  


  .languages {
    position: relative;
    z-index: 100;
    top: 305px;
    left: 300px;
    font-size: 18px;
    color: #fff;
  }

  .flags {
    display: flex;
    margin-top: 15px;
  }

  .uzbek {
    position: relative;
    z-index: 20;
    background-image: url('./children/images/uzbflag.png');
    background-size: 70px auto;
    background-repeat: no-repeat;
    width: 100px;
    height: 50px;

  }
   .russian {
    position: relative;
    z-index: 20;
    background-image: url('./children/images/rusflag.png');
    background-size: 70px auto;
    background-repeat: no-repeat;
    width: 100px;
    height: 50px;

  }

  .russian:hover, .rus_activated {
    background-image: url('./children/images/rusflag_hover.png');
  }

    .uzbek:hover, .uzb_activated {
    background-image: url('./children/images/uzbflag_hover.png');
  }

  .russian:hover, .uzbek:hover {
    cursor: pointer;
  }

  .start_button {
    position: relative;
    z-index: 1000;
    background-color: rgb(8, 47, 105);
    width: 110px;
    text-align: center;
    height: 110px;
    padding-top: 35px;
    font-size: 26px;
    color: aliceblue;
    border-radius: 50%;
    opacity: 0.8;
    top: 210px;
    left: 850px;
  }

  .start_button:hover {
    opacity: 1;
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  .footer_unit1 {
    padding-top: 8px;
    font-size: 14px
  }

  .homepage_mobile {
    display: none
  }

  @media screen and (max-width: 1000px) {
      .unit1 {
        display: none;
      }

      .homepage_mobile {
        display: block;
        box-shadow: 0 0 10px lightblue;
        max-width: 99vw;
        height: 650px;
        margin: 50px auto;
        background-color: #3e75c7;
      }

      .main-image {
        width: 100%;
        height: 399px;
        overflow: hidden;
        background-image: url('./children/images/TestSolving.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }

      .solving_test_trans {
        height: 399px;
        max-width: 99vw;
      }

      .solving_test_trans h1 {
        font-size: 8vw;
        font-weight: bold;
      }

      .solving_test_trans p {
        font-size: 2.2vw;
        width: 65%;
      }

      .topic {
        position: absolute;
        z-index: 1000;
        top: 355px;
        left: 80%;
        height: 18vw;
        width: 18vw;
        padding-top: 4.2vw;
      }

      .topic h1 {
        font-size: 4vw;
      }

      .topic p {
        font-size: 1.5vw
      }

      .input-fields  {
      position: absolute;
      top: 490px;
      z-index: 100;
      width: 300px;
      left: 30%;
    }

    .input-fields input {
      width: 40vw;
      background-color: #3e75c7;
      border: none;
      color: #fff;
      border-bottom: 1px solid #fff;
    }

    .type_your_name {
      position: relative;
      z-index: 3;
      top: 20px;
      color: white;
      font-size: 1.8vw;
      transition: all .3s ease;
    }
    


    .languages {
      position: absolute;
      z-index: 100;
      top: 588px;
      left: 30%;
      font-size: 1.8vw;
      color: #fff;
    }

    .flags {
      display: flex;
      margin-top: 15px;
    }

    .uzbek {
      position: relative;
      z-index: 20;
      background-image: url('./children/images/uzbflag.png');
      background-size: 7vw auto;
      background-repeat: no-repeat;
      width: 10vw;
      height: 5vw;

    }
    .russian {
      position: relative;
      z-index: 20;
      background-image: url('./children/images/rusflag.png');
      background-size: 7vw auto;
      background-repeat: no-repeat;
      width: 10vw;
      height: 5vw;
    }
    .footer_unit1 {
      position: absolute;
      top: 700px;
      font-size: 1.4vw;
      width: 99vw;
    }

    .start_button {
      position: absolute;
      z-index: 1000;
      background-color: rgb(8, 47, 105);
      width: 11vw;
      text-align: center;
      height: 11vw;
      padding-top: 3.5vw;
      font-size: 2.6vw;
      color: aliceblue;
      border-radius: 50%;
      opacity: 0.8;
      top: 570px;
      left: 85vw;
    }
  }
</style>